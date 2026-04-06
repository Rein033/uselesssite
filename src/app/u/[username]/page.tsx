import { notFound } from 'next/navigation'
import { PostCard } from '@/components/feed/PostCard'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import type { Metadata } from 'next'

const DEMO = process.env.USE_DEMO_DATA === 'true'

interface Props { params: { username: string } }

export async function generateStaticParams() {
  if (!DEMO) return []
  const { DEMO_USERS } = await import('@/lib/demo-data')
  return DEMO_USERS.map(u => ({ username: u.username }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: `@${params.username}` }
}

export default async function ProfilePage({ params }: Props) {
  let user: any = null
  let posts: any[] = []

  if (DEMO) {
    const { DEMO_USERS, DEMO_POSTS } = await import('@/lib/demo-data')
    user = DEMO_USERS.find(u => u.username === params.username)
    if (user) posts = DEMO_POSTS.filter(p => p.author.username === params.username)
  } else {
    const { prisma } = await import('@/lib/prisma')
    const { auth } = await import('@/lib/auth')
    const session = await auth()
    user = await prisma.user.findUnique({
      where: { username: params.username },
      include: {
        _count: { select: { posts: true, followers: true, following: true } },
        posts: {
          where: { published: true },
          orderBy: { createdAt: 'desc' },
          take: 12,
          include: { author: { select: { id: true, username: true, name: true, avatar: true } } },
        },
      },
    })
    if (user) {
      posts = user.posts
      const isOwn = session?.user.id === user.id
      const isFollowing = session?.user.id
        ? !!(await prisma.follow.findUnique({ where: { followerId_followingId: { followerId: session.user.id, followingId: user.id } } }))
        : false
      ;(user as any)._isOwn = isOwn
      ;(user as any)._isFollowing = isFollowing
    }
  }

  if (!user) notFound()

  const counts = user._count ?? { posts: posts.length, followers: user._count?.followers ?? 0, following: user._count?.following ?? 0 }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <Avatar src={user.avatar} username={user.username} size={88} />
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold">@{user.username}</h1>
          {user.name && <p className="text-muted-foreground">{user.name}</p>}
          {user.bio && <p className="text-sm mt-2 max-w-md">{user.bio}</p>}
          <div className="flex gap-6 mt-4 text-sm">
            <div><span className="font-bold">{counts.posts}</span> <span className="text-muted-foreground">posts</span></div>
            <div><span className="font-bold">{counts.followers}</span> <span className="text-muted-foreground">followers</span></div>
            <div><span className="font-bold">{counts.following}</span> <span className="text-muted-foreground">following</span></div>
            {user.avgRating > 0 && (
              <div><span className="font-bold text-primary">{user.avgRating.toFixed(1)}</span> <span className="text-muted-foreground">avg rating</span></div>
            )}
          </div>
        </div>
        {!DEMO && (
          <div className="flex gap-2">
            {user._isOwn ? (
              <Button variant="outline" asChild><a href="/settings">Edit Profile</a></Button>
            ) : (
              <form action={`/api/users/${user.id}/follow`} method="POST">
                <Button variant={user._isFollowing ? 'outline' : 'default'} type="submit">
                  {user._isFollowing ? 'Unfollow' : 'Follow'}
                </Button>
              </form>
            )}
          </div>
        )}
      </div>

      <div>
        <h2 className="font-semibold text-lg mb-4">Setups</h2>
        {posts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <div className="text-4xl mb-3">🖥️</div>
            <p>No setups posted yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post: any) => <PostCard key={post.id} post={post} />)}
          </div>
        )}
      </div>
    </div>
  )
}
