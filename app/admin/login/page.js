"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../components/admin-api";
import FormField from "../components/FormField";

export default function AdminLoginPage() {
  const router = useRouter();
  const [needsSetup, setNeedsSetup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", name: "Admin" });

  useEffect(() => {
    api
      .get("/api/auth/check-setup")
      .then((res) => setNeedsSetup(res.data.data?.needsSetup))
      .catch(() => setNeedsSetup(true))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const endpoint = needsSetup ? "/api/auth/setup" : "/api/auth/login";
      const res = await api.post(endpoint, form);
      if (res.data.success) {
        toast.success(needsSetup ? "Admin account created!" : "Welcome back!");
        router.push("/admin");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Authentication failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-slate-400">Loading...</p>
      </section>
    );
  }

  return (
    <>
      <ToastContainer theme="dark" position="top-right" />
      <section className="min-h-screen flex items-center justify-center p-6">
        <article className="admin-card w-full max-w-md">
          <header className="mb-8 text-center">
            <p className="text-[#16f2b3] text-sm uppercase tracking-widest mb-2">Portfolio CMS</p>
            <h1 className="text-2xl font-bold text-white">
              {needsSetup ? "Create Admin Account" : "Admin Login"}
            </h1>
            <p className="text-slate-400 text-sm mt-2">
              {needsSetup
                ? "First-time setup — create your admin credentials"
                : "Sign in to manage your portfolio"}
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-1">
            {needsSetup && (
              <FormField label="Name">
                <input
                  className="admin-input"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </FormField>
            )}
            <FormField label="Email">
              <input
                className="admin-input"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="admin@example.com"
              />
            </FormField>
            <FormField label="Password">
              <input
                className="admin-input"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                placeholder="••••••••"
              />
            </FormField>
            <button type="submit" className="admin-btn-primary w-full mt-4" disabled={submitting}>
              {submitting ? "Please wait..." : needsSetup ? "Create Account" : "Sign In"}
            </button>
          </form>
        </article>
      </section>
    </>
  );
}
