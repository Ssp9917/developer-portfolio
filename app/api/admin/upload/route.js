import { v2 as cloudinary } from "cloudinary";
import { jsonSuccess, jsonError } from "@/lib/api-utils";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return jsonError(
        "Cloudinary credentials not configured. Please define CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your .env file.",
        500
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return jsonError("No file provided", 400);
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "portfolio" },
        (error, uploadResult) => {
          if (error) reject(error);
          else resolve(uploadResult);
        }
      ).end(buffer);
    });

    return jsonSuccess({ url: result.secure_url });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return jsonError(error.message || "Failed to upload image", 500);
  }
}
