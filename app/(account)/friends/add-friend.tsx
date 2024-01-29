import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendFriendRequest } from "@/lib/actions/notification.actions";
import { fetchUser, getUserIDFromUsername } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface AddFriendProps {
  currentUserID: string;
}

export function AddFriend({ currentUserID }: AddFriendProps) {
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    try {
      // get current user id

      // using username, get recipient's id from db
      const recipientID = await getUserIDFromUsername(username);
      // console.log(
      //   "current user id: ",
      //   currentUserID,
      //   "recipient id: ",
      //   recipientID
      // );
      const currentUserMongo = await fetchUser(currentUserID);
      const currentUserMongoID = currentUserMongo._id;
      await sendFriendRequest(currentUserMongoID, recipientID);
      toast.success("Friend request sent!");
      router.refresh();
    } catch (error) {
      toast.error("This User does not exist!");
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Friend</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Friend</DialogTitle>
          <DialogDescription>
            Add your friends by username here. Make sure it's the correct one!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Username
            </Label>
            <Input
              id="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username here"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              onSubmit && onSubmit();
              setOpen && setOpen(false);
            }}
            type="submit"
          >
            Add Friend
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
