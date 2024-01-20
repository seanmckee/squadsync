"use client";

import { SignOutButton, useClerk } from "@clerk/nextjs";
import {
  LayoutDashboard,
  HeartHandshake,
  Users,
  User,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <div className="pt-[100px] p-5 shadow-md h-full">
      <ul className="list-none flex flex-col gap-2 font-semibold">
        <Link href="/dashboard">
          <li className="  cursor-pointer hover:text-white hover:bg-blue-600 dark:hover:bg-[#3c4c74] rounded-md p-2 sm:p-5 flex text-xl items-center">
            <LayoutDashboard />
            <p className="pl-2 hidden sm:block">Dashboard</p>
          </li>
        </Link>
        <Link href="/groups">
          <li className="cursor-pointer hover:text-white hover:bg-blue-600 dark:hover:bg-[#3c4c74] rounded-md p-5 flex text-xl items-center">
            <HeartHandshake />
            <p className="pl-2">Groups</p>
          </li>
        </Link>

        <Link href="/friends">
          <li className="cursor-pointer hover:text-white hover:bg-blue-600 dark:hover:bg-[#3c4c74] rounded-md p-5 flex text-xl items-center">
            <Users />
            <p className="pl-2">Friends</p>
          </li>
        </Link>

        <Link href="/account">
          <li className="cursor-pointer hover:text-white hover:bg-blue-600 dark:hover:bg-[#3c4c74] rounded-md p-5 flex text-xl items-center">
            <User />
            <p className="pl-2">Account</p>
          </li>
        </Link>

        <li
          onClick={() => signOut(() => router.push("/"))}
          className="cursor-pointer hover:text-white hover:bg-blue-600 dark:hover:bg-[#3c4c74] rounded-md p-5 flex text-xl items-center"
        >
          <LogOut />
          <p className="pl-2">Logout</p>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
