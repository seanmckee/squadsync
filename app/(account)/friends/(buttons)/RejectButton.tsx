"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React from "react";
import { denyFriendRequest } from "../util/actions";
import { ObjectId } from "mongoose";
import { useRouter } from "next/navigation";

interface Props {
  senderID: ObjectId;
  recipientID: ObjectId;
}

const RejectButton = ({ senderID, recipientID }: Props) => {
  const router = useRouter();
  return (
    <div>
      <Button
        onClick={() => {
          denyFriendRequest(senderID, recipientID);
          router.refresh();
        }}
        variant={"destructive"}
        className="text-white"
      >
        <X />
      </Button>
    </div>
  );
};

export default RejectButton;
