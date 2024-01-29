import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import NewGroup from "@/components/forms/NewGroup";

const CreateGroup = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            // onClick={createNewGroup}
            className="text-white rounded-full w-9 h-9"
          >
            <span>
              <Plus />
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Group</DialogTitle>
            <DialogDescription>
              This will create a new group and add you as the owner.
            </DialogDescription>
          </DialogHeader>
          <NewGroup />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateGroup;
