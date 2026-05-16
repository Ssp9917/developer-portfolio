import { seedPortfolioIfEmpty, getDefaultPortfolio, upsertPortfolio } from "@/lib/portfolio";
import { jsonSuccess, jsonError } from "@/lib/api-utils";
import { revalidatePath } from "next/cache";

export async function POST(request) {
  try {
    const { force } = await request.json().catch(() => ({}));

    if (force) {
      const defaults = getDefaultPortfolio();
      const data = await upsertPortfolio(defaults);
      revalidatePath("/");
      return jsonSuccess({ message: "Portfolio reset to defaults", data });
    }

    const data = await seedPortfolioIfEmpty();
    revalidatePath("/");
    return jsonSuccess({ message: "Portfolio seeded", data });
  } catch (error) {
    return jsonError(error.message, 500);
  }
}
