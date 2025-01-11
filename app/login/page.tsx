import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth, signIn } from "@/utils/auth";
import React from "react";
import SubmitButton from "../components/SubmitButton";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>

          <CardDescription>
            Enter your email and password to login to your account.
          </CardDescription>
        </CardHeader>{" "}
        <CardContent>
          <form
            action={async (formData) => {
              "use server";
              await signIn("nodemailer", formData);
            }}
            className="flex flex-col gap-2"
          >
            <div className="mb-5">
              <Label htmlFor="email" className="mb-2">
                Email
              </Label>
              <Input
                name="email"
                type="email"
                id="email"
                placeholder="hello@example.com"
                required
              />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
