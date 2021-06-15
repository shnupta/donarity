const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // TODO: Change these to prisma.xxxx.upsert and have create and update arguments so we don't get duplicates
  // TODO: Add more details and entries
  const country = await prisma.country.upsert({
    where: {
      name: "United Kingdom"
    },
    update: {},
    create: {
      name: "United Kingdom"
    }
  })

  const city = await prisma.city.upsert({
    where: {
      id: 1
    },
    update: {},
    create: {
      name: "London",
      countryId: country.id
    }
  })

  const category = await prisma.category.upsert({
    where: {
      id: 1
    },
    update: {},
    create: {
      name: "Overseas Aid and Famine Relief"
    }
  })

  const charity = await prisma.charity.upsert({
    where: {
      id: "test"
    },
    update: {},
    create: {
      id: "test",
      name: "British Red Cross",
      tagline: "We help others",
      logo: "/charities/test/logo.svg",
      image: "/charities/test/image.jpeg",
      website: "https://redcross.org.uk",
      description: "Help us to help others across the world",
      categoryId: category.id,
      size: 240_000_000,
      scope: "International",
      cityId: city.id 
    }
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })