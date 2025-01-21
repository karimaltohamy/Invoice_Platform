import prisma from "@/utils/db";
import requireUser from "@/utils/hooks";
import { mailtrapClient } from "@/utils/mailtrap";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: { invoiceId: string };
  }
) {
  try {
    const session = await requireUser();
    const { invoiceId } = params;

    console.log(session.user?.id);
    console.log(invoiceId);

    const data = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    });

    if (!data) {
      return new Response("Invoice not found", { status: 404 });
    }

    const sender = { name: "karim altohamy", email: "hello@demomailtrap.com" };

    mailtrapClient.send({
      from: sender,
      to: [{ email: "karimbadr2003@gmail.com" }],
      template_uuid: "61e1b81a-59c0-495d-9b95-309238e43533",
      template_variables: {
        company_info_name: "Altohamy Platform",
        first_name: data?.invoiceName ?? "",
        company_info_address: "Damanhur, Egypt",
        company_info_city: "Damanhur",
        company_info_zip_code: "26700",
        company_info_country: "Egypt",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
