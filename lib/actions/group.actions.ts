"use server";

import { currentUser } from "@clerk/nextjs";
import Group from "../models/Group";
import { connectToDB } from "../mongodb";
import { fetchUser } from "./user.actions";

export async function createGroup(
  name: string,
  description: string
): Promise<void> {
  connectToDB();
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("User not found");
    }
    const userID = await fetchUser(user.id);
    const newGroup = await Group.create({
      name: name,
      description: description,
      owner: userID,
      members: [userID],
      suggestedActivities: [],
    });
  } catch (error: any) {
    console.error("Failed to create group:", error);
  }
}
