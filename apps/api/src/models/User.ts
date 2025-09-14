import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'workshop_owner' | 'technician' | 'student';
  workshopId?: mongoose.Types.ObjectId;
  isEmailVerified: boolean;
  isActive: boolean;
  profileImage?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  preferences: {
    language: string;
    timezone: string;
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
  };
  trainingProgress: {
    completedModules: mongoose.Types.ObjectId[];
    currentModule?: mongoose.Types.ObjectId;
    totalScore: number;
    lastActivity: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'workshop_owner', 'technician', 'student'],
    default: 'technician'
  },
  workshopId: {
    type: Schema.Types.ObjectId,
    ref: 'Workshop',
    required: function() {
      return this.role !== 'admin';
    }
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  profileImage: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number']
  },
  address: {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    zipCode: { type: String, trim: true },
    country: { type: String, trim: true, default: 'Colombia' }
  },
  preferences: {
    language: {
      type: String,
      default: 'es',
      enum: ['es', 'en']
    },
    timezone: {
      type: String,
      default: 'America/Bogota'
    },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      sms: { type: Boolean, default: false }
    }
  },
  trainingProgress: {
    completedModules: [{
      type: Schema.Types.ObjectId,
      ref: 'TrainingModule'
    }],
    currentModule: {
      type: Schema.Types.ObjectId,
      ref: 'TrainingModule'
    },
    totalScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    lastActivity: {
      type: Date,
      default: Date.now
    }
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});

// Indexes
UserSchema.index({ email: 1 });
UserSchema.index({ workshopId: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ isActive: 1 });

// Virtual for full name
UserSchema.virtual('fullName').get(function() {
  return this.name;
});

// Pre-save middleware
UserSchema.pre('save', function(next) {
  if (this.isModified('email')) {
    this.email = this.email.toLowerCase();
  }
  next();
});

export const User = mongoose.model<IUser>('User', UserSchema);
