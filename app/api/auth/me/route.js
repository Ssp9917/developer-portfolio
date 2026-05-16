import { connectDB } from "@/lib/db/connect";
import User from "@/lib/db/models/User";
import { getAuthUser } from "@/lib/auth";
import { jsonError, jsonSuccess } from "@/lib/api-utils";

export async function GET() {
  try {
    const session = await getAuthUser();
    if (!session?.userId) {
      return jsonError("Unauthorized", 401);
    }

    await connectDB();
    const user = await User.findById(session.userId).select("-password").lean();

    if (!user) {
      return jsonError("User not found", 404);
    }

    return jsonSuccess({
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    return jsonError("Failed to fetch user", 500);
  }
}
