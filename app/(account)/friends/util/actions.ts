import { respondToFriendRequest } from "@/lib/actions/notification.actions";
import { ObjectId } from "mongoose";

export const acceptFriendRequest = async (
  senderID: ObjectId,
  recipientID: ObjectId
) => {
  try {
    await respondToFriendRequest(senderID, recipientID, "accept");
  } catch (error) {
    console.log(error);
  }
};

export const denyFriendRequest = async (
  senderID: ObjectId,
  recipientID: ObjectId
) => {
  try {
    await respondToFriendRequest(senderID, recipientID, "deny");
  } catch (error) {
    console.log(error);
  }
};
