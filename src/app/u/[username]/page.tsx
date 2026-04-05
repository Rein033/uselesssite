import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { PostCard } from '@/components/feed/PostCard'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import type { Metadata } from 'next'

interface Props { params: { username: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await prisma.user.findUnique({ where: { username: params.username } })
  return user ? { title: `@${user.username}` } : {}
}

export default async function ProfilePage({ params }: Props) {
  const session = await auth()
  const user = await prisma.user.findUnique({
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

  if (!user) notFound()

  const isOwn = session?.user.id === user.id
  const isFollowing = session?.user.id
    ? !!(await prisma.follow.findUnique({
        where: { followerId_followingId: { followerId: session.user.id, followingId: user.id } },
      }))
    : false

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Profile header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <Avatar src={user.avatar} username={user.username} size={88} />
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold">@{user.username}</h1>
          {user.name && <p className="text-muted-foreground">{user.name}</p>}
          {user.bio && <p className="text-sm mt-2 max-w-md">{user.bio}</p>}

          <div className="flex gap-6 mt-4 text-sm">
            <div><span className="font-bold">{user._count.posts}</span> <span className="text-muted-foreground">posts</span></div>
            <div><span className="font-bold">{user._count.followers}</span> <span className="text-muted-foreground">followers</span></div>
            <div><span className="font-bold">{user._count.following}</span> <span className="text-muted-foreground">following</span></div>
            {user.avgRating > 0 && (
              <div><span className="font-bold text-primary">{user.avgRating.toFixed(1)}</span> <span className="text-muted-foreground">avg rating</span></div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          {isOwn ? (
            <Button variant="outline" asChild>
              <a href="/settings">Edit Profile</a>
            </Button>
          ) : session && (
            <form action={`/api/users/${user.id}/follow`} method="POST">
              <Button variant={isFollowing ? 'outline' : 'default'} type="submit">
                {isFollowing ? 'Unfollow' : 'Follow'}
              </Button>
            </form>
          )}
        </div>
      </div>

      {/* Posts grid */}
      <div>
        <h2 className="font-semibold text-lg mb-4">Setups</h2>
        {user.posts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <div className="text-4xl mb-3">🖥️</div>
            <p>{isOwn ? "You haven't posted any setups yet." : 'No setups posted yet.'}</p>
            {isOwn && <Button className="mt-4" asChild><a href="/submit">Post Your Setup</a></Button>}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {user.posts.map(post => <PostCard key={post.id} post={post as any} />)}
          </div>
        )}
      </div>
    </div>
  )
}
