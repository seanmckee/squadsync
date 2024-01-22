import { Friend, columns } from "./columns";
import { DataTable } from "./data-table";
import { friends } from "./data";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { getFriendRequests } from "@/lib/actions/notification.actions";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

// async function getData(): Promise<Friend[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//     // ...
//   ];
// }

export default async function Friends() {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const userInfo = await fetchUser(user.id);
  const friendRequests = await getFriendRequests(userInfo.friendRequests);
  // const data = await getData();
  const data = friends;

  // make a server action to take array of notification ids and return usernames/names

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
                <Button className="text-white">
                  <Check />
                </Button>
                <Button variant={"destructive"} className="text-white">
                  <X />
                </Button>
              </div>
            ) : (
              <div className="flex gap-3 items-center">
                <p className="text-sm text-slate-400">pending ...</p>
                <Button variant={"destructive"} className="text-white">
                  <X />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      <DataTable columns={columns} data={data} currentUserID={user.id} />
    </div>
  );
}
