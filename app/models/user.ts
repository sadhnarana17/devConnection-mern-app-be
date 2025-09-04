import mongoose, { Schema, Document, Model } from 'mongoose';
import validator from 'validator';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  emailId: string;
  password: string;
  gender: string;
  age: number;
  photoUrl?: string;
  about?: string;
  skills?: string[];
}

const userSchema: Schema<IUser> = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: 50,
      minLength: 2,
      get: (v: string) => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase(),
      set: (v: string) => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase(),
    },
    lastName: {
      type: String,
      required: true,
      maxLength: 50,
      minLength: 2,
      get: (v: string) => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase(),
      set: (v: string) => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase(),
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      get: (v: string) => v.toLowerCase(),
      set: (v: string) => v.toLowerCase(),
      validate: {
        validator: (v: string) => validator.isEmail(v),
        message: (props: any) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => validator.isStrongPassword(v, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        }),
        message: () =>
          'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one symbol.',
      }
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    age: {
      type: Number,
      required: true,
      min: 18,
    },
    photoUrl: {
      type: String,
      default: '',
      validate: {
        validator: (v: string) => v === '' || validator.isURL(v),
        message: (props: any) => `${props.value} is not a valid URL!`,
      },
    },
    about: {
      type: String,
      maxLength: 500,
    },
    skills: {
      type: [String],
    }
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;