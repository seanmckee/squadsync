import { Friend, columns } from "./columns";
import { DataTable } from "./data-table";
import { friends } from "./data";
import { fetchUser, getFriendsWithDetails } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import {
  getFriendRequests,
  respondToFriendRequest,
} from "@/lib/actions/notification.actions";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { ObjectId } from "mongoose";
import FriendRequestButtons from "./FriendRequestButtons";
import AcceptButton from "./(buttons)/AcceptButton";
import RejectButton from "./(buttons)/RejectButton";

export default async function Friends() {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const userInfo = await fetchUser(user.id);
  const friendRequests = await getFriendRequests(userInfo.friendRequests);
  const friendsWithDetails = await getFriendsWithDetails(userInfo._id);
  // const data = await getData();
  const data = friends;

  // reject friend request

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-5">Friends</h1>
      <div className="w-full">
        <h2 className="text-xl mb-1">Friend Requests</h2>
        {friendRequests.map((friendRequest: any) => (
          <div
            className="flex border p-3 rounded-md justify-between"
            key={friendRequest.id}
          >
            {userInfo.username === friendRequest.recipient.username ? (
              <div>
                <p>{friendRequest.sender.name}</p>
                <p className="text-xs text-slate-400">
                  @{friendRequest.sender.username}
                </p>
              </div>
            ) : (
              <div>
                <p>{friendRequest.recipient.name}</p>
                <p className="text-xs text-slate-400">
                  @{friendRequest.recipient.username}
                </p>
              </div>
            )}

            {userInfo.username === friendRequest.recipient.username ? (
              <div className="flex gap-3">
                {/* <Button
                  onClick={() =>
                    acceptFriendRequest(
                      userInfo.sender._id,
                      userInfo.recipient._id
                    )
                  }
                  className="text-white"
                >
                  <Check />
                </Button> */}
                <AcceptButton
                  senderID={friendRequest.sender._id.toString()}
                  recipientID={friendRequest.recipient._id.toString()}
                />

                <RejectButton
                  senderID={friendRequest.sender._id.toString()}
                  recipientID={friendRequest.recipient._id.toString()}
                />
              </div>
            ) : (
              <div className="flex gap-3 items-center">
                <p className="text-sm text-slate-400">pending ...</p>
                <RejectButton
                  senderID={friendRequest.sender._id.toString()}
                  recipientID={friendRequest.recipient._id.toString()}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={friendsWithDetails}
        currentUserID={user.id}
      />
    </div>
  );
}
