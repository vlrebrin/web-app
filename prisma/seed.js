import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const members = [
  {
    //id: 1,
    name: "Докалин",
    phone:"+79130326565",
    role:"ADMIN",
    counters: [
      { num: "34-26" },
      { num: "30" },
      { num: "40" },
      {
        num: "pumpe",
        isCommon: true
       }
    ]
  },

  {
    //id: 2,
    name: "Морозов",
    phone: "+79138323102",
    role: "USER",
    counters: [{ num: "39" }]
  },

  {
    //id: 3,
    name: "Куимов",
    phone: "+79234069722",
    role: "USER",
    counters: [{ num: "38" }]
  },

  {
    //id: 4,
    name: "Ребрин",
    phone: "+79135629614",
    role: "ADMIN",
    counters: [{ num: "37" }]
  },

  {
    //id: 5,
    name: "Шахматов",
    phone: "+79138368411",
    role: "USER",
    counters: [{ num: "36" }]
  },

  {
    //id: 6,
    name: "Жамлин",
    phone: "+79135095300",
    role: "USER",
    counters: [{ num: "35" }]
    
  },

  {
    //id: 7,
    name: "Канышев",
    phone: "+79232778281",
    role: "USER",
    counters: [{ num: "33-25" }]
  },

  {
    //id: 8,
    name: "Соломенцев",
    phone: "+79233393822",
    role: "USER",
    counters: [{ num: "32" }]
  },

  {
    //id: 9,
    name: "Гончаренко",
    phone: "+79135980992",
    role: "USER",
    counters: [{ num: "31" }]
  },

  {
    //id: 10,
    name: "Евсеев",
    phone: "+79233086894",
    role: "USER",
    counters: [{ num: "29" }]
  },

  {
    //id: 11,
    name: "Шпан",
    phone: "+79135663344",
    role: "USER",
    counters: [{ num: "28" }]
  },

  {
    //id: 12,
    name: "Лисенков",
    phone: "+79135977104",
    role: "USER",
    counters: [{ num: "27" }]
  },
]

async function main() {
  members.forEach(async (user) => {
    await prisma.user.create({
      data: {
        //id:     user.id,
        name:   user.name,
        role:   user.role,
        phone:  user.phone,
        
        counters: {
          createMany: {
            data: user.counters
          }
        }
      }
    })
   })
  }


main()
  .then(async () => {
    await prisma.$disconnect()
    console.log('Ok')
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

