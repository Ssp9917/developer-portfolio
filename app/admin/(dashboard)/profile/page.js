"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageHeader from "../../components/PageHeader";
import FormField from "../../components/FormField";
import { adminGet, adminPut } from "../../components/admin-api";

const fields = [
  { key: "name", label: "Full Name" },
  { key: "designation", label: "Designation" },
  { key: "description", label: "About Description", textarea: true },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "address", label: "Address" },
  { key: "profile", label: "Profile Image Path", placeholder: "/profile.png" },
  { key: "resume", label: "Resume URL" },
  { key: "github", label: "GitHub URL" },
  { key: "linkedIn", label: "LinkedIn URL" },
  { key: "facebook", label: "Facebook URL" },
  { key: "twitter", label: "Twitter URL" },
  { key: "stackOverflow", label: "Stack Overflow URL" },
  { key: "leetcode", label: "LeetCode URL" },
  { key: "devUsername", label: "Dev.to Username" },
];

export default function ProfileAdminPage() {
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminGet("/api/admin/profile")
      .then(setProfile)
      .catch(() => toast.error("Failed to load profile"));
  }, []);

  const handleChange = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminPut("/api/admin/profile", profile);
      toast.success("Profile updated!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!profile) {
    return <p className="text-slate-400">Loading profile...</p>;
  }

  return (
    <>
      <PageHeader title="Profile" description="Update your personal info, bio, and social links." />
      <form onSubmit={handleSave} className="admin-card max-w-3xl">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          {fields.map(({ key, label, textarea, placeholder }) => (
            <FormField key={key} label={label} className={textarea ? "md:col-span-2" : ""}>
              {textarea ? (
                <textarea
                  className="admin-input admin-textarea"
                  value={profile[key] || ""}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              ) : (
                <input
                  className="admin-input"
                  value={profile[key] || ""}
                  onChange={(e) => handleChange(key, e.target.value)}
                  placeholder={placeholder}
                />
              )}
            </FormField>
          ))}
        </section>
        <button type="submit" className="admin-btn-primary mt-4" disabled={saving}>
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </>
  );
}
