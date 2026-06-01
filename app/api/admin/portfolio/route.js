import { getPortfolioFromDB, upsertPortfolio, getDefaultPortfolio } from "@/lib/portfolio";
import { jsonSuccess, jsonError } from "@/lib/api-utils";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const data = (await getPortfolioFromDB()) || getDefaultPortfolio();
    return jsonSuccess(data);
  } catch (error) {
    return jsonError(error.message || "Failed to fetch", 500);
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const updated = await upsertPortfolio(body);
    revalidatePath("/");
    return jsonSuccess(updated);
  } catch (error) {
    return jsonError(error.message || "Failed to update", 500);
  }
}
