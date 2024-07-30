import Sidebar from "@/components/admin/adminSidebar/Sidebar";

export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <section>
      {children}
      </section>;
  }
  