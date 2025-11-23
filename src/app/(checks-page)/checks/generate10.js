'use server'
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";
//import { data } from "autoprefixer";


//const checks = async (url) => {
  // try {
  //   const res = await prisma.check.findMany({
  //     skip: 0,
  //     take: 12,
  //     orderBy: { createdAt: "desc" },
  //   })
  //   const json_resp = await res.json()
  //   const checks = json_resp.checks
  //   const data = {
  //     "checks": checks,
  //     "checkClosed": checks[0].closed
  //   }
  //   return data
  // } catch (e)
  // {
  //   throw (e)
  // }  


export async function gen10() {
  let d = Date.now()
  //const c=12
  //const d = Date.now()
  //let c = d.getMonth()
  //console.log(c)
  // let str = ''
  // for (let i = 0; i >= -11; i--) {
  //   str = str + i;
  // }
  
  
  try {
    const check = await prisma.check.create({
      data: {
        summa: 3455.25,
        intake: 123
      }
    })
  }
  catch (error) {}
return c
 }