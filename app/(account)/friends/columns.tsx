"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, X, UserX } from "lucide-react";
import RemoveFriend from "./remove-friend";

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
  },
  {
    accessorKey: "mood",
    header: "Mood",
  },
  {
    id: "removeFriend",
    cell: ({ row }) => {
      return (
        <RemoveFriend friendName={row.getValue("name") as string} />

        //
        // <Popover>
        //   <PopoverTrigger asChild>
        //     <Button variant="outline">
        //       <UserX />
        //     </Button>
        //   </PopoverTrigger>
        //   <PopoverContent className="w-80">
        //     <div className="grid gap-4">
        //       <div className="space-y-2">
        //         <h4 className="font-medium leading-none">Remove Friend</h4>
        //         <p className="text-sm text-muted-foreground">
        //           {`Are you sure you want to remove ${row.getValue(
        //             "name"
        //           )} as a friend?`}
        //         </p>
        //       </div>
        //     </div>
        //   </PopoverContent>
        // </Popover>
      );
    },
  },
];
