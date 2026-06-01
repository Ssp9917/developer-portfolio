import { getPortfolioData } from "@/lib/portfolio";
import { jsonSuccess, jsonError } from "@/lib/api-utils";

export async function GET() {
  try {
    const data = await getPortfolioData();
    return jsonSuccess(data);
  } catch (error) {
    return jsonError("Failed to fetch portfolio", 500);
  }
}

export const revalidate = 60;
