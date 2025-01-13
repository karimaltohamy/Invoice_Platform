"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useActionState } from "react";
import SubmitButton from "../components/SubmitButton";
import { onboarding } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "@/utils/zodSchemas";

const page = () => {
  const [lastResult, action] = useActionState(onboarding, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: onboardingSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="max-w-[500px] w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Your are almost finished!</CardTitle>
          <CardDescription className="text-md">
            Enter your information to create your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action} onSubmit={form.onSubmit} id={form.id}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  name={fields.firstName.name}
                  key={fields.firstName.key}
                  defaultValue={fields.firstName.value}
                  type="text"
                  id="firstName"
                  placeholder="John"
                />
                {fields.firstName.errors && (
                  <p className="text-red-500 text-sm">
                    {fields.firstName.errors}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  name={fields.lastName.name}
                  key={fields.lastName.key}
                  defaultValue={fields.lastName.value}
                  type="text"
                  id="lastName"
                  placeholder="Doe"
                />
                {fields.lastName.errors && (
                  <p className="text-red-500 text-sm">
                    {fields.lastName.errors}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  name={fields.address.name}
                  key={fields.address.key}
                  defaultValue={fields.address.value}
                  type="text"
                  id="address"
                  placeholder="123 Main St"
                />
                {fields.address.errors && (
                  <p className="text-red-500 text-sm">
                    {fields.address.errors}
                  </p>
                )}
              </div>
            </div>
            <SubmitButton title="Create Account" />
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
