import { model, Schema, Document } from "mongoose";

interface IUserSchema extends Document {
  email: String;
  password: String;
  firstName: String;
  lastName: String;
  role: String;
  resetPasswordToken: String;
  resetPasswordExpires: Number;
}

const UserSchema: Schema = new Schema(
  {
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    role: String,
    resetPasswordToken: String,
    resetPasswordExpires: Number,
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export default model<IUserSchema>("User", UserSchema);
