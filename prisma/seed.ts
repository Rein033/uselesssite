import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Admin user
  const adminHash = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@rigpins.com' },
    update: {},
    create: {
      email: 'admin@rigpins.com',
      username: 'admin',
      name: 'RigPins Admin',
      passwordHash: adminHash,
      role: 'ADMIN',
      bio: 'Platform administrator',
    },
  })

  // Demo users
  const demoHash = await bcrypt.hash('demo1234', 12)
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'alex@demo.com' },
      update: {},
      create: {
        email: 'alex@demo.com',
        username: 'alextech',
        name: 'Alex T.',
        passwordHash: demoHash,
        bio: 'Full-stack dev | RGB addict | Coffee fueled',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      },
    }),
    prisma.user.upsert({
      where: { email: 'sara@demo.com' },
      update: {},
      create: {
        email: 'sara@demo.com',
        username: 'sara_setups',
        name: 'Sara M.',
        passwordHash: demoHash,
        bio: 'Minimalist workspace enthusiast. Less is more.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      },
    }),
    prisma.user.upsert({
      where: { email: 'jake@demo.com' },
      update: {},
      create: {
        email: 'jake@demo.com',
        username: 'jakegaming',
        name: 'Jake R.',
        passwordHash: demoHash,
        bio: 'Pro gamer setup. RTX all the way.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      },
    }),
  ])

  // Demo posts
  const posts = [
    {
      title: 'Ultimate Home Office Battle Station 2024',
      description: `Built this over 3 years — started with a single monitor and a cheap chair, now it's my dream setup. The key was getting the lighting right first, then everything else fell into place.\n\nThe ultrawide monitor completely changed how I work. No more alt-tabbing between windows. The mechanical keyboard was the last piece — I agonized over switches for months before settling on Gateron Yellows.`,
      images: [
        'https://images.unsplash.com/photo-1593640408182-31c228af80a3?w=1200',
        'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=1200',
      ],
      tags: ['office', 'minimal', 'ultrawide', 'dev'],
      cpu: 'AMD Ryzen 9 7950X',
      gpu: 'NVIDIA RTX 4090',
      ram: '64GB DDR5 6000MHz',
      storage: '2TB Samsung 990 Pro NVMe + 4TB HDD',
      peripherals: 'LG 49" Ultrawide, Keychron Q1 Pro, Logitech MX Master 3S, Sony WH-1000XM5',
      deskChair: 'Uplift V2 Standing Desk + Herman Miller Aeron',
      buildCost: 8500,
      authorId: users[0].id,
      avgRating: 9.1,
      ratingCount: 47,
    },
    {
      title: 'Minimal White Aesthetic — Less is More',
      description: `I spent 6 months achieving this setup. Every cable is hidden. Every item has a purpose. Nothing is here just for looks.\n\nThe white theme started as an accident — I needed a desk and found this white one on sale. Now I can't imagine it any other way. The plant adds just enough life to the space without cluttering it.`,
      images: [
        'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=1200',
        'https://images.unsplash.com/photo-1527443224154-c4a573d05e1a?w=1200',
      ],
      tags: ['minimal', 'white', 'clean', 'office'],
      cpu: 'Apple M3 Max',
      gpu: 'Integrated (Apple Silicon)',
      ram: '48GB Unified Memory',
      storage: '2TB SSD',
      peripherals: 'Apple Studio Display, Apple Magic Keyboard, Apple Magic Trackpad',
      deskChair: 'IKEA Alex Desk (white) + Autonomous ErgoChair Pro',
      buildCost: 6200,
      authorId: users[1].id,
      featured: true,
      avgRating: 8.7,
      ratingCount: 63,
    },
    {
      title: 'Full RGB Gaming Cave — No Apologies',
      description: `Yes, it has RGB everywhere. No, I'm not sorry.\n\nEvery component was chosen for both performance and aesthetics. The custom loop took me 3 weekends to build and fill. First stress test had a leak at 3am — fixed it, went to sleep, woke up to all green temps.`,
      images: [
        'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=1200',
        'https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=1200',
      ],
      tags: ['gaming', 'RGB', 'custom-loop', 'high-end'],
      cpu: 'Intel Core i9-14900K',
      gpu: 'NVIDIA RTX 4090 FE',
      ram: '64GB DDR5 7200MHz (4x16GB)',
      storage: '4TB WD Black SN850X + 2TB Seagate Barracuda',
      peripherals: 'ASUS ROG Swift 360Hz, Wooting 60HE, Razer Viper V3 Pro, SteelSeries Arctis Nova Pro',
      deskChair: 'Secretlab Titan Evo + Custom RGB desk',
      buildCost: 12000,
      authorId: users[2].id,
      avgRating: 8.3,
      ratingCount: 89,
    },
  ]

  for (const postData of posts) {
    const existing = await prisma.post.findFirst({
      where: { title: postData.title },
    })
    if (!existing) {
      await prisma.post.create({ data: postData })
    }
  }

  console.log('✅ Seed complete!')
  console.log('👤 Admin: admin@rigpins.com / admin123')
  console.log('👤 Demo:  alex@demo.com / demo1234')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
