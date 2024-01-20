"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Friend = {
  username: string;
  name: string;
  mood: string;
};

export const columns: ColumnDef<Friend>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => {
      return <div>{"@" + row.getValue("username")}</div>;
    },
    // q: how do i put an "@" in front of the username?
    // a: use a flexRender function
    //
  },
  {
    accessorKey: "mood",
    header: "Mood",
  },
];
