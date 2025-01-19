"use server";

import prisma from "@/utils/db";
import requireUser from "@/utils/hooks";
import { invoiceSchema, onboardingSchema } from "@/utils/zodSchemas";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

// Onboarding
export const onboarding = async (prevState: any, formData: FormData) => {
  const session = await requireUser();

  const result = parseWithZod(formData, {
    schema: onboardingSchema,
  });

  if (result.status !== "success") {
    return result.reply();
  }

  await prisma.user.update({
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

// Invoice
export const createInvoice = async (prevState: any, formData: FormData) => {
  const session = await requireUser();

  const result = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  if (result.status !== "success") {
    return result.reply();
  }

  await prisma.invoice.create({
    data: {
      invoiceName: result.value.invoiceName,
      total: result.value.total,
      status: result.value.status,
      date: result.value.date,
      dueDate: result.value.dueDate,
      fromName: result.value.fromName,
      fromEmail: result.value.fromEmail,
      fromAddress: result.value.fromAddress,
      clientName: result.value.clientName,
      clientEmail: result.value.clientEmail,
      clientAddress: result.value.clientAddress,
      currency: result.value.currency,
      invoiceNumber: result.value.invoiceNumber,
      note: result.value.note,
      invoiceItemDescription: result.value.invoiceItemDescription,
      invoiceItemQuantity: result.value.invoiceItemQuantity,
      invoiceItemRate: result.value.invoiceItemRate,
      userId: session.user?.id,
    },
  });

  redirect("/dashboard/invoices");
};
