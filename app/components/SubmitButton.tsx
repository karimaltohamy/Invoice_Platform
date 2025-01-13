"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

interface Props {
  title?: string;
}

const SubmitButton: React.FC<Props> = ({ title = "Submit" }) => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button className="w-full" disabled>
          <Loader2 className="size-4 mr-2 animate-spin" />
          Please wait...
        </Button>
      ) : (
        <Button type="submit" className="w-full">
          {title}
        </Button>
      )}
    </>
  );
};

export default SubmitButton;
