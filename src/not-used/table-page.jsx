import { prisma } from "@/lib/prisma";
//import SelectCheck, { CheckIsEmpty } from "./components/selectcheck"
import TableCounters,{ CheckIsEmpty } from "./table-counters"

export default async function Page() {

  const checks = await prisma.check.findMany({
    skip: 0, take: 12, orderBy: { createdAt: "desc", },
  })
  if (!checks.length) return (<CheckIsEmpty />)
  
  const users = await prisma.user.findMany({
    skip: 0, take: 12, orderBy: { name: "asc"}
  })
  const meterings = await prisma.meteringInfo.findMany({
    skip: 0, take: 180,
    orderBy: [
      //{ createdAt: "desc" },
      { checkId:"desc" },
      { userId:"asc" },
      { num: "asc" },
    ]
  })
  
  if (!checks.length) return (<CheckIsEmpty />)
  return (<TableCounters
    checks={checks}
    users={users}
    meterings={meterings}
  />)
  
}

