"use client";

import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiMenu } from "react-icons/fi";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <ToastContainer theme="dark" position="top-right" />
      <section className="flex min-h-screen relative bg-[#0d1224]">
        {/* Mobile Header Bar */}
        <div className="md:hidden flex items-center justify-between p-4 bg-[#0a0d37] border-b border-[#1f223c] fixed top-0 left-0 right-0 z-40 h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-white hover:text-[#16f2b3] p-1 rounded-md focus:outline-none flex items-center justify-center"
              title="Open menu"
            >
              <FiMenu size={24} />
            </button>
            <span className="font-bold text-white tracking-wide text-sm">Admin Panel</span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[#16f2b3]">Portfolio</span>
        </div>

        {/* Sidebar */}
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-10 overflow-auto pt-20 md:pt-10">
          {children}
        </main>
      </section>
    </>
  );
}
