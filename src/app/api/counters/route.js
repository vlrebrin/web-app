import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

export async function GET(request) {

  const { searchParams } = new URL(request.url)
   const userId = Number(searchParams.get('userId'))// ?? 0
  // const take = Number(searchParams.get('take'))// ?? 1

  const counters = await prisma.counter.findMany({
    where: { userId: userId },
    // skip: skip, take: take,
    // orderBy: { id: "desc" },
  })

  let json_response = {
    status: "success",
    results: users.length,
    counters,
  };

  //const data=await checks.data
  //const data = await res.json()
  return NextResponse.json(json_response);
}