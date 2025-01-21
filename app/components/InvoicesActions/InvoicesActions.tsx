"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  CircleCheckBig,
  DeleteIcon,
  DownloadCloud,
  EllipsisVertical,
  Mail,
  Pencil,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface Props {
  id: string;
}

const InvoicesActions: React.FC<Props> = ({ id }) => {
  const handleReminderEmail = async () => {
    toast.promise(
      fetch(`/api/email/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      {
        loading: "Sending Reminder Email",
        success: "Reminder Email Sent",
        error: "Error Sending Reminder Email",
      }
    );
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"secondary"}>
          <EllipsisVertical size={18} className="ml-auto" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link
            href={`/dashboard/invoices/edit/${id}`}
            className="flex items-center gap-3"
          >
            <Pencil size={18} />
            <span>Edit Invoice</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={`/api/invoice/${id}`}
            className="flex items-center gap-3"
            target="_blank"
          >
            <DownloadCloud size={18} />
            <span>Download Invoice</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            onClick={handleReminderEmail}
            className="flex items-center gap-3"
          >
            <Mail size={18} />
            <span>Reminder Email</span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex items-center gap-3">
            <DeleteIcon size={18} />
            <span>Delete Invoice</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex items-center gap-3">
            <CircleCheckBig size={18} />
            <span>Mark as Paid</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default InvoicesActions;
