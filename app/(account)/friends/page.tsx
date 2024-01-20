import { Friend, columns } from "./columns";
import { DataTable } from "./data-table";
import { friends } from "./data";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

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
  console.log("here is the userinfo: ", userInfo);

  // const data = await getData();
  const data = friends;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-5">Friends</h1>
      <div>
        <h2>Friend Requests</h2>
        {userInfo?.friendRequests?.map((friendRequest: any) => (
          <div className="flex" key={friendRequest.id}>
            <p>{friendRequest.name}</p>
            <p>{friendRequest.username}</p>
          </div>
        ))}
      </div>
      <DataTable columns={columns} data={data} currentUserID={user.id} />
    </div>
  );
}
