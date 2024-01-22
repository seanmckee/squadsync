"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import React from "react";
import acceptFriendRequest from "../util/actions";
import { ObjectId } from "mongoose";

interface Props {
  senderID: ObjectId;
  recipientID: ObjectId;
}

const AcceptButton = ({ senderID, recipientID }: Props) => {
  return (
    <div>
      <Button
        onClick={() => acceptFriendRequest(senderID, recipientID)}
        className="text-white"
      >
        <Check />
      </Button>
    </div>
  );
};

export default AcceptButton;
