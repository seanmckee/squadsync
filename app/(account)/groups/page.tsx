import { Button } from "@/components/ui/button";
import React from "react";
import { Plus, PlusCircle } from "lucide-react";
import { createGroup } from "@/lib/actions/group.actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateGroup from "./CreateGroup";

const Groups = () => {
  // const createNewGroup = async () => {
  //   try {
  //     await createGroup();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center gap-3 pb-3">
        <h1 className="text-4xl font-bold">Groups</h1>
        <CreateGroup />
      </div>
      <h2 className="text-xl mb-1">Group Invites</h2>
      <div></div>
    </div>
  );
};

export default Groups;
