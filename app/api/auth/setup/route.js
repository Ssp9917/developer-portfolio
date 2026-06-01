import { connectDB } from "@/lib/db/connect";
import User from "@/lib/db/models/User";
import { hashPassword, createToken, setAuthCookie } from "@/lib/auth";
import { jsonError, jsonSuccess } from "@/lib/api-utils";
import { seedPortfolioIfEmpty } from "@/lib/portfolio";

export async function POST(request) {
  try {
    await connectDB();
    const userCount = await User.countDocuments();

    if (userCount > 0) {
      return jsonError("Admin already exists. Use login instead.", 403);
    }

    const body = await request.json();
    const email = (body.email || process.env.ADMIN_EMAIL || "").toLowerCase().trim();
    const password = body.password || process.env.ADMIN_PASSWORD;
    const name = body.name || "Admin";

    if (!email || !password) {
      return jsonError("Email and password are required for first-time setup");
    }

    if (password.length < 6) {
      return jsonError("Password must be at least 6 characters");
    }

    const hashed = await hashPassword(password);
    const user = await User.create({ email, password: hashed, name });

    await seedPortfolioIfEmpty();

    const token = await createToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    });

    await setAuthCookie(token);

    return jsonSuccess(
      {
        user: {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        },
        message: "Admin account created successfully",
      },
      201
    );
  } catch (error) {
    console.error("Setup error:", error);
    return jsonError(error.message || "Setup failed", 500);
  }
}
