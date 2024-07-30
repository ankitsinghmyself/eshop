import Sidebar from "@/components/admin/navigation/Sidebar";

export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <section>
      {children}
      </section>;
  }
  