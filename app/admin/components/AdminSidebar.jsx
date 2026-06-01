"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiHome,
  FiUser,
  FiFolder,
  FiAward,
  FiBriefcase,
  FiBook,
  FiLogOut,
  FiExternalLink,
} from "react-icons/fi";
import { api } from "./admin-api";
import { toast } from "react-toastify";

const links = [
  { href: "/admin", label: "Dashboard", icon: FiHome },
  { href: "/admin/profile", label: "Profile", icon: FiUser },
  { href: "/admin/projects", label: "Projects", icon: FiFolder },
  { href: "/admin/skills", label: "Skills", icon: FiAward },
  { href: "/admin/experience", label: "Experience", icon: FiBriefcase },
  { href: "/admin/education", label: "Education", icon: FiBook },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
      toast.success("Logged out");
      router.push("/admin/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <aside className="w-64 min-h-screen border-r border-[#1f223c] bg-[#0a0d37] p-4 flex flex-col">
      <header className="mb-8 px-2">
        <p className="text-xs uppercase tracking-widest text-[#16f2b3]">Portfolio</p>
        <h2 className="text-xl font-bold text-white">Admin Panel</h2>
      </header>

      <nav className="flex-1 space-y-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`admin-sidebar-link ${pathname === href ? "active" : ""}`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <footer className="space-y-2 pt-4 border-t border-[#1f223c]">
        <Link href="/" target="_blank" className="admin-sidebar-link">
          <FiExternalLink size={18} />
          <span>View Site</span>
        </Link>
        <button type="button" onClick={handleLogout} className="admin-sidebar-link w-full text-left">
          <FiLogOut size={18} />
          <span>Logout</span>
        </button>
      </footer>
    </aside>
  );
}
