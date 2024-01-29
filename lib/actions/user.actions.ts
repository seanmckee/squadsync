"use server";

import { revalidatePath } from "next/cache";
import User from "../models/User";
import { connectToDB } from "../mongodb";
import { ObjectId } from "mongoose";
import { currentUser } from "@clerk/nextjs";

export async function updateUser(
  clerkID: string,
  email: string,
  username: string,
  name: string,
  bio: string
): Promise<void> {
  connectToDB();
  console.log("username:", username);
  try {
    const updatedUser = await User.findOneAndUpdate(
      { clerkID: clerkID },
      {
        email: email,
        username: username.toLowerCase(),
        name: name,
        bio: bio,
        onboarded: true,
        mood: "Exploration",
      },
      { upsert: true }
    );
    console.log("updatedUser:", updatedUser, username);
  } catch (error: any) {
    console.error("Failed to create/update user:", error);
    throw new Error("An error occurred while processing the request.");
  }

  //   REVALIDATE PATHS (research this)

  //   if(path === '/profile/edit'){
  //     revalidatePath(path)
  //   }
}

export async function getUserIDFromUsername(username: string) {
  try {
    const user = await User.findOne({ username: username.toLowerCase() });
    if (user) {
      return user._id.toString();
    } else {
      console.log("user not found");
      return null;
    }
  } catch (error) {
    console.error("Failed to get user:", error);
    return null;
  }
}

export async function fetchUser(clerkID: string) {
  try {
    connectToDB();
    return await User.findOne({ clerkID: clerkID });
  } catch (error) {}
}

export async function getFriendsWithDetails(userID: ObjectId) {
  try {
    // Find the user by ID and populate the 'friends' array along with 'username', 'name', and 'mood'
    const user = await User.findById(userID).populate({
      path: "friends",
      select: "username name mood",
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Extract and return the 'friends' array with required details
    const friends = user.friends || [];
    const friendsWithDetails = friends.map(
      (friend: any) =>
        friend && {
          username: friend.username,
          name: friend.name,
          mood: friend.mood,
        }
    );

    return friendsWithDetails.filter(Boolean); // Remove potential undefined values
  } catch (error: any) {
    console.error("Error getting friends:", error.message);
    throw error;
  }
}

// remove friend from user friend array and the friends friend array
export const removeFriend = async (friendName: string) => {
  try {
    // Find the friend by name to get their ID
    const friend = await User.findOne({ name: friendName });
    const user = await currentUser();
    if (!user) {
      throw new Error("User not found");
    }
    const userInfo = await fetchUser(user.id);

    if (!friend) {
      throw new Error(`Friend with username ${friendName} not found`);
    }
    console.log("friend:", friend);

    const friendID = friend._id;

    // Remove friend from user's friend array
    await User.findByIdAndUpdate(userInfo._id, {
      $pull: { friends: friendID },
    });

    // Remove user from friend's friend array
    await User.findByIdAndUpdate(friendID, {
      $pull: { friends: userInfo._id },
    });
  } catch (error: any) {
    console.error("Error removing friend:", error.message);
    throw error;
  }
};

export const setMood = async (mood: string) => {
  console.log("mood:", mood);
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("User not found");
    }
    const userInfo = await fetchUser(user.id);
    await User.findByIdAndUpdate(userInfo._id, {
      mood: mood,
    });
  } catch (error: any) {
    console.error("Error setting mood:", error.message);
    throw error;
  }
};

export const getMood = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("User not found");
    }
    const userInfo = await fetchUser(user.id);
    return userInfo.mood;
  } catch (error: any) {
    console.error("Error getting mood:", error.message);
    throw error;
  }
};
