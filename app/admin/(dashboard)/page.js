"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import PageHeader from "../components/PageHeader";
import { adminGet, adminPost } from "../components/admin-api";
import { FiUser, FiFolder, FiAward, FiBriefcase, FiBook } from "react-icons/fi";

const sections = [
  { href: "/admin/profile", label: "Profile", icon: FiUser, key: "profile" },
  { href: "/admin/projects", label: "Projects", icon: FiFolder, key: "projects" },
  { href: "/admin/skills", label: "Skills", icon: FiAward, key: "skills" },
  { href: "/admin/experience", label: "Experience", icon: FiBriefcase, key: "experiences" },
  { href: "/admin/education", label: "Education", icon: FiBook, key: "educations" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    adminGet("/api/admin/portfolio")
      .then((data) => setStats(data))
      .catch(() => toast.error("Failed to load portfolio stats"));
  }, []);

  const handleSeed = async () => {
    try {
      await adminPost("/api/admin/seed", {});
      toast.success("Portfolio data seeded from defaults");
      const data = await adminGet("/api/admin/portfolio");
      setStats(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Manage all portfolio content from one place. Changes appear on your live site after saving."
        action={
          <button type="button" onClick={handleSeed} className="admin-btn-secondary text-sm">
            Seed from defaults
          </button>
        }
      />

      {stats?.profile && (
        <article className="admin-card mb-8">
          <p className="text-[#16f2b3] text-sm uppercase mb-1">Logged in as</p>
          <h2 className="text-xl font-semibold text-white">{stats.profile.name}</h2>
          <p className="text-slate-400">{stats.profile.designation}</p>
        </article>
      )}

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map(({ href, label, icon: Icon, key }) => (
          <Link key={href} href={href} className="admin-card hover:border-violet-500 transition-colors block">
            <Icon className="text-violet-400 mb-3" size={24} />
            <h3 className="font-semibold text-white">{label}</h3>
            <p className="text-slate-400 text-sm mt-1">
              {key === "profile"
                ? "Edit bio, links & contact"
                : `${Array.isArray(stats?.[key]) ? stats[key].length : 0} items`}
            </p>
          </Link>
        ))}
      </section>
    </>
  );
}
