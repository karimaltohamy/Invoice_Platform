import prisma from "@/utils/db";
import requireUser from "@/utils/hooks";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await requireUser();

  const data = await prisma.invoice.findMany({
    where: {
      userId: session.user?.id,
    },
  });

  if (!data) {
    return NextResponse.json({ message: "Invoice not found" }, { status: 404 });
  }

  return NextResponse.json({ status: 200, data });
}
