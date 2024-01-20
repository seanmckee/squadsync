"use server";

import User from "../models/User";
import Notification from "../models/Notification";

export async function sendFriendRequest(
  senderID: string,
  recipientID: string
): Promise<void> {
  try {
    // Check if sender and recipient exist
    const senderExists = await User.exists({ _id: senderID });
    const recipientExists = await User.exists({ _id: recipientID });

    if (!senderExists || !recipientExists) {
      throw new Error("Sender or recipient does not exist.");
    }

    // Check if there is already a pending friend request
    const existingRequest = await Notification.findOne({
      sender: senderID,
      recipient: recipientID,
      type: "friendRequest",
    });

    if (existingRequest) {
      throw new Error("Friend request already sent or exists.");
    }

    // Create a new friend request notification
    const newFriendRequest = new Notification({
      sender: senderID,
      recipient: recipientID,
      type: "friendRequest",
    });

    await newFriendRequest.save();

    // Update the sender's friendRequests array
    await User.findByIdAndUpdate(
      senderID,
      { $push: { friendRequests: newFriendRequest._id } },
      { new: true }
    );

    console.log("Friend request sent successfully.");
  } catch (error: any) {
    console.error("Error sending friend request:", error.message);
    throw error; // You may choose to handle or propagate the error as needed
  }
}

// respond to friend request (friendReqestAction)
export async function respondToFriendRequest(
  userID: string,
  notificationID: string,
  response: "accept" | "deny"
): Promise<void> {
  try {
    // Check if the user exists
    const userExists = await User.exists({ _id: userID });
    if (!userExists) {
      throw new Error("User does not exist.");
    }

    // Find the friend request notification
    const friendRequest = await Notification.findOne({
      _id: notificationID,
      recipient: userID,
      type: "friendRequest",
      read: false, // Assuming unread friend requests
    });

    if (!friendRequest) {
      throw new Error("Friend request not found or already responded.");
    }

    // Handle the response
    if (response === "accept") {
      // Update the user's friends array
      await User.findByIdAndUpdate(
        userID,
        { $push: { friends: friendRequest.sender } },
        { new: true }
      );

      // Update the sender's friends array
      await User.findByIdAndUpdate(
        friendRequest.sender,
        { $push: { friends: userID } },
        { new: true }
      );

      console.log("Friend request accepted successfully.");
    } else if (response === "deny") {
      console.log("Friend request denied successfully.");
      await Notification.findByIdAndDelete(notificationID);

      await User.findByIdAndUpdate(
        userID,
        { $pull: { friendRequests: notificationID } },
        { new: true }
      );
    } else {
      throw new Error("Invalid response type.");
    }
  } catch (error: any) {
    console.error("Error responding to friend request:", error.message);
    throw error; // You may choose to handle or propagate the error as needed
  }
}
