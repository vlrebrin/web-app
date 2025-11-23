import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

export async function GET(request) {

  const { searchParams } = new URL(request.url)
  const userId = Number(searchParams.get('userId'))// ?? 0
  const checkId = Number(searchParams.get('checkId'))// ?? 1

  let _where
  if (userId != 0 && checkId != 0) {
    _where = {
      AND: [
        { checkId: checkId },
        { Counter: { userId: userId }, }
      ]}
  } else if(userId !=0 || checkId !=0){
    _where = {
      OR: [
        { checkId: checkId },
        { Counter: { userId: userId }, }
      ]
    }
  }else{_where={}}

  const meterings = await prisma.metering.findMany({
    select: {
      checkId: true,
      counterId: true,
      //userId:true,
      id: true,
      value: true,
      payment: true,
      isNoValue: true,
      createdAt:true,
      
      Counter: {
        select: {
          id: true,
          isCommon:true,
          num: true,
          userId: true,
          User: {
            select: { name: true  }
          }
        }
      },

      Check: {
        select: {
          id: true, 
          date: true,
        }
      }
    },
    
    where: _where,
    orderBy: { createdAt: "desc" },
    })

  let json_response = {
    status: "success",
    results: meterings.length,
    meterings,
  };

  //console.log('- ',userId,checkId)
  //const data=await checks.data
  //const data = await res.json()
  return NextResponse.json(json_response);
}