import { respondToFriendRequest } from "@/lib/actions/notification.actions";
import { ObjectId } from "mongoose";
import toast from "react-hot-toast";

export const acceptFriendRequest = async (
  senderID: ObjectId,
  recipientID: ObjectId
) => {
  try {
    await respondToFriendRequest(senderID, recipientID, "accept");
    toast.success("Friend request accepted!");
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
    toast.success("Friend request denied.");
  } catch (error) {
    console.log(error);
  }
};
