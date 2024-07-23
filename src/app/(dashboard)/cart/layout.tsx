"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/navigation/Navbar";
import store from "@/utils/redux/store";
import { Provider } from "react-redux";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <Navbar />
      <section style={{ padding: "6rem 2rem" }}>{children}</section>
      <Footer />
    </Provider>
  );
}
