"use server";

import prisma from "@/utils/db";
import requireUser from "@/utils/hooks";
import { onboardingSchema } from "@/utils/zodSchemas";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
export const onboarding = async (prevState: any, formData: FormData) => {
  const session = await requireUser();

  const result = parseWithZod(formData, {
    schema: onboardingSchema,
  });

  if (result.status !== "success") {
    return result.reply();
  }

  const data = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      firstName: result.value.firstName,
      lastName: result.value.lastName,
      address: result.value.address,
    },
  });

  redirect("/dashboard");
};
