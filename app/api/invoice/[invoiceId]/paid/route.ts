import prisma from "@/utils/db";
import requireUser from "@/utils/hooks";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: { invoiceId: string };
  }
) {
  const session = await requireUser();
  const { invoiceId } = params;

  const data = await prisma.invoice.update({
    where: {
      id: invoiceId,
      userId: session.user?.id,
    },
    data: {
      status: "PAID",
    },
  });

  if (!data) {
    return NextResponse.json({ message: "Invoice not found" }, { status: 404 });
  }

  return NextResponse.json(
    { message: "Invoice marked as paid" },
    { status: 200 }
  );
}
