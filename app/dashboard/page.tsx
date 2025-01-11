import { signOut } from "@/utils/auth";
import requireUser from "@/utils/hooks";
import React from "react";

const DashboardRoute = async () => {
  const session = await requireUser();

  return (
    <div>
      dashboard route
      <form
        action={async (formData) => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Logout</button>
      </form>
    </div>
  );
};

export default DashboardRoute;
