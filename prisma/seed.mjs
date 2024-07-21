import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.products.createMany({
    data: [
      {
        name: 'Product 1',
        details: 'Details of Product 1',
        price: 19.99,
        img: 'https://i.imgur.com/xdbHo4E.png',
        quantity: 100,
        favorite: true,
        rating: 5,
        published: true,
        authorId: 1,
      },
      {
        name: 'Product 2',
        details: 'Details of Product 2',
        price: 29.99,
        img: 'https://i.imgur.com/xdbHo4E.png',
        quantity: 50,
        favorite: false,
        rating: 4,
        published: false,
        authorId: 1,
      },
      {
        name: 'Product 3',
        details: 'Details of Product 3',
        price: 39.99,
        img: 'https://i.imgur.com/xdbHo4E.png',
        quantity: 30,
        favorite: true,
        rating: 3,
        published: true,
        authorId: 2,
      },
    ],
  });

  console.log('Seed data has been created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
