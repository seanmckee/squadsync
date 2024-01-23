import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { fetchUser, removeFriend } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { UserX } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface RemoveFriendProps {
  friendName: string;
}

const RemoveFriend: React.FC<RemoveFriendProps> = ({ friendName }) => {
  const router = useRouter();

  const handleRemoveFriend = async () => {
    console.log("removing friend");
    try {
      await removeFriend(friendName);
    } catch (error) {
      console.error(error);
    }
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger>
        <UserX />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`Are you sure you want to unfriend ${friendName}?`}</DialogTitle>
          <DialogDescription>
            If you want to add them back, you will have to send them a new
            friend request.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleRemoveFriend} variant="destructive">
              Unfriend
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveFriend;
