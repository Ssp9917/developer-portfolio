import { connectDB } from "@/lib/db/connect";
import Portfolio from "@/lib/db/models/Portfolio";
import { getDefaultPortfolio } from "@/lib/portfolio";
import { jsonSuccess, jsonError } from "@/lib/api-utils";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    await connectDB();
    const doc = await Portfolio.findOne({ key: "main" }).lean();
    const profile = doc?.profile || getDefaultPortfolio().profile;
    return jsonSuccess(profile);
  } catch (error) {
    return jsonError(error.message, 500);
  }
}

export async function PUT(request) {
  try {
    const profile = await request.json();
    await connectDB();
    const doc = await Portfolio.findOneAndUpdate(
      { key: "main" },
      { $set: { profile } },
      { upsert: true, new: true, lean: true }
    );
    revalidatePath("/");
    return jsonSuccess(doc.profile);
  } catch (error) {
    return jsonError(error.message, 500);
  }
}
