"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageHeader from "../../components/PageHeader";
import FormField from "../../components/FormField";
import { adminDelete, adminGet, adminPost, adminPut } from "../../components/admin-api";
import { FiUpload, FiImage, FiLoader, FiTrash2 } from "react-icons/fi";

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
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message || "Failed to upload image");
      }
      setForm((prev) => ({ ...prev, image: resData.data.url }));
      toast.success("Image uploaded to Cloudinary!");
    } catch (err) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

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
          <FormField label="Project Image" className="md:col-span-2">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-4">
                {form.image ? (
                  <div className="relative w-40 aspect-video rounded-lg overflow-hidden border border-[#1f223c]">
                    <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, image: "" })}
                      className="absolute top-1.5 right-1.5 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full transition-colors flex items-center justify-center shadow"
                      title="Remove image"
                    >
                      <FiTrash2 size={12} />
                    </button>
                  </div>
                ) : (
                  <div className="w-40 aspect-video rounded-lg border border-dashed border-[#1f223c] flex flex-col items-center justify-center text-slate-500 bg-[#0d1224] gap-1">
                    <FiImage size={24} />
                    <span className="text-[10px]">No image</span>
                  </div>
                )}
                
                <div className="flex flex-col gap-2">
                  <label className="admin-btn-secondary text-xs cursor-pointer flex items-center gap-2 w-fit py-2 px-3">
                    {uploading ? (
                      <>
                        <FiLoader className="animate-spin" size={14} />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <FiUpload size={14} />
                        <span>Upload Image</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                  </label>
                  <p className="text-slate-500 text-xs">Supported formats: JPG, PNG, GIF, WebP</p>
                </div>
              </div>

              <div>
                <input
                  className="admin-input"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="Or enter image URL/path manually"
                />
              </div>
            </div>
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

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <article key={project.id} className="admin-card flex flex-col justify-between gap-4 h-full group hover:border-[#8b5cf6] transition-all duration-300">
            <div>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-slate-950 mb-3 border border-[#1f223c]">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-600">
                    <FiImage size={32} />
                  </div>
                )}
              </div>
              <h4 className="font-semibold text-lg text-white group-hover:text-[#16f2b3] transition-colors">{project.name}</h4>
              <p className="text-slate-400 text-sm mt-1 line-clamp-3 leading-relaxed">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-3 text-xs">
                {project.githubLink && (
                  <span className="bg-[#1f223c] text-violet-300 px-2.5 py-1 rounded-full border border-violet-900/50">
                    GitHub
                  </span>
                )}
                {project.demoLink && (
                  <span className="bg-[#1f223c] text-pink-300 px-2.5 py-1 rounded-full border border-pink-900/50">
                    Live Demo
                  </span>
                )}
              </div>
            </div>
            
            <section className="flex gap-2 border-t border-[#1f223c] pt-4 mt-auto">
              <button type="button" className="admin-btn-secondary flex-1 text-sm py-2" onClick={() => handleEdit(project)}>
                Edit
              </button>
              <button type="button" className="admin-btn-danger flex-1 text-sm py-2" onClick={() => handleDelete(project.id)}>
                Delete
              </button>
            </section>
          </article>
        ))}
      </section>
    </>
  );
}
