import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const page = () => {
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
          <Button>Create Invoice</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default page;
