import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const Collections = [
  {
    name: 'My Collection 1',
    description: 'My Collection 1',
  },
  {
    name: 'My Collection 2',
    description: 'My Collection 2',
  },
];

const items = [
  {
    name: 'Macbook Pro',
    description: '',
    make: 'Apple',
    price: 2499,
    metadata: {
      ram: 16,
      storage: 512,
      size: 16,
    },
    type: 'Laptop',
  },
  {
    name: 'iPad Pro',
    description: '',
    make: 'Apple',
    price: 1999,
    metadata: {
      ram: 4,
      storage: 256,
      size: 13,
    },
    type: 'Tablet',
  },
  {
    name: 'Webstorm',
    description: '',
    make: 'JetBrains',
    metadata: {},
    type: 'Ide',
  },
  {
    name: 'iTerm2',
    description: '',
    metadata: {},
    type: 'Terminal',
  },
  {
    name: 'Chrome',
    description: '',
    make: 'Google`',
    metadata: {},
    type: 'Browser',
  },
  {
    name: 'Huntsman TE',
    description: '',
    make: 'Razer',
    price: 599,
    metadata: {},
    type: 'Keyboard',
  },
  {
    name: 'Macbook Air',
    description: '',
    make: 'Apple',
    price: 1999,
    metadata: {
      ram: 16,
      storage: 256,
      size: 13,
    },
    type: 'Laptop',
  },
  {
    name: 'K350',
    description: '',
    make: 'Logitech',
    price: 200,
    metadata: {},
    type: 'Keyboard',
  },
];

async function seed() {
  const userId = 'cl58i3oi10002jqxclv4kyfcw';
  console.info('Seeding collections with userId:', userId);
  const collectionPresent = await prisma.collection.count();
  if (collectionPresent !== 0) {
    console.info('Collections already seeded');
    return;
  }
  await prisma.collection.createMany({
    data: Collections.map((collection) => ({
      ...collection,
      userId,
    })),
  });
  const collections = await prisma.collection.findMany({
    take: 5,
    select: {
      id: true,
      items: true,
    },
  });

  if (collections.reduce((acc, cur) => acc + cur.items.length, 0) !== 0) {
    return;
  }

  const randomCollectionIndex = Math.floor(Math.random() * collections.length);
  await prisma.item.createMany({
    data: items.map((item, index) => ({
      collectionId: collections[randomCollectionIndex].id,
      userId,
      ...item,
      type: item.type as any,
    })),
  });
}

seed();
