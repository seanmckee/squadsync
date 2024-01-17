import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";
import React from "react";

const Onboarding = async () => {
  const user = await currentUser();

  const userData = {
    id: user?.id,
    email: user?.emailAddresses[0].emailAddress,
  };

  console.log(userData);
  return (
    <div className="pt-[56px]">
      <AccountProfile />
    </div>
  );
};

export default Onboarding; // Export the component as the default export
