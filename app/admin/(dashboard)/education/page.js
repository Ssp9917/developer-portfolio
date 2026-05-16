"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageHeader from "../../components/PageHeader";
import FormField from "../../components/FormField";
import { adminDelete, adminGet, adminPost, adminPut } from "../../components/admin-api";

const emptyItem = { id: null, title: "", institution: "", duration: "" };

export default function EducationAdminPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyItem);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => {
    adminGet("/api/admin/education")
      .then(setItems)
      .catch(() => toast.error("Failed to load education"));
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await adminPut("/api/admin/education", form);
        toast.success("Education updated");
      } else {
        await adminPost("/api/admin/education", form);
        toast.success("Education added");
      }
      setForm(emptyItem);
      setEditing(false);
      load();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader title="Education" description="Manage your education history." />

      <form onSubmit={handleSave} className="admin-card mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">
          {editing ? "Edit Education" : "Add Education"}
        </h3>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Degree / Title">
            <input
              className="admin-input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </FormField>
          <FormField label="Duration">
            <input
              className="admin-input"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              placeholder="2020 - 2023"
            />
          </FormField>
          <FormField label="Institution" className="md:col-span-2">
            <input
              className="admin-input"
              value={form.institution}
              onChange={(e) => setForm({ ...form, institution: e.target.value })}
              required
            />
          </FormField>
        </section>
        <section className="flex gap-3 mt-4">
          <button type="submit" className="admin-btn-primary" disabled={saving}>
            {editing ? "Update" : "Add"}
          </button>
          {editing && (
            <button
              type="button"
              className="admin-btn-secondary"
              onClick={() => {
                setForm(emptyItem);
                setEditing(false);
              }}
            >
              Cancel
            </button>
          )}
        </section>
      </form>

      <section className="space-y-4">
        {items.map((item) => (
          <article key={item.id} className="admin-card flex justify-between gap-4">
            <section>
              <h4 className="font-semibold text-white">{item.title}</h4>
              <p className="text-slate-400 text-sm">{item.institution}</p>
              <p className="text-[#16f2b3] text-xs mt-1">{item.duration}</p>
            </section>
            <section className="flex gap-2">
              <button
                type="button"
                className="admin-btn-secondary text-sm"
                onClick={() => {
                  setForm(item);
                  setEditing(true);
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="admin-btn-danger text-sm"
                onClick={async () => {
                  if (!confirm("Delete?")) return;
                  await adminDelete(`/api/admin/education?id=${item.id}`);
                  toast.success("Deleted");
                  load();
                }}
              >
                Delete
              </button>
            </section>
          </article>
        ))}
      </section>
    </>
  );
}
