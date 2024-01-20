import mongoose, { Schema, Document } from "mongoose";

const AvailabilityRangeSchema = new Schema({
  start: { type: Date, required: true },
  end: { type: Date, required: true },
});

const UserSchema = new Schema({
  clerkID: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  bio: { type: String },
  mood: { type: String },
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  groups: [{ type: Schema.Types.ObjectId, ref: "Group" }],
  availability: [AvailabilityRangeSchema], // Array of availability ranges
  friendRequests: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
  groupInvites: [{ type: Schema.Types.ObjectId, ref: "Notification" }],

  onboarded: { type: Boolean, default: false },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
