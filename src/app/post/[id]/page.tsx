import { notFound } from 'next/navigation'
import { ImageGallery } from '@/components/post/ImageGallery'
import { RatingWidget } from '@/components/post/RatingWidget'
import { CommentThread } from '@/components/post/CommentThread'
import { ShareButton } from '@/components/post/ShareButton'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { gradeFromScore, timeAgo } from '@/lib/utils'
import type { Metadata } from 'next'
import Link from 'next/link'

const DEMO = process.env.USE_DEMO_DATA === 'true'

interface Props { params: { id: string } }

export async function generateStaticParams() {
  if (!DEMO) return []
  const { DEMO_POSTS } = await import('@/lib/demo-data')
  return DEMO_POSTS.map(p => ({ id: p.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (DEMO) {
    const { DEMO_POSTS } = await import('@/lib/demo-data')
    const post = DEMO_POSTS.find(p => p.id === params.id)
    if (!post) return {}
    return { title: post.title, description: post.description.slice(0, 160), openGraph: { images: post.images[0] ? [{ url: post.images[0] }] : [] } }
  }
  const { prisma } = await import('@/lib/prisma')
  const post = await prisma.post.findUnique({ where: { id: params.id }, select: { title: true, description: true, images: true } })
  if (!post) return {}
  return { title: post.title, description: post.description.slice(0, 160), openGraph: { images: post.images[0] ? [{ url: post.images[0] }] : [] } }
}

const SPEC_LABELS: Record<string, string> = {
  cpu: 'CPU', gpu: 'GPU', ram: 'RAM', storage: 'Storage',
  peripherals: 'Peripherals', deskChair: 'Desk / Chair',
}

export default async function PostPage({ params }: Props) {
  let post: any = null
  let comments: any[] = []

  if (DEMO) {
    const { DEMO_POSTS, DEMO_COMMENTS } = await import('@/lib/demo-data')
    post = DEMO_POSTS.find(p => p.id === params.id)
    comments = DEMO_COMMENTS.filter(c => c.postId === params.id)
  } else {
    const { prisma } = await import('@/lib/prisma')
    const { auth } = await import('@/lib/auth')
    const session = await auth()
    post = await prisma.post.findUnique({
      where: { id: params.id, published: true },
      include: {
        author: { select: { id: true, username: true, name: true, avatar: true, bio: true } },
        ratings: session?.user.id ? { where: { userId: session.user.id }, select: { score: true } } : false,
      },
    })
    if (post) {
      comments = await prisma.comment.findMany({
        where: { postId: post.id, parentId: null, deleted: false },
        include: {
          author: { select: { id: true, username: true, name: true, avatar: true } },
          replies: {
            where: { deleted: false },
            include: {
              author: { select: { id: true, username: true, name: true, avatar: true } },
              replies: { where: { deleted: false }, include: { author: { select: { id: true, username: true, name: true, avatar: true } } } },
            },
            orderBy: { createdAt: 'asc' },
          },
        },
        orderBy: { createdAt: 'desc' },
      })
    }
  }

  if (!post) notFound()

  const userRating = post.ratings?.[0]?.score ?? null
  const { grade, color } = gradeFromScore(post.avgRating)
  const specs = ['cpu', 'gpu', 'ram', 'storage', 'peripherals', 'deskChair'].filter(k => post[k])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {post.pinned && <Badge>📌 Pinned</Badge>}
              {post.featured && <Badge>⭐ Featured</Badge>}
              {post.tags.map((tag: string) => (
                <Link key={tag} href={`/?tag=${tag}`}><Badge variant="secondary">#{tag}</Badge></Link>
              ))}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">{post.title}</h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Link href={`/u/${post.author.username}`} className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Avatar src={post.author.avatar} username={post.author.username} size={28} />
                <span className="font-medium text-foreground">@{post.author.username}</span>
              </Link>
              <span>·</span>
              <span>{timeAgo(post.createdAt)}</span>
              {post.buildCost && <><span>·</span><span>💰 ~${post.buildCost.toLocaleString()}</span></>}
            </div>
          </div>

          <ImageGallery images={post.images} />

          <div className="prose prose-sm prose-invert max-w-none">
            <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">{post.description}</p>
          </div>

          {specs.length > 0 && (
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2">⚙️ Specs</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {specs.map(key => (
                  <div key={key} className="bg-secondary/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">{SPEC_LABELS[key]}</p>
                    <p className="text-sm font-medium">{post[key]}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <CommentThread postId={post.id} comments={comments} demo={DEMO} />
        </div>

        <div className="space-y-4">
          <RatingWidget
            postId={post.id}
            avgRating={post.avgRating}
            ratingCount={post.ratingCount}
            userRating={userRating}
            demo={DEMO}
          />

          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground">POSTED BY</h3>
            <Link href={`/u/${post.author.username}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <Avatar src={post.author.avatar} username={post.author.username} size={44} />
              <div>
                <p className="font-semibold">@{post.author.username}</p>
                {post.author.bio && <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{post.author.bio}</p>}
              </div>
            </Link>
          </div>

          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground">SHARE</h3>
            <ShareButton />
          </div>
        </div>
      </div>
    </div>
  )
}
