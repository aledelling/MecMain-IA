import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '@/models/User';
import { CustomError } from '@/middleware/errorHandler';
import { logger } from '@/utils/logger';

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: string;
  workshopId?: string;
}

interface LoginResult {
  user: any;
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  async register(data: RegisterData): Promise<LoginResult> {
    try {
      const { email, password, name, role, workshopId } = data;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new CustomError('User already exists with this email', 409);
      }

      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create user
      const user = new User({
        email,
        password: hashedPassword,
        name,
        role,
        workshopId,
        isEmailVerified: false
      });

      await user.save();

      // Generate tokens
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      logger.info('User registered successfully', { userId: user._id, email });

      return {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          workshopId: user.workshopId,
          isEmailVerified: user.isEmailVerified
        },
        accessToken,
        refreshToken
      };
    } catch (error) {
      logger.error('Registration failed', { error: error.message, email: data.email });
      throw error;
    }
  },

  async login(email: string, password: string): Promise<LoginResult> {
    try {
      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        throw new CustomError('Invalid credentials', 401);
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new CustomError('Invalid credentials', 401);
      }

      // Check if user is active
      if (!user.isActive) {
        throw new CustomError('Account is deactivated', 401);
      }

      // Generate tokens
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      logger.info('User logged in successfully', { userId: user._id, email });

      return {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          workshopId: user.workshopId,
          isEmailVerified: user.isEmailVerified
        },
        accessToken,
        refreshToken
      };
    } catch (error) {
      logger.error('Login failed', { error: error.message, email });
      throw error;
    }
  },

  async logout(refreshToken: string): Promise<void> {
    try {
      // In a real implementation, you would blacklist the refresh token
      // For now, we'll just log the logout
      logger.info('User logged out', { refreshToken: refreshToken.substring(0, 10) + '...' });
    } catch (error) {
      logger.error('Logout failed', { error: error.message });
      throw error;
    }
  },

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new CustomError('JWT secret not configured', 500);
      }

      const decoded = jwt.verify(refreshToken, jwtSecret) as any;
      const user = await User.findById(decoded.id);

      if (!user || !user.isActive) {
        throw new CustomError('Invalid refresh token', 401);
      }

      const accessToken = generateAccessToken(user);

      return { accessToken };
    } catch (error) {
      logger.error('Token refresh failed', { error: error.message });
      throw error;
    }
  },

  async forgotPassword(email: string): Promise<void> {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        // Don't reveal if user exists or not
        return;
      }

      // Generate reset token
      const resetToken = jwt.sign(
        { id: user._id, type: 'password-reset' },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '1h' }
      );

      // In a real implementation, you would send an email
      logger.info('Password reset token generated', { email, resetToken });

      // For now, just log the token (in production, send via email)
      console.log(`Password reset token for ${email}: ${resetToken}`);
    } catch (error) {
      logger.error('Forgot password failed', { error: error.message, email });
      throw error;
    }
  },

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new CustomError('JWT secret not configured', 500);
      }

      const decoded = jwt.verify(token, jwtSecret) as any;
      
      if (decoded.type !== 'password-reset') {
        throw new CustomError('Invalid token type', 400);
      }

      const user = await User.findById(decoded.id);
      if (!user) {
        throw new CustomError('User not found', 404);
      }

      // Hash new password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      user.password = hashedPassword;
      await user.save();

      logger.info('Password reset successfully', { userId: user._id });
    } catch (error) {
      logger.error('Password reset failed', { error: error.message });
      throw error;
    }
  },

  async verifyEmail(token: string): Promise<void> {
    try {
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new CustomError('JWT secret not configured', 500);
      }

      const decoded = jwt.verify(token, jwtSecret) as any;
      
      if (decoded.type !== 'email-verification') {
        throw new CustomError('Invalid token type', 400);
      }

      const user = await User.findById(decoded.id);
      if (!user) {
        throw new CustomError('User not found', 404);
      }

      user.isEmailVerified = true;
      await user.save();

      logger.info('Email verified successfully', { userId: user._id });
    } catch (error) {
      logger.error('Email verification failed', { error: error.message });
      throw error;
    }
  }
};

function generateAccessToken(user: any): string {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new CustomError('JWT secret not configured', 500);
  }

  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role
    },
    jwtSecret,
    { expiresIn: '15m' }
  );
}

function generateRefreshToken(user: any): string {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new CustomError('JWT secret not configured', 500);
  }

  return jwt.sign(
    {
      id: user._id,
      type: 'refresh'
    },
    jwtSecret,
    { expiresIn: '7d' }
  );
}
