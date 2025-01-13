import prisma from "@/utils/db";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import { redirect } from "next/navigation";
import requireUser from "@/utils/hooks";

async function getUser(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      address: true,
    },
  });

  if (!data?.firstName || !data.lastName || !data.address) {
    redirect("/onboarding");
  }
}

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await requireUser();
  await getUser(session?.user?.id ?? "");

  console.log(session);

  return (
    <div>
      <div className="grid md:grid-cols-[250px_1fr] lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <div className="flex flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto p-4">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
