import prisma from "@/utils/db";
import requireUser from "@/utils/hooks";
import { revalidateTag } from "next/cache";

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: { invoiceId: string };
  }
) {
  const session = await requireUser();
  const { invoiceId } = params;

  const data = await prisma.invoice.delete({
    where: {
      id: invoiceId,
      userId: session.user?.id,
    },
  });

  if (!data) {
    return new Response("Invoice not found", { status: 404 });
  }

  revalidateTag("invoices");
  return new Response("Invoice deleted", { status: 200 });
}
