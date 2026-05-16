import { connectDB } from "@/lib/db/connect";
import Portfolio from "@/lib/db/models/Portfolio";
import { getDefaultPortfolio } from "@/lib/portfolio";
import { jsonSuccess, jsonError } from "@/lib/api-utils";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    await connectDB();
    const doc = await Portfolio.findOne({ key: "main" }).lean();
    const skills = doc?.skills || getDefaultPortfolio().skills;
    return jsonSuccess(skills);
  } catch (error) {
    return jsonError(error.message, 500);
  }
}

export async function PUT(request) {
  try {
    const { skills } = await request.json();
    if (!Array.isArray(skills)) {
      return jsonError("Skills must be an array");
    }
    await connectDB();
    const doc = await Portfolio.findOneAndUpdate(
      { key: "main" },
      { $set: { skills } },
      { upsert: true, new: true, lean: true }
    );
    revalidatePath("/");
    return jsonSuccess(doc.skills);
  } catch (error) {
    return jsonError(error.message, 500);
  }
}
