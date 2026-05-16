"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageHeader from "../../components/PageHeader";
import { adminGet, adminPut } from "../../components/admin-api";

const AVAILABLE_SKILLS = [
  "HTML", "CSS", "Javascript", "Typescript", "React", "Next JS", "Node JS",
  "Tailwind", "MongoDB", "MySQL", "PostgreSQL", "Git", "AWS", "Firebase",
  "Bootstrap", "Docker", "Python", "Java", "PHP", "Flutter", "Graphql",
  "MaterialUI", "Nginx", "Strapi", "Vue", "Angular", "Figma",
];

export default function SkillsAdminPage() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminGet("/api/admin/skills")
      .then(setSkills)
      .catch(() => toast.error("Failed to load skills"));
  }, []);

  const saveSkills = async (updated) => {
    setSaving(true);
    try {
      await adminPut("/api/admin/skills", { skills: updated });
      setSkills(updated);
      toast.success("Skills saved!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (!trimmed || skills.includes(trimmed)) return;
    saveSkills([...skills, trimmed]);
    setNewSkill("");
  };

  const removeSkill = (skill) => {
    saveSkills(skills.filter((s) => s !== skill));
  };

  const togglePreset = (skill) => {
    if (skills.includes(skill)) {
      removeSkill(skill);
    } else {
      saveSkills([...skills, skill]);
    }
  };

  return (
    <>
      <PageHeader
        title="Skills"
        description="Manage skills shown in the marquee. Names must match icons in skill-image.js."
      />

      <article className="admin-card mb-8">
        <h3 className="font-semibold text-white mb-4">Your Skills</h3>
        <section className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-2 bg-[#1f223c] text-white px-3 py-1.5 rounded-full text-sm"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="text-pink-400 hover:text-pink-300"
                aria-label={`Remove ${skill}`}
              >
                ×
              </button>
            </span>
          ))}
        </section>
        <section className="flex gap-2">
          <input
            className="admin-input flex-1"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add custom skill..."
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
          />
          <button type="button" className="admin-btn-primary" onClick={addSkill} disabled={saving}>
            Add
          </button>
        </section>
      </article>

      <article className="admin-card">
        <h3 className="font-semibold text-white mb-4">Quick Add (presets)</h3>
        <section className="flex flex-wrap gap-2">
          {AVAILABLE_SKILLS.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => togglePreset(skill)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                skills.includes(skill)
                  ? "bg-violet-600/30 border-violet-500 text-[#16f2b3]"
                  : "border-[#1f223c] text-slate-400 hover:border-violet-500"
              }`}
            >
              {skill}
            </button>
          ))}
        </section>
      </article>
    </>
  );
}
