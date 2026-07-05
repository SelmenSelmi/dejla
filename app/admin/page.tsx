import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard | Dejla Estates",
  description: "Temporary admin dashboard for Dejla Estates contact inquiries.",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
