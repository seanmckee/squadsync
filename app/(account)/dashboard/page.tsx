import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const userInfo = await fetchUser(user.id);
  if (!userInfo || !userInfo.onboarded) redirect("/onboarding");
  return <div className="pt-[56px]">Dashboard</div>;
};

export default Dashboard;
