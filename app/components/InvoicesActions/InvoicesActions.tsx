"use client";

import React, { useEffect, useRef, useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useSession } from "next-auth/react";

interface Props {
  id: string;
  getInvoices: () => void;
}

const InvoicesActions: React.FC<Props> = ({ id, getInvoices }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openMarkAsPaidModal, setOpenMarkAsPaidModal] = useState(false);
  const dropdownTriggerRef = useRef<any>(null);
  const { data: session } = useSession();

  // handle reminder email
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

  // handle delete invoice
  const handleDeleteInvoice = async () => {
    toast.promise(
      fetch(`/api/invoice/${id}/delete`, {
        method: "DELETE",
      }),
      {
        loading: "Deleting Invoice...",
        success: (data) => {
          getInvoices();
          return "Invoice Deleted";
        },
        error: "Error Deleting Invoice",
      }
    );
  };

  // handle delete invoice
  const handleMarkAsPaidInvoice = async () => {
    toast.promise(
      fetch(`/api/invoice/${id}/paid`, {
        method: "PUT",
      }),
      {
        loading: "Marking Invoice as Paid...",
        success: (data) => {
          getInvoices();
          return "Invoice Marked as Paid";
        },
        error: "Error Marking Invoice as Paid",
      }
    );
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild ref={dropdownTriggerRef}>
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
            <button
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => {
                setOpenDeleteModal(true);
                document.body.style.pointerEvents = "auto";
              }}
            >
              <DeleteIcon size={18} />
              <span>Delete Invoice</span>
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button
              onClick={() => setOpenMarkAsPaidModal(true)}
              className="flex items-center gap-3"
            >
              <CircleCheckBig size={18} />
              <span>Mark as Paid</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* delete invoice modal */}
      <Dialog
        open={openDeleteModal}
        onOpenChange={(value) => {
          setOpenDeleteModal(value);
          if (!value) {
            document.body.style.pointerEvents = "auto";
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure to delete this invoice?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              invoice.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setOpenDeleteModal(false)}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              type="button"
              onClick={() => {
                handleDeleteInvoice();
                setOpenDeleteModal(false);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* mark as paid modal */}
      <Dialog
        open={openMarkAsPaidModal}
        onOpenChange={(value) => {
          setOpenMarkAsPaidModal(value);
          if (!value) {
            document.body.style.pointerEvents = "auto";
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure to mark this invoice as paid?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently mark your
              invoice as paid.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => {
                setOpenMarkAsPaidModal(false);
              }}
            >
              Cancel
            </Button>

            <Button
              variant="default"
              type="button"
              onClick={() => {
                handleMarkAsPaidInvoice();
                setOpenMarkAsPaidModal(false);
              }}
            >
              Mark as Paid
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InvoicesActions;
