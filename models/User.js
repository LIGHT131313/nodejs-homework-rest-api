import { Schema, model } from "mongoose";

import { handleSaveError, preUpdate } from "./hooks.js";
import { emailRegexp } from "../utils/validation/userValidationSchemas.js";

const userSchema = new Schema(
  {
    password: {
      type: String,
      minLength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false }
);

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", preUpdate);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
