import { NextResponse } from "next/server";

export async function GET() {
   const headers =  new Headers()
   headers.append("X-Dune-API-Key", process.env.DUNE_API_KEY ?? "")
  const result = await fetch("https://api.dune.com/api/v1/query/5694238/results?limit=1000", {
      headers
  })

  const res = await result.json()

  return NextResponse.json(res);
}