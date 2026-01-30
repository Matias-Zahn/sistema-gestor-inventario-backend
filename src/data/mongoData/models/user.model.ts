import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
  },
  emailValidated: {
    type: Boolean,
    default: false,
  },
  role: {
    type: [String],
    enum: ["ADMIN", "USER"],
    default: "USER",
  },
  status: {
    type: String,
    enum: ["ACTIVE", "INACTIVE"],
    default: "ACTIVE",
  },
  img: {
    type: String,
    required: false,
  },
});

export const UserModel = mongoose.model("User", UserSchema);
