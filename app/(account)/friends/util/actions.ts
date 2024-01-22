import { respondToFriendRequest } from "@/lib/actions/notification.actions";
import { ObjectId } from "mongoose";

const acceptFriendRequest = async (
  senderID: ObjectId,
  recipientID: ObjectId
) => {
  try {
    await respondToFriendRequest(senderID, recipientID, "accept");
  } catch (error) {
    console.log(error);
  }
};

export default acceptFriendRequest;
