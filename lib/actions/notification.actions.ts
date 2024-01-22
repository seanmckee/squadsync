"use server";

import User from "../models/User";
import Notification from "../models/Notification";
import { ObjectId } from "mongoose";

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

    // Update the recipient's friendRequests array
    await User.findByIdAndUpdate(
      recipientID,
      { $push: { friendRequests: newFriendRequest._id } },
      { new: true }
    );

    console.log("Friend request sent successfully.");
  } catch (error: any) {
    console.error("Error sending friend request:", error.message);
    throw error; // You may choose to handle or propagate the error as needed
  }
}

export async function respondToFriendRequest(
  senderID: ObjectId,
  recipientID: ObjectId,
  response: "accept" | "deny"
): Promise<void> {
  try {
    // Check if the sender and recipient users exist
    const senderExists = await User.exists({ _id: senderID });
    const recipientExists = await User.exists({ _id: recipientID });

    if (!senderExists || !recipientExists) {
      throw new Error("Sender or recipient does not exist.");
    }

    // Find the friend request notification
    const friendRequest = await Notification.findOne({
      sender: senderID,
      recipient: recipientID,
      type: "friendRequest",
    });

    if (!friendRequest) {
      throw new Error("Friend request not found or already responded.");
    }

    // Handle the response
    if (response === "accept") {
      // Update the recipient's friends array
      await User.findByIdAndUpdate(
        recipientID,
        { $push: { friends: senderID } },
        { new: true }
      );

      // Update the sender's friends array
      await User.findByIdAndUpdate(
        senderID,
        { $push: { friends: recipientID } },
        { new: true }
      );

      // Delete the friend request notification
      await Notification.findByIdAndDelete(friendRequest._id);

      // Update the recipient's friendRequests array
      await User.findByIdAndUpdate(
        recipientID,
        { $pull: { friendRequests: friendRequest._id } },
        { new: true }
      );

      // Update the sender's friendRequests array
      await User.findByIdAndUpdate(
        senderID,
        { $pull: { friendRequests: friendRequest._id } },
        { new: true }
      );

      console.log("Friend request accepted successfully.");
    } else if (response === "deny") {
      console.log("Friend request denied successfully.");
      await Notification.findByIdAndDelete(friendRequest._id);

      await User.findByIdAndUpdate(
        recipientID,
        { $pull: { friendRequests: friendRequest._id } },
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
// make a server action to take array of notification ids and return
// usernames/names and whether it is outgoing or incoming

export async function getFriendRequests(notificationIDs: ObjectId[]) {
  try {
    const friendRequests = await Notification.find({
      _id: { $in: notificationIDs },
      type: "friendRequest",
    }).populate([
      { path: "sender", select: "username name _id" },
      { path: "recipient", select: "username name _id" },
    ]);

    const senderInfo = friendRequests.map((request) => {
      const sender = request.sender as
        | (Document & {
            username: string;
            name: string;
            _id: ObjectId;
          })
        | null;

      const recipient = request.recipient as
        | (Document & {
            username: string;
            name: string;
            _id: ObjectId;
          })
        | null;

      if (sender && recipient) {
        const isOutgoing = sender._id.toString() === request.sender.toString();
        const requestType = isOutgoing ? "outgoing" : "incoming";
        return {
          sender: {
            username: sender.username,
            name: sender.name,
            _id: sender._id,
          },
          recipient: {
            username: recipient.username,
            name: recipient.name,
            _id: recipient._id,
          },
          requestType,
        };
      } else {
        // Handle the case where sender or recipient is not found or null
        console.log("sender or recipient not found");
        return null;
      }
    });

    // Remove null values if needed
    const filteredSenderInfo = senderInfo.filter((info) => info !== null);

    return filteredSenderInfo;
  } catch (error: any) {
    console.error("Error getting friend requests:", error.message);
    throw error;
  }
}
