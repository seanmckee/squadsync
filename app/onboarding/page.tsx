import AccountProfile from "@/components/forms/AccountProfile";
import { OnboardingSchema } from "@/validations/user";
import { currentUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { z } from "zod";

const Onboarding = async () => {
  const user = await currentUser();

  const userData = {
    id: user?.id,
    email: user?.emailAddresses[0].emailAddress,
  };

  console.log(userData);
  return (
    <div className="pt-[56px]">
      <AccountProfile userData={userData} />
    </div>
  );
};

export default Onboarding; // Export the component as the default export
