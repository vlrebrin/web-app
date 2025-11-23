
import { PrismaClient, Prisma } from '@prisma/client'
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";
export async function GET(request) {
  
    const { searchParams } = new URL(request.url)
    const skip = Number(searchParams.get('skip'))// ?? 0
    //const skip = NaN
    const take = Number(searchParams.get('take'))// ?? 1
  
    const checks = await prisma.check.findMany({
      skip: skip, take: take,
      orderBy: { createdAt: "desc" },
    })

  let json_response = {
    status: "success",
    //results: checks.length,
    checks,
  };
  return NextResponse.json(json_response);
 }