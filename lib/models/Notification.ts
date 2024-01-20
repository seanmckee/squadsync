import mongoose, { Schema, Document } from "mongoose";

const validNotifcationTypes = ["friendRequest", "groupInvite"];

const NotificationSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  recipient: { type: Schema.Types.ObjectId, ref: "User" },
  type: { type: String, required: true },
});

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);

export default Notification;
