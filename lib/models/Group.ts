import mongoose, { Schema, Document } from "mongoose";

const ActivitySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  votes: { type: Number, default: 0 },
  usersAttending: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const GroupSchema = new Schema({
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  description: { type: String, required: true },
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  suggestedActivities: [{ type: Schema.Types.ObjectId, ref: "Activity" }],
});

const Group = mongoose.models.Group || mongoose.model("Group", GroupSchema);

export default Group;
