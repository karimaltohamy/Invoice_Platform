import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
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
