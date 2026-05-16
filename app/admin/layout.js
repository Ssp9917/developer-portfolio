import React from "react";
import "./admin.css";

export const metadata = {
  title: "Portfolio Admin",
  description: "Manage your portfolio content",
};

export default function AdminRootLayout({ children }) {
  return React.createElement("\u0064iv", { className: "admin-shell" }, children);
}
