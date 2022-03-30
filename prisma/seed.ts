import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "jnoahjohnson@gmail.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("X33JgQQg4Lh_mEr@K9uR", 10);

  const user = await prisma.user.create({
    data: {
      email,
      id: "cjkqxqzq0kqx9079079qxqx",
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
      firstName: "John",
      lastName: "Doe",
      hometown: "Kiev",
      profession: "Example Here",
      questionOne:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus. Elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Laoreet id donec ultrices tincidunt. Egestas pretium aenean pharetra magna ac placerat. Faucibus in ornare quam viverra orci sagittis. Non arcu risus quis varius quam quisque id diam vel. Malesuada pellentesque elit eget gravida cum sociis natoque. Turpis egestas sed tempus urna et pharetra pharetra. Quis commodo odio aenean sed adipiscing. Faucibus purus in massa tempor.",
      questionTwo:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus. Elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Laoreet id donec ultrices tincidunt. Egestas pretium aenean pharetra magna ac placerat. Faucibus in ornare quam viverra orci sagittis. Non arcu risus quis varius quam quisque id diam vel. Malesuada pellentesque elit eget gravida cum sociis natoque. Turpis egestas sed tempus urna et pharetra pharetra. Quis commodo odio aenean sed adipiscing. Faucibus purus in massa tempor.",
      imageUrl:
        "https://images.unsplash.com/photo-1561542320-9a18cd340469?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    },
  });

  await prisma.story.create({
    data: {
      approved: true,
      firstName: "Jane",
      lastName: "Doe",
      hometown: "Kiev",
      profession: "Example Here",
      questionOne:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus. Elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Laoreet id donec ultrices tincidunt. Egestas pretium aenean pharetra magna ac placerat. Faucibus in ornare quam viverra orci sagittis. Non arcu risus quis varius quam quisque id diam vel. Malesuada pellentesque elit eget gravida cum sociis natoque. Turpis egestas sed tempus urna et pharetra pharetra. Quis commodo odio aenean sed adipiscing. Faucibus purus in massa tempor.",
      questionTwo:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus. Elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Laoreet id donec ultrices tincidunt. Egestas pretium aenean pharetra magna ac placerat. Faucibus in ornare quam viverra orci sagittis. Non arcu risus quis varius quam quisque id diam vel. Malesuada pellentesque elit eget gravida cum sociis natoque. Turpis egestas sed tempus urna et pharetra pharetra. Quis commodo odio aenean sed adipiscing. Faucibus purus in massa tempor.",
      imageUrl:
        "https://images.unsplash.com/photo-1485286162995-aa63d31c06cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    },
  });

  await prisma.story.create({
    data: {
      approved: true,
      firstName: "Jeremy",
      lastName: "Dean",
      hometown: "Kiev",
      profession: "Example Here",
      questionOne:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus. Elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Laoreet id donec ultrices tincidunt. Egestas pretium aenean pharetra magna ac placerat. Faucibus in ornare quam viverra orci sagittis. Non arcu risus quis varius quam quisque id diam vel. Malesuada pellentesque elit eget gravida cum sociis natoque. Turpis egestas sed tempus urna et pharetra pharetra. Quis commodo odio aenean sed adipiscing. Faucibus purus in massa tempor.",
      questionTwo:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus. Elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Laoreet id donec ultrices tincidunt. Egestas pretium aenean pharetra magna ac placerat. Faucibus in ornare quam viverra orci sagittis. Non arcu risus quis varius quam quisque id diam vel. Malesuada pellentesque elit eget gravida cum sociis natoque. Turpis egestas sed tempus urna et pharetra pharetra. Quis commodo odio aenean sed adipiscing. Faucibus purus in massa tempor.",
      imageUrl:
        "https://images.unsplash.com/photo-1566233590969-d77010fc90f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    },
  });

  await prisma.donation.deleteMany();

  await prisma.donation.create({
    data: {
      title: "Water",
      amount: 5,
      imageUrl:
        "https://res.cloudinary.com/pineapple-solutions/image/upload/v1648325861/HopeAgainUkraine/water-3xl_ddinxh.png",
      stripeId: "price_1KhflJIPVMv6OICVAhcZM9jw",
    },
  });
  await prisma.donation.create({
    data: {
      title: "Female Hygiene Kit",
      amount: 5,
      imageUrl:
        "https://res.cloudinary.com/pineapple-solutions/image/upload/v1648323307/HopeAgainUkraine/fhk_sv70nb.jpg",
      stripeId: "price_1KhfmwIPVMv6OICVRLLoohAS",
    },
  });
  await prisma.donation.create({
    data: {
      title: "Week Supply of Food",
      amount: 28,
      imageUrl:
        "https://res.cloudinary.com/pineapple-solutions/image/upload/v1648250293/HopeAgainUkraine/week_uhlrb3.jpg",
      stripeId: "price_1KhfniIPVMv6OICVGvuWhPP7",
    },
  });
  await prisma.donation.create({
    data: {
      title: "Baby Formula",
      amount: 8,
      imageUrl:
        "https://res.cloudinary.com/pineapple-solutions/image/upload/v1648323629/HopeAgainUkraine/Infant_formula-removebg-preview_f9ujgh.png",
      stripeId: "price_1KhfoOIPVMv6OICVD7RgcnsE",
    },
  });
  await prisma.donation.create({
    data: {
      title: "Diapers For A Week",
      amount: 12,
      imageUrl:
        "https://res.cloudinary.com/pineapple-solutions/image/upload/v1648250292/HopeAgainUkraine/diapers_iiri7c.jpg",
      stripeId: "price_1KhfpZIPVMv6OICVewrinsbS",
    },
  });
  await prisma.donation.create({
    data: {
      title: "Clothing Kit",
      amount: 7,
      imageUrl:
        "https://res.cloudinary.com/pineapple-solutions/image/upload/v1648250293/HopeAgainUkraine/clothes_ksu8p9.jpg",
      stripeId: "price_1Khfq4IPVMv6OICVqCYzSk9S",
    },
  });
  await prisma.donation.create({
    data: {
      title: "Pair of Shoes",
      amount: 10,
      imageUrl:
        "https://res.cloudinary.com/pineapple-solutions/image/upload/v1648250292/HopeAgainUkraine/shoes_jcmxnj.jpg",
      stripeId: "price_1KhfrAIPVMv6OICVKREBL2wC",
    },
  });
  await prisma.donation.create({
    data: {
      title: "Blanket",
      amount: 6,
      imageUrl:
        "https://res.cloudinary.com/pineapple-solutions/image/upload/v1648250292/HopeAgainUkraine/blanket_jfsywc.jpg",
      stripeId: "price_1KhfsGIPVMv6OICVEvx4SLbL",
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
