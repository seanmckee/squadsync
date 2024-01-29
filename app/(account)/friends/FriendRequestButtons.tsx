"use client";

import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface Props {
  userInfo: any;
  friendRequest: any;
  acceptFriendRequest: any;
}

const FriendRequestButtons = ({
  userInfo,
  friendRequest,
  acceptFriendRequest,
}: Props) => {
  return (
    <div>
      {userInfo.username === friendRequest.recipient.username ? (
        <div className="flex gap-3">
          <Button
            onClick={() =>
              acceptFriendRequest(userInfo.sender._id, userInfo.recipient._id)
            }
            className="text-white"
          >
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
  );
};

export default FriendRequestButtons;
