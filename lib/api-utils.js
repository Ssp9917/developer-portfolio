import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

export function jsonSuccess(data, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function jsonError(message, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

export async function withAdminAuth(handler, request) {
  const user = await requireAuth(request);
  if (!user) {
    return jsonError("Unauthorized", 401);
  }
  return handler(user);
}
