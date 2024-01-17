"use client";

import { OnboardingSchema } from "@/validations/user";
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

interface AccountProfileProps {
  userData: {
    id: string | undefined;
    email: string | undefined;
  };
}

const AccountProfile: React.FC<AccountProfileProps> = ({ userData }) => {
  const form = useForm<z.infer<typeof OnboardingSchema>>({
    defaultValues: {
      email: userData.email,
      name: "",
    },
    resolver: zodResolver(OnboardingSchema),
  });

  function onSubmit(values: z.infer<typeof OnboardingSchema>) {
    console.log(values);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Email Here" {...field} />
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
          <Button className="text-white" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AccountProfile;
