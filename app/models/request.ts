import mongoose, { Schema, Document } from 'mongoose';

export interface IRequest extends Document {
  fromUserId: mongoose.Types.ObjectId;
  toUserId: mongoose.Types.ObjectId;
  status: 'interested' | 'ignored' | 'accepted' | 'rejected';
}
const RequestSchema: Schema = new Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['interested', 'ignored', 'accepted', 'rejected'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model<IRequest>('Request', RequestSchema);
export default Request;