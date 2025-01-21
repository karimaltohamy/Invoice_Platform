import { signOut } from "@/utils/auth";
import React from "react";

const DashboardRoute = async () => {
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
