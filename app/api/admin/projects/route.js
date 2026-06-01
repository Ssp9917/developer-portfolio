import { connectDB } from "@/lib/db/connect";
import Portfolio from "@/lib/db/models/Portfolio";
import { getDefaultPortfolio } from "@/lib/portfolio";
import { jsonSuccess, jsonError } from "@/lib/api-utils";
import { revalidatePath } from "next/cache";

async function getDoc() {
  await connectDB();
  let doc = await Portfolio.findOne({ key: "main" });
  if (!doc) {
    const defaults = getDefaultPortfolio();
    doc = await Portfolio.create({ key: "main", ...defaults });
  }
  return doc;
}

export async function GET() {
  try {
    const doc = await getDoc();
    return jsonSuccess(doc.projects || []);
  } catch (error) {
    return jsonError(error.message, 500);
  }
}

export async function POST(request) {
  try {
    const project = await request.json();
    const doc = await getDoc();
    const maxId = doc.projects.reduce((m, p) => Math.max(m, p.id || 0), 0);
    const newProject = { ...project, id: project.id || maxId + 1 };
    doc.projects.push(newProject);
    await doc.save();
    revalidatePath("/");
    return jsonSuccess(newProject, 201);
  } catch (error) {
    return jsonError(error.message, 500);
  }
}

export async function PUT(request) {
  try {
    const project = await request.json();
    const doc = await getDoc();
    const index = doc.projects.findIndex((p) => p.id === project.id);
    if (index === -1) return jsonError("Project not found", 404);
    doc.projects[index] = project;
    await doc.save();
    revalidatePath("/");
    return jsonSuccess(project);
  } catch (error) {
    return jsonError(error.message, 500);
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));
    const doc = await getDoc();
    doc.projects = doc.projects.filter((p) => p.id !== id);
    await doc.save();
    revalidatePath("/");
    return jsonSuccess({ deleted: id });
  } catch (error) {
    return jsonError(error.message, 500);
  }
}
