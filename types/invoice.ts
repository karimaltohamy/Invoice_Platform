export type Invoice = {
  clientAddress: string;
  clientEmail: string;
  clientName: string;
  createdAt: Date;
  currency: string;
  date: Date;
  dueDate: number;
  fromAddress: string;
  fromEmail: string;
  fromName: string;
  id: string;
  invoiceItemDescription: string;
  invoiceItemQuantity: number;
  invoiceItemRate: number;
  invoiceName: string;
  invoiceNumber: number;
  note: string;
  status: "PENDING" | "PAID" | "CANCELLED";
  total: number;
  updatedAt: Date;
  userId: string;
};
