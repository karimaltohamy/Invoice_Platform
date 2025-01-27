"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

interface Props {
  title?: string;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}

const SubmitButton: React.FC<Props> = ({
  title = "Submit",
  className,
  variant,
}) => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button className={"w-full " + className} disabled variant={variant}>
          <Loader2 className="size-4 mr-2 animate-spin" />
          Please wait...
        </Button>
      ) : (
        <Button
          type="submit"
          className={"w-full " + className}
          variant={variant}
        >
          {title}
        </Button>
      )}
    </>
  );
};

export default SubmitButton;
