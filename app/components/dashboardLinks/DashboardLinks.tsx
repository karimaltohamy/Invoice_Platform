"use client";

import { cn } from "@/lib/utils";
import { Home, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DashboardLinks = () => {
  const pathname = usePathname();
  const links = [
    { name: "Dashboard", href: "/dashboard", icon: <Home /> },
    { name: "Invoices", href: "/dashboard/invoices", icon: <Users /> },
  ];
  return (
    <ul className="px-5 flex flex-col gap-2">
      {links.map((link) => (
        <li key={link.name}>
          <Link
            href={link.href}
            className={cn(
              pathname === link.href
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground",
              "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
            )}
          >
            {link.icon} {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default DashboardLinks;
