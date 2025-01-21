"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useActionState, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/app/components/SubmitButton";
import { createInvoice, editInvoice } from "@/app/actions";
import { invoiceSchema } from "@/utils/zodSchemas";
import { formatCurrency } from "@/utils/formatCurrency";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Invoice } from "@/types/invoice";

interface Props {
  data: any;
  id: string;
}

const EditInvoice: React.FC<Props> = ({ data, id }) => {
  const [lastResult, action] = useActionState(editInvoice, undefined);
  const [selectedDate, setSelectDate] = useState<Date>(data.date || new Date());
  const [currency, setCurrency] = useState<string>("USD");
  const [quantity, setQuantity] = useState<number>(data.invoiceItemQuantity);
  const [rate, setRate] = useState<number>(data.invoiceItemRate);
  const calculateTotal = Number(quantity) * Number(rate);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: invoiceSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <Card>
      <CardContent className="!py-5">
        <form action={action} onSubmit={form.onSubmit} id={form.id}>
          <input
            type="hidden"
            name={fields.date.name}
            value={selectedDate.toISOString()}
          />
          <input type="hidden" name={"id"} value={data.id} />

          <input
            type="hidden"
            name={fields.total.name}
            value={calculateTotal}
          />

          <div className="mb-5">
            <div className="flex items-center gap-2 ">
              <Badge variant={"outline"}>Draft</Badge>
              <Input
                placeholder="Test 123"
                className="max-w-[220px]"
                name={fields.invoiceName.name}
                key={fields.invoiceName.key}
                defaultValue={data.invoiceName}
                type="text"
              />
            </div>
            {fields.invoiceName.errors && (
              <p className="text-red-500 text-sm mt-1">
                {fields.invoiceName.errors}
              </p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-5 mb-5">
            <div>
              <Label className="font-semibold">Invoice No.</Label>
              <div className="flex items-center">
                <span className="bg-gray-100 border border-gray-200 px-2 h-[36px] leading-[36px] rounded-md rounded-r-none">
                  #
                </span>
                <Input
                  placeholder="5"
                  className="rounded-l-none"
                  name={fields.invoiceNumber.name}
                  key={fields.invoiceNumber.key}
                  defaultValue={data.invoiceNumber}
                  type="number"
                />
              </div>
              {fields.invoiceNumber.errors && (
                <p className="text-red-500 text-sm mt-1">
                  {fields.invoiceNumber.errors}
                </p>
              )}
            </div>
            <div>
              <Label className="font-semibold">Currency</Label>
              <Select
                name={fields.currency.name}
                key={fields.currency.key}
                defaultValue={data.currency}
                value={currency}
                onValueChange={(value) => setCurrency(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">
                    United States Dollar -- USD
                  </SelectItem>
                  <SelectItem value="EUR">Euro -- EUR</SelectItem>
                </SelectContent>
              </Select>
              {fields.currency.errors && (
                <p className="text-red-500 text-sm mt-1">
                  {fields.currency.errors}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 mb-5">
            <div>
              <Label className="font-semibold">From</Label>
              <Input
                placeholder="Your Name"
                className="mb-2"
                name={fields.fromName.name}
                key={fields.fromName.key}
                defaultValue={data.fromName}
                type="text"
              />
              {fields.fromName.errors && (
                <p className="text-red-500 text-sm mt-1">
                  {fields.fromName.errors}
                </p>
              )}
              <Input
                placeholder="Your Email"
                className="mb-2"
                name={fields.fromEmail.name}
                key={fields.fromEmail.key}
                defaultValue={data.fromEmail}
                type="email"
              />
              {fields.fromEmail.errors && (
                <p className="text-red-500 text-sm mt-1">
                  {fields.fromEmail.errors}
                </p>
              )}
              <Input
                placeholder="Your Address"
                className="mb-2"
                name={fields.fromAddress.name}
                key={fields.fromAddress.key}
                defaultValue={data.fromAddress}
                type="text"
              />
              {fields.fromAddress.errors && (
                <p className="text-red-500 text-sm mt-1">
                  {fields.fromAddress.errors}
                </p>
              )}
            </div>
            <div>
              <Label className="font-semibold">To</Label>
              <Input
                placeholder="client Name"
                className="mb-2"
                name={fields.clientName.name}
                key={fields.clientName.key}
                defaultValue={data.clientName}
                type="text"
              />
              {fields.clientName.errors && (
                <p className="text-red-500 text-sm mt-1">
                  {fields.clientName.errors}
                </p>
              )}
              <Input
                placeholder="client Email"
                className="mb-2"
                name={fields.clientEmail.name}
                key={fields.clientEmail.key}
                defaultValue={data.clientEmail}
                type="email"
              />
              {fields.clientEmail.errors && (
                <p className="text-red-500 text-sm mt-1">
                  {fields.clientEmail.errors}
                </p>
              )}
              <Input
                placeholder="client Address"
                className="mb-2"
                name={fields.clientAddress.name}
                key={fields.clientAddress.key}
                defaultValue={data.clientAddress}
                type="text"
              />
              {fields.clientAddress.errors && (
                <p className="text-red-500 text-sm mt-1">
                  {fields.clientAddress.errors}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 mb-5">
            <div>
              <Label className="font-semibold">Date</Label>
              <Popover>
                <PopoverTrigger className="w-full">
                  <div className="py-2 px-3 rounded-md border border-gray-200 flex items-center gap-2 w-full text-sm">
                    <CalendarIcon size={18} />
                    {selectedDate.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      timeZone: "UTC",
                    })}
                  </div>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date: any) => setSelectDate(date || new Date())}
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>
              {fields.date.errors && (
                <p className="text-red-500 text-sm mt-1">
                  {fields.date.errors}
                </p>
              )}
            </div>
            <div>
              <Label className="font-semibold">Invoice Due</Label>
              <Select
                name={fields.dueDate.name}
                key={fields.dueDate.key}
                defaultValue={data.dueDate.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder="select due Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Duw on Reciept</SelectItem>
                  <SelectItem value="15">Net 15</SelectItem>
                  <SelectItem value="30">Net 30</SelectItem>
                </SelectContent>
              </Select>
              {fields.dueDate.errors && (
                <p className="text-red-500 text-sm mt-1">
                  {fields.dueDate.errors}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 mb-5">
            <p className="col-span-6 font-semibold">Description</p>
            <p className="col-span-2 font-semibold">Quantity</p>
            <p className="col-span-2 font-semibold">Rate</p>
            <p className="col-span-2 font-semibold">Amount</p>

            <div className="col-span-6">
              <Textarea
                placeholder="Item name & description"
                name={fields.invoiceItemDescription.name}
                key={fields.invoiceItemDescription.key}
                defaultValue={data.invoiceItemDescription}
              />
              {fields.invoiceItemDescription.errors && (
                <p className="text-red-500 text-sm mt-1">
                  {fields.invoiceItemDescription.errors}
                </p>
              )}
            </div>
            <div className="col-span-2">
              <Input
                placeholder="0"
                type="number"
                name={fields.invoiceItemQuantity.name}
                key={fields.invoiceItemQuantity.key}
                defaultValue={data.invoiceItemQuantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                value={quantity}
              />
              {fields.invoiceItemQuantity.errors && (
                <p className="text-red-500 text-sm mt-1">
                  {fields.invoiceItemQuantity.errors}
                </p>
              )}
            </div>
            <div className="col-span-2">
              <Input
                placeholder="0"
                type="number"
                name={fields.invoiceItemRate.name}
                key={fields.invoiceItemRate.key}
                defaultValue={data.invoiceItemRate}
                onChange={(e) => setRate(Number(e.target.value))}
              />
              {fields.invoiceItemRate.errors && (
                <p className="text-red-500 text-sm mt-1">
                  {fields.invoiceItemRate.errors}
                </p>
              )}
            </div>
            <div className="col-span-2">
              <Input
                placeholder="0"
                type="text"
                value={formatCurrency(calculateTotal, currency)}
                disabled
              />
              {fields.invoiceItemRate.errors && (
                <p className="text-red-500 text-sm mt-1">
                  {fields.invoiceItemRate.errors}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col ml-auto w-60 mb-5">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-200">
              <h4 className="font-semibold">Subtotal</h4>
              <span>{formatCurrency(calculateTotal, currency)}</span>
            </div>
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Total ({currency})</h4>
              <span>{formatCurrency(calculateTotal, currency)}</span>
            </div>
          </div>

          <div className="mb-3">
            <Label className="font-semibold">Note</Label>
            <Textarea
              placeholder="Add your notes here"
              name={fields.note.name}
              key={fields.note.key}
              defaultValue={data.note}
            />
            {fields.note.errors && (
              <p className="text-red-500 text-sm mt-1">{fields.note.errors}</p>
            )}
          </div>
          <SubmitButton
            title="Save Changes"
            className="max-w-[300px] ml-auto block mt-7"
          />
        </form>
      </CardContent>
    </Card>
  );
};

export default EditInvoice;
