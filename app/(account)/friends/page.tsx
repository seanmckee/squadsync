import { Friend, columns } from "./columns";
import { DataTable } from "./data-table";
import { friends } from "./data";

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
  // const data = await getData();
  const data = friends;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-5">Friends</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
