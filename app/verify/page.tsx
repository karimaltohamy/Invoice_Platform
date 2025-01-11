import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";

const Verify = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[500px]">
        <CardHeader>
          <div className="w-[70px] h-[70px] flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mx-auto">
            <Mail className="size-10" />
          </div>
          <CardTitle className="text-3xl text-center">
            Check your Email
          </CardTitle>
          <CardDescription className="text-lg text-center">
            We have sent you an email to verify your email address.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-5">
          <div className="flex items-center gap-3 bg-yellow-50 border-yellow-300 p-4 rounded-md">
            <AlertCircle className="size-5 text-yellow-500" />
            <p className="text-yellow-500 font-semibold">
              Be sure to check your email for a verification link.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Link
            href="/"
            className={buttonVariants({
              className:
                "w-full flex items-center justify-center font-semibold",
              variant: "outline",
            })}
          >
            <ArrowLeft className="size-5" /> Back to Homepage
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Verify;
