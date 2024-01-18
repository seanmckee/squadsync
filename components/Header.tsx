import { SignInButton, SignedOut } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { ThemeToggler } from "./ThemeToggler";
import { Boxes } from "lucide-react";

export const Header = () => {
  return (
    <header className="flex items-center py-2 fixed justify-between w-screen">
      <Link className="flex items-center space-x-2 pl-10" href="/">
        <div className=" w-fit">
          <Boxes />
        </div>
        <h1 className="font-bold text-xl ">SquadSync</h1>
      </Link>

      <div className="px-5 flex space-x-2 items-center">
        <div className="px-5 flex space-x-2 items-center">
          <ThemeToggler />
          <UserButton afterSignOutUrl="/" />
          <SignedOut>
            <SignInButton afterSignInUrl="/dashboard" mode="modal" />
          </SignedOut>
        </div>
      </div>
    </header>
  );
};
