import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({messge: "hellow world"});
}