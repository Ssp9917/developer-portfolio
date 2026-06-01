import { connectDB } from "@/lib/db/connect";
import User from "@/lib/db/models/User";
import { jsonSuccess } from "@/lib/api-utils";

export async function GET() {
  try {
    await connectDB();
    const userCount = await User.countDocuments();
    return jsonSuccess({ needsSetup: userCount === 0 });
  } catch {
    return jsonSuccess({ needsSetup: true });
  }
}
