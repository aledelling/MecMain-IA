import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkshop extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  ownerId: mongoose.Types.ObjectId;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  services: string[];
  specialties: string[];
  certifications: {
    name: string;
    issuer: string;
    issuedDate: Date;
    expiryDate?: Date;
  }[];
  operatingHours: {
    monday: { open: string; close: string; closed: boolean };
    tuesday: { open: string; close: string; closed: boolean };
    wednesday: { open: string; close: string; closed: boolean };
    thursday: { open: string; close: string; closed: boolean };
    friday: { open: string; close: string; closed: boolean };
    saturday: { open: string; close: string; closed: boolean };
    sunday: { open: string; close: string; closed: boolean };
  };
  settings: {
    timezone: string;
    currency: string;
    language: string;
    aiEnabled: boolean;
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
  statistics: {
    totalVehicles: number;
    totalMaintenanceRecords: number;
    averageRating: number;
    totalRevenue: number;
    lastActivity: Date;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const WorkshopSchema = new Schema<IWorkshop>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  address: {
    street: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    zipCode: {
      type: String,
      required: true,
      trim: true
    },
    country: {
      type: String,
      required: true,
      trim: true,
      default: 'Colombia'
    },
    coordinates: {
      lat: { type: Number, min: -90, max: 90 },
      lng: { type: Number, min: -180, max: 180 }
    }
  },
  contact: {
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number']
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    website: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, 'Please enter a valid website URL']
    }
  },
  services: [{
    type: String,
    trim: true
  }],
  specialties: [{
    type: String,
    trim: true
  }],
  certifications: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    issuer: {
      type: String,
      required: true,
      trim: true
    },
    issuedDate: {
      type: Date,
      required: true
    },
    expiryDate: {
      type: Date
    }
  }],
  operatingHours: {
    monday: {
      open: { type: String, default: '08:00' },
      close: { type: String, default: '18:00' },
      closed: { type: Boolean, default: false }
    },
    tuesday: {
      open: { type: String, default: '08:00' },
      close: { type: String, default: '18:00' },
      closed: { type: Boolean, default: false }
    },
    wednesday: {
      open: { type: String, default: '08:00' },
      close: { type: String, default: '18:00' },
      closed: { type: Boolean, default: false }
    },
    thursday: {
      open: { type: String, default: '08:00' },
      close: { type: String, default: '18:00' },
      closed: { type: Boolean, default: false }
    },
    friday: {
      open: { type: String, default: '08:00' },
      close: { type: String, default: '18:00' },
      closed: { type: Boolean, default: false }
    },
    saturday: {
      open: { type: String, default: '08:00' },
      close: { type: String, default: '14:00' },
      closed: { type: Boolean, default: false }
    },
    sunday: {
      open: { type: String, default: '08:00' },
      close: { type: String, default: '14:00' },
      closed: { type: Boolean, default: true }
    }
  },
  settings: {
    timezone: {
      type: String,
      default: 'America/Bogota'
    },
    currency: {
      type: String,
      default: 'COP'
    },
    language: {
      type: String,
      default: 'es',
      enum: ['es', 'en']
    },
    aiEnabled: {
      type: Boolean,
      default: true
    },
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      push: { type: Boolean, default: true }
    }
  },
  statistics: {
    totalVehicles: {
      type: Number,
      default: 0,
      min: 0
    },
    totalMaintenanceRecords: {
      type: Number,
      default: 0,
      min: 0
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalRevenue: {
      type: Number,
      default: 0,
      min: 0
    },
    lastActivity: {
      type: Date,
      default: Date.now
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
WorkshopSchema.index({ ownerId: 1 });
WorkshopSchema.index({ 'address.city': 1 });
WorkshopSchema.index({ 'address.state': 1 });
WorkshopSchema.index({ services: 1 });
WorkshopSchema.index({ specialties: 1 });
WorkshopSchema.index({ isActive: 1 });

// Virtual for full address
WorkshopSchema.virtual('fullAddress').get(function() {
  const addr = this.address;
  return `${addr.street}, ${addr.city}, ${addr.state} ${addr.zipCode}, ${addr.country}`;
});

export const Workshop = mongoose.model<IWorkshop>('Workshop', WorkshopSchema);
