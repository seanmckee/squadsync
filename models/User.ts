import mongoose, { Schema, Document } from "mongoose";

const AvailabilityRangeSchema = new Schema({
  start: { type: Date, required: true },
  end: { type: Date, required: true },
});

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  clerkID: { type: String, required: true, unique: true },
  name: { type: String },
  mood: { type: String },
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  availability: [AvailabilityRangeSchema], // Array of availability ranges
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
