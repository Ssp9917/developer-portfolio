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
    return jsonSuccess(doc.educations || []);
  } catch (error) {
    return jsonError(error.message, 500);
  }
}

export async function POST(request) {
  try {
    const item = await request.json();
    const doc = await getDoc();
    const maxId = doc.educations.reduce((m, e) => Math.max(m, e.id || 0), 0);
    const newItem = { ...item, id: item.id || maxId + 1 };
    doc.educations.push(newItem);
    await doc.save();
    revalidatePath("/");
    return jsonSuccess(newItem, 201);
  } catch (error) {
    return jsonError(error.message, 500);
  }
}

export async function PUT(request) {
  try {
    const item = await request.json();
    const doc = await getDoc();
    const index = doc.educations.findIndex((e) => e.id === item.id);
    if (index === -1) return jsonError("Education not found", 404);
    doc.educations[index] = item;
    await doc.save();
    revalidatePath("/");
    return jsonSuccess(item);
  } catch (error) {
    return jsonError(error.message, 500);
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));
    const doc = await getDoc();
    doc.educations = doc.educations.filter((e) => e.id !== id);
    await doc.save();
    revalidatePath("/");
    return jsonSuccess({ deleted: id });
  } catch (error) {
    return jsonError(error.message, 500);
  }
}
