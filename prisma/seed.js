const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // TODO: Change these to prisma.xxxx.upsert and have create and update arguments so we don't get duplicates
  // TODO: Add more details and entries
  const uk = await prisma.country.create({
    data: {
      name: "United Kingdom"
    }
  });

  const cities = await prisma.city.createMany({
    data: [
      {
        id: 1,
        name: "London",
        countryId: uk.id
      },
      {
        id: 2,
        name: "Manchester",
        countryId: uk.id
      },
    ],
    skipDuplicates: true,
  });

  const categories = await prisma.category.createMany({
    data: [
      {
        id: 1,
        name: "Overseas Aid and Famine Relief"
      },
      {
         id: 2,
         name: "Animals"
      },
      {
        id: 3,
        name: "Disability"
      },
      {
         id: 4,
         name: "Children and Young People"
      },
      {
         id: 5,
         name: "The Prevention Or Relief of Poverty"
      }
   ],
   skipDuplicates: true,
  });


  const charity = await prisma.charity.createMany({
    data: [
      {
        id: 'test',
        name: 'British Red Cross',
        tagline: 'For the last 150 years, we have put kindness into action',
        logo: '/charities/test/logo.svg',
        image: '/charities/test/image.jpeg',
        website: 'https://redcross.org.uk',
        facebook: 'https://www.facebook.com/BritishRedCross/',
        twitter: 'https://twitter.com/BritishRedCross',
        instagram: 'https://www.instagram.com/britishredcross/?hl=en',
        linkedin: 'https://www.linkedin.com/company/british-red-cross/',
        description: 'The British Red Cross is a volunteer-led movement that connects those who have kindness to share, with the people who need it most. We help people in crisis get the support they need anywhere in the UK and around the world. The people we help can trust that we’re completely neutral, independent and impartial. Our supporters know that we help those most in need, and our staff and volunteers can see they’re a part of a unique movement which anyone is welcome to join.',
        categoryId: 1,
        size: 247100000,
        scope: 'International',
        cityId: 1
      },
      {
        id: 'bury-cancer-support-centre',
        name: 'Bury Cancer Support Centre',
        tagline: 'Support when and where you need it in your time of needing support.',
        logo: '/charities/bury-cancer-support-centre/logo.jpg',
        image: '/charities/bury-cancer-support-centre/image.jpeg',
        website: 'http://www.cancersupportbury.org.uk/',
        facebook: 'https://www.facebook.com/burycsc/',
        twitter: 'https://twitter.com/burycancer?lang=en',
        instagram: null,
        linkedin: 'https://www.linkedin.com/company/bury-cancer-support-centre/about/',
        description: 'We offer support, information and complementary therapies all in an informal atmosphere. We also offer friendship, not just from the staff but from everyone who attends the Centre.  Anyone touched by cancer, whether patient, carer, relative or friend, can attend. We are open to anyone in the north west – indeed anyone who can get to the Centre, and because we are a drop-in centre you do not need a referral or an appointment.',
        categoryId: 3,
        size: 212662,
        scope: 'Regional',
        cityId: 2
      },
      {
        id: 'dogs-trust',
        name: 'Dogs Trust',
        tagline: 'Our mission is to bring about the day when all dogs can enjoy a happy life, free from the threat of unnecessary destruction.',
        logo: '/charities/dogs-trust/logo.svg',
        image: '/charities/dogs-trust/image.jpg',
        website: 'https://www.dogstrust.org.uk',
        facebook: 'https://www.facebook.com/DogsTrust/',
        twitter: 'https://twitter.com/DogsTrust',
        instagram: 'https://www.instagram.com/dogstrust/?hl=en',
        linkedin: 'https://www.linkedin.com/company/dogs-trust/',
        description: "We're the UK's largest Dog Welfare Charity. We want to #ChangeTheTale for dogs and their owners when they need us most, find out how you can help.",
        categoryId: 2,
        size: 116600000,
        scope: 'National',
        cityId: 1
      },
      {
        id: 'refuge',
        name: 'Refuge',
        tagline: 'For women and children. Against domestic violence',
        logo: '/charities/refuge/logo.jpg',
        image: '/charities/refuge/image.jpg',
        website: 'https://www.refuge.org.uk/',
        facebook: 'https://www.facebook.com/RefugeCharity/',
        twitter: 'https://twitter.com/RefugeCharity',
        instagram: 'https://www.instagram.com/refugecharity',
        linkedin: 'https://www.linkedin.com/company/refuge',
        description: 'Refuge is the largest single provider of specialist services to survivors of domestic violence, and other forms of violence against women and children, in Britain. Every day, we provide support to 6,000 women and children. We listen to women, and put their experiences at the heart of the services we run and our campaigns for legal and social change.',
        categoryId: 5,
        size: 18102554,
        scope: 'National',
        cityId: 1
      },
      {
        id: 'save-the-children',
        name: 'Save the Children',
        tagline: 'Together, we fight for children every single day.',
        logo: '/charities/save-the-children/logo.svg',
        image: '/charities/save-the-children/image.jpeg',
        website: 'https://www.savethechildren.org.uk/',
        facebook: 'https://www.facebook.com/savethechildrenuk',
        twitter: 'https://twitter.com/savechildrenuk',
        instagram: 'https://www.instagram.com/savechildrenuk/?hl=en',
        linkedin: 'https://www.linkedin.com/company/save-the-children/',
        description: 'In more than 100 countries including the UK, we help children stay safe, healthy and keep learning. We lead the way on tackling big problems like pneumonia, hunger and protecting children in war, while making sure each child’s unique needs are cared for. We find new ways to reach children who need us most, no matter where they’re growing up.',
        categoryId: 4,
        size: 903173899,
        scope: 'International',
        cityId: 1
      },
    ],
    skipDuplicates: true,
  });

  const featuredLinks = await prisma.featuredLink.createMany({
    data: [
      {
         id: 1,
         charityId: "test",
         text: "What we do",
         url: "https://www.redcross.org.uk/about-us/what-we-do"
      },
      {
         id: 2,
         charityId: "test",
         text: "What we stand for",
         url: "https://www.redcross.org.uk/about-us/what-we-stand-for"
      },
      {
         id: 3,
         charityId: "test",
         text: "Our history",
         url: "https://www.redcross.org.uk/about-us/our-history"
      },
      {
         id: 4,
         charityId: "dogs-trust",
         text: "Who we are",
         url: "https://www.dogstrust.org.uk/about-us/who-we-are/"
      },
      {
         id: 5,
         charityId: "dogs-trust",
         text: "Our history",
         url: "https://www.dogstrust.org.uk/about-us/who-we-are/our-history/"
      },
      {
         id: 6,
         charityId: "refuge",
         text: "Our work",
         url: "https://www.refuge.org.uk/our-work/"
      },
      {
         id: 7,
         charityId: "refuge",
         text: "Get involved",
         url: "https://www.refuge.org.uk/get-involved/"
      },
      {
         id: 8,
         charityId: "save-the-children",
         text: "What we do",
         url: "https://www.savethechildren.org.uk/what-we-do"
      },
      {
         id: 9,
         charityId: "bury-cancer-support-centre",
         text: "Private Pregnancy Scan",
         url: "http://www.cancersupportbury.org.uk/private-pregnancy-scan/"
      }
   ],
   skipDuplicates: true,
  });
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })