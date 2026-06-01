import AdminSidebar from "../components/AdminSidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardLayout({ children }) {
  return (
  <>
    <ToastContainer theme="dark" position="top-right" />
    <section className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 lg:p-10 overflow-auto">{children}</main>
    </section>
  </>
  );
}
