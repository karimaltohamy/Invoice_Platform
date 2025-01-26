"use client";

import MainTable from "@/app/components/mainTabel/MainTable.component";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/utils/formatCurrency";
import { format } from "date-fns";

import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import InvoicesActions from "@/app/components/InvoicesActions/InvoicesActions";

const page = () => {
  const [invoices, setInvoices] = useState<any[]>([]);

  const getInvoices = async () => {
    try {
      const res = await fetch("/api/invoices").then((res) => res.json());
      setInvoices(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInvoices();
  }, []);

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
          {invoices.map((invoice: any, i: number) => (
            <TableRow key={i}>
              <TableCell className="font-semibold">
                #{invoice.invoiceNumber}
              </TableCell>
              <TableCell>{invoice.clientName}</TableCell>
              <TableCell>
                {formatCurrency(invoice.total, invoice.currency)}
              </TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell>
                {format(new Date(invoice.date), "MMM dd, yyyy")}
              </TableCell>
              <TableCell className="text-right">
                <InvoicesActions id={invoice.id} getInvoices={getInvoices} />
              </TableCell>
            </TableRow>
          ))}
        </MainTable>
      </CardContent>
    </Card>
  );
};

export default page;
