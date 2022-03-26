import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "test@example.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("test123456", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.story.deleteMany();

  await prisma.story.create({
    data: {
      approved: true,
      title: "Test Story",
      body: "This is a test story",
      imageUrl:
        "https://images.unsplash.com/photo-1561542320-9a18cd340469?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      userId: user.id,
    },
  });

  await prisma.story.create({
    data: {
      approved: true,
      title: "Test Story 2",
      body: "This is a test story",
      imageUrl:
        "https://images.unsplash.com/photo-1485286162995-aa63d31c06cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      userId: user.id,
    },
  });

  await prisma.story.create({
    data: {
      approved: true,
      title: "Test Story 3",
      body: "This is a test story",
      imageUrl:
        "https://images.unsplash.com/photo-1566233590969-d77010fc90f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      userId: user.id,
    },
  });

  await prisma.donation.deleteMany();

  await prisma.donation.create({
    data: {
      title: "Water",
      amount: 5,
      imageUrl:
        "https://res.cloudinary.com/pineapple-solutions/image/upload/v1648250292/HopeAgainUkraine/water_rhzbqt.jpg",
    },
  });
  await prisma.donation.create({
    data: {
      title: "Female Hygiene Kit",
      amount: 3,
      imageUrl:
        "https://res.cloudinary.com/pineapple-solutions/image/upload/v1648250292/HopeAgainUkraine/fhk_rntumn.jpg",
    },
  });
  await prisma.donation.create({
    data: {
      title: "Week Supply of Food",
      amount: 28,
      imageUrl:
        "https://res.cloudinary.com/pineapple-solutions/image/upload/v1648250293/HopeAgainUkraine/week_uhlrb3.jpg",
    },
  });
  await prisma.donation.create({
    data: {
      title: "Baby Formula",
      amount: 8,
      imageUrl:
        "https://res.cloudinary.com/pineapple-solutions/image/upload/v1648250292/HopeAgainUkraine/formula_cgyida.jpg",
    },
  });
  await prisma.donation.create({
    data: {
      title: "Diapers For A Week",
      amount: 12,
      imageUrl:
        "https://res.cloudinary.com/pineapple-solutions/image/upload/v1648250292/HopeAgainUkraine/diapers_iiri7c.jpg",
    },
  });
  await prisma.donation.create({
    data: {
      title: "Clothing Kit",
      amount: 7,
      imageUrl:
        "https://res.cloudinary.com/pineapple-solutions/image/upload/v1648250293/HopeAgainUkraine/clothes_ksu8p9.jpg",
    },
  });
  await prisma.donation.create({
    data: {
      title: "Pair of Shoes",
      amount: 5,
      imageUrl:
        "https://res.cloudinary.com/pineapple-solutions/image/upload/v1648250292/HopeAgainUkraine/shoes_jcmxnj.jpg",
    },
  });
  await prisma.donation.create({
    data: {
      title: "Blanket",
      amount: 6,
      imageUrl:
        "https://res.cloudinary.com/pineapple-solutions/image/upload/v1648250292/HopeAgainUkraine/blanket_jfsywc.jpg",
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
