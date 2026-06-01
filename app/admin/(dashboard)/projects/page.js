"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageHeader from "../../components/PageHeader";
import FormField from "../../components/FormField";
import { adminDelete, adminGet, adminPost, adminPut } from "../../components/admin-api";

const emptyProject = {
  id: null,
  name: "",
  description: "",
  image: "",
  githubLink: "",
  demoLink: "",
};

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyProject);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => {
    adminGet("/api/admin/projects")
      .then(setProjects)
      .catch(() => toast.error("Failed to load projects"));
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await adminPut("/api/admin/projects", form);
        toast.success("Project updated");
      } else {
        await adminPost("/api/admin/projects", form);
        toast.success("Project added");
      }
      setForm(emptyProject);
      setEditing(false);
      load();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (project) => {
    setForm(project);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    try {
      await adminDelete(`/api/admin/projects?id=${id}`);
      toast.success("Project deleted");
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <PageHeader title="Projects" description="Add, edit, or remove portfolio projects." />

      <form onSubmit={handleSave} className="admin-card mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">
          {editing ? "Edit Project" : "Add New Project"}
        </h3>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Project Name">
            <input
              className="admin-input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </FormField>
          <FormField label="Image Path">
            <input
              className="admin-input"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="/project.jpg"
            />
          </FormField>
          <FormField label="GitHub Link" className="md:col-span-1">
            <input
              className="admin-input"
              value={form.githubLink}
              onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
            />
          </FormField>
          <FormField label="Live Demo Link">
            <input
              className="admin-input"
              value={form.demoLink}
              onChange={(e) => setForm({ ...form, demoLink: e.target.value })}
            />
          </FormField>
          <FormField label="Description" className="md:col-span-2">
            <textarea
              className="admin-input admin-textarea"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </FormField>
        </section>
        <section className="flex gap-3 mt-4">
          <button type="submit" className="admin-btn-primary" disabled={saving}>
            {saving ? "Saving..." : editing ? "Update" : "Add Project"}
          </button>
          {editing && (
            <button
              type="button"
              className="admin-btn-secondary"
              onClick={() => {
                setForm(emptyProject);
                setEditing(false);
              }}
            >
              Cancel
            </button>
          )}
        </section>
      </form>

      <section className="space-y-4">
        {projects.map((project) => (
          <article key={project.id} className="admin-card flex flex-wrap justify-between gap-4">
            <section>
              <h4 className="font-semibold text-white">{project.name}</h4>
              <p className="text-slate-400 text-sm mt-1 line-clamp-2">{project.description}</p>
            </section>
            <section className="flex gap-2">
              <button type="button" className="admin-btn-secondary text-sm" onClick={() => handleEdit(project)}>
                Edit
              </button>
              <button type="button" className="admin-btn-danger text-sm" onClick={() => handleDelete(project.id)}>
                Delete
              </button>
            </section>
          </article>
        ))}
      </section>
    </>
  );
}
