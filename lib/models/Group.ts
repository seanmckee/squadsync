import mongoose, { Schema, Document } from "mongoose";

const GroupSchema = new Schema({
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

const Group = mongoose.models.Group || mongoose.model("Group", GroupSchema);

export default Group;
