import { connectDB } from "@/lib/db/connect";
import User from "@/lib/db/models/User";
import {
  verifyPassword,
  createToken,
  setAuthCookie,
} from "@/lib/auth";
import { jsonError, jsonSuccess } from "@/lib/api-utils";
import { seedPortfolioIfEmpty } from "@/lib/portfolio";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return jsonError("Email and password are required");
    }

    await connectDB();
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return jsonError("Invalid email or password", 401);
    }

    const valid = await verifyPassword(password, user.password);
    if (!valid) {
      return jsonError("Invalid email or password", 401);
    }

    await seedPortfolioIfEmpty();

    const token = await createToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    });

    await setAuthCookie(token);

    return jsonSuccess({
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return jsonError("Login failed", 500);
  }
}
