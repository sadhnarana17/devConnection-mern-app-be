import mongoose, { Schema, Document, Model } from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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
  getJWT(): Promise<string>;
  checkValidPassword(password: string): Promise<boolean>;
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
      min: 13,
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

userSchema.methods.getJWT = async function() {
  const user = this;
  const token = await jwt.sign(
    { _id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  return token;
};

userSchema.methods.checkValidPassword = async function(password: string) {
  const user = this;
  return await bcrypt.compareSync(password, user.password);
}

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;