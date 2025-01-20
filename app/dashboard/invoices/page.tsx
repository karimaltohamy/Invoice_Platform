import MainTable from "@/app/components/mainTabel/MainTable.component";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TableCell, TableRow } from "@/components/ui/table";
import prisma from "@/utils/db";
import { formatCurrency } from "@/utils/formatCurrency";
import requireUser from "@/utils/hooks";
import { format } from "date-fns";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import React, { use } from "react";

const getData = async (userId: string) => {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      invoiceNumber: true,
      status: true,
      date: true,
      total: true,
      clientName: true,
      currency: true,
    },
  });

  return data;
};

const page = async () => {
  const session = await requireUser();
  const data = await getData(session?.user?.id ?? "");

  console.log(data);

  return (
    <Card>
      <CardContent className="!py-5">
        <div className="flex items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-2xl font-semibold">Invoices</h2>
            <p className="text-sm text-gray-500">
              Manage your invoices right here
            </p>
          </div>
          <Link href="/dashboard/invoices/create">
            <Button>Create Invoice</Button>
          </Link>
        </div>
        {/* invoices */}
        <MainTable
          columns={[
            { label: "Invoice ID", className: "w-[100px]" },
            { label: "Customer" },
            { label: "Amount" },
            { label: "Status" },
            { label: "Date" },
            { label: "Actions", className: "text-right" },
          ]}
        >
          {data.map((invoice: any, i: number) => (
            <TableRow key={i}>
              <TableCell>{invoice.invoiceNumber}</TableCell>
              <TableCell>{invoice.clientName}</TableCell>
              <TableCell>
                {formatCurrency(invoice.total, invoice.currency)}
              </TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell>
                {format(new Date(invoice.date), "MMM dd, yyyy")}
              </TableCell>
              <TableCell className="text-right">
                <EllipsisVertical size={18} className="ml-auto" />
              </TableCell>
            </TableRow>
          ))}
        </MainTable>
      </CardContent>
    </Card>
  );
};

export default page;
