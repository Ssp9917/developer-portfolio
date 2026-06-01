import { connectDB } from "@/lib/db/connect";
import Portfolio from "@/lib/db/models/Portfolio";
import { personalData } from "@/utils/data/personal-data";
import { projectsData } from "@/utils/data/projects-data";
import { skillsData } from "@/utils/data/skills";
import { experiences } from "@/utils/data/experience";
import { educations } from "@/utils/data/educations";

export function getDefaultPortfolio() {
  return {
    profile: { ...personalData },
    projects: [...projectsData],
    skills: [...skillsData],
    experiences: [...experiences],
    educations: [...educations],
  };
}

export async function getPortfolioFromDB() {
  await connectDB();
  const doc = await Portfolio.findOne({ key: "main" }).lean();
  if (!doc) return null;

  return {
    profile: doc.profile,
    projects: doc.projects || [],
    skills: doc.skills || [],
    experiences: doc.experiences || [],
    educations: doc.educations || [],
  };
}

export async function getPortfolioData() {
  try {
    const fromDb = await getPortfolioFromDB();
    if (fromDb?.profile?.name) {
      return fromDb;
    }
  } catch (error) {
    console.error("Portfolio DB fetch failed:", error.message);
  }
  return getDefaultPortfolio();
}

export async function upsertPortfolio(data) {
  await connectDB();
  return Portfolio.findOneAndUpdate(
    { key: "main" },
    { key: "main", ...data },
    { upsert: true, new: true, lean: true }
  );
}

export async function seedPortfolioIfEmpty() {
  await connectDB();
  const existing = await Portfolio.findOne({ key: "main" });
  if (existing) return existing.toObject();

  const defaults = getDefaultPortfolio();
  const created = await Portfolio.create({ key: "main", ...defaults });
  return created.toObject();
}
