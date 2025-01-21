import EditInvoice from "@/app/components/editInvoice/EditInvoice";
import prisma from "@/utils/db";
import requireUser from "@/utils/hooks";
import { notFound } from "next/navigation";
import React from "react";

const getInvoice = async (invoiceId: string, userId: string) => {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
};

const page = async ({ params }: { params: { invoiceId: string } }) => {
  const { invoiceId } = params;
  const session = await requireUser();

  const data = await getInvoice(invoiceId ?? "", session?.user?.id ?? "");

  return (
    <>
      <EditInvoice data={data} id={session?.user?.id ?? ""} />
    </>
  );
};

export default page;
