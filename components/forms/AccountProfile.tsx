"use client";

import { OnboardingSchema } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { updateUser } from "@/lib/actions/user.actions";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";

interface AccountProfileProps {
  userData: {
    id: string | undefined;
    email: string | undefined;
  };
}

const AccountProfile = ({ userData }: AccountProfileProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof OnboardingSchema>>({
    defaultValues: {
      clerkID: userData.id,
      email: userData.email,
      username: "",
      name: "",
      bio: "",
    },
    resolver: zodResolver(OnboardingSchema),
  });

  async function onSubmit(values: z.infer<typeof OnboardingSchema>) {
    console.log(values);
    console.log("username in onsubmit", values.username);
    await updateUser(
      values.clerkID,
      values.email,
      values.username,
      values.name,
      values.bio
    );

    router.push("/dashboard");
  }

  return (
    <div className="flex flex-col items-center ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="Enter Your Email Here"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Use this email to log in to your account.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Username Here" {...field} />
                </FormControl>
                <FormDescription>
                  This is how your friends will find you on Squad Sync. Make it
                  unique!
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Name Here" {...field} />
                </FormControl>
                <FormDescription>
                  This is the name your friends will see. Make sure they know
                  who you are!
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter your bio here" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            {/* <Link href="/dashboard"> */}
            <Button className="text-white" type="submit">
              Submit
            </Button>
            {/* </Link> */}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AccountProfile;
