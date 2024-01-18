import AccountProfile from "@/components/forms/AccountProfile";
import { OnboardingSchema } from "@/lib/validations/user";
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

  return (
    <div className="pt-[56px] flex flex-col items-center">
      <div className="flex flex-col gap-2 mb-5 text-center">
        <h1 className="text-5xl font-bold mb-2">Onboarding</h1>
        <p>Complete your profile to use SquadSync!</p>
      </div>

      <AccountProfile userData={userData} />
    </div>
  );
};

export default Onboarding;
