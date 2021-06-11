const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const country = await prisma.country.create({
    data: {
      name: "United Kingdom"
    }
  })

  const city = await prisma.city.create({
    data: {
      name: "London",
      countryId: country.id
    }
  })

  const category = await prisma.category.create({
    data: {
      name: "Overseas Aid and Famine Relief"
    }
  })

  const charity = await prisma.charity.create({
    data: {
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