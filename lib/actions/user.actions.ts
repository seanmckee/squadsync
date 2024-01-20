"use server";

import { revalidatePath } from "next/cache";
import User from "../models/User";
import { connectToDB } from "../mongodb";

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
