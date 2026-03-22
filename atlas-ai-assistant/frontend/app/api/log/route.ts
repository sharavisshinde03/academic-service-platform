import { NextResponse } from "next/server";

let logs: any[] = [];

export async function POST(req: Request) {
  const body = await req.json();

  logs.push({
    ...body,
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json(logs);
}