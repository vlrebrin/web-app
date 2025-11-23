'use server'

import { prisma } from "@/lib/prisma";

export async function createCheck(prevStateany, data) {
  //console.log("server action", data);
  try {

    const intake = Number(data.get('intake'))
    const summa = Number(data.get('summa'))

    const lastCheck = await prisma.check.findFirst({ orderBy: { date: 'desc' } })
    let checkDate = new Date(Date.now())
    if (lastCheck) checkDate = lastCheck.date
    checkDate.setMonth(checkDate.getMonth() + 1)

    const check = await prisma.check.create({
      data: {
        intake: intake,
        summa: summa,
        date: checkDate
      }
    })

    const counters = await prisma.counter.findMany()
    const array = counters.map((counter) => {
      return {
        checkId: check.id,
        counterId: counter.id,
      }
    })

    const meterings = await prisma.metering.createMany({ data: array })

    return {
      status: "success",
      message: "Новый счет успешно создан"
    }
  }
  catch (error) {
    return {
      status: "fault",
      message: error.message
    }
  }
}