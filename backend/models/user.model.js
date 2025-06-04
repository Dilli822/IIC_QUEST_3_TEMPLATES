import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
    },
    bio: {
      type: String,
    },
    // gender: {
    //   type: String,
    //   enum: ["male", "female", "other"],
    // },
    isVerified: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    communities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Community" }],
    friendList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
