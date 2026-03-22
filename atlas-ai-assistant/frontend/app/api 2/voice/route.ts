import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    let text = "";

    const contentType = req.headers.get("content-type") || "";

    // ✅ HANDLE JSON + FORM
    if (contentType.includes("application/json")) {
      const body = await req.json();
      text = body.text || "";
    } else {
      const formData = await req.formData();
      text = (formData.get("text") as string) || "";
    }

    text = text.toLowerCase();

    console.log("🟢 USER:", text);

    // =========================
    // 💰 TRANSACTION (KEEP THIS)
    // =========================
    if (
      text.includes("fee") ||
      text.includes("payment") ||
      text.includes("paid")
    ) {
      return NextResponse.json({
        content: "Alright, your payment has been successfully recorded.",
      });
    }

    // =========================
    // ❌ INFORMAL LEAVE
    // =========================
    if (
      text.includes("wedding") ||
      text.includes("trip") ||
      text.includes("function")
    ) {
      return NextResponse.json({
        content:
          "This is an informal leave. Please accommodate it within your 25% attendance.",
      });
    }

    // =========================
    // 🏥 MEDICAL LEAVE
    // =========================
    if (
  text.includes("leave") ||
  text.includes("sick") ||
  text.includes("fever") ||
  text.includes("attendance") ||   // ✅ ADD THIS
  text.includes("exemption")       // ✅ ADD THIS
){
      return NextResponse.json({
        content:
          "Please upload your medical proof for attendance approval.",
      });
    }

    // =========================
    // 🤖 GEMINI (FIXED)
    // =========================
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      console.log("❌ API KEY MISSING");

      return NextResponse.json({
        content: "AI not configured.",
      });
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-lite",
});

const result = await model.generateContent(text);

const aiText = result.response.text();

return NextResponse.json({
  content: aiText,
});

    } catch (err) {
      console.error("🔥 GEMINI ERROR:", err);

      return NextResponse.json({
        content: "AI server error",
      });
    }

  } catch (error) {
    console.error("❌ SERVER ERROR:", error);

    return NextResponse.json(
      { content: "Server error occurred." },
      { status: 500 }
    );
  }
}