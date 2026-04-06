'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { timeAgo } from '@/lib/utils'
import { useToast } from '@/components/ui/Toaster'
import type { CommentWithAuthor } from '@/types'

interface CommentThreadProps {
  postId: string
  comments: CommentWithAuthor[]
  demo?: boolean
}

export function CommentThread({ postId, comments, demo }: CommentThreadProps) {
  const { data: session } = useSession()
  const { toast } = useToast()
  const router = useRouter()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (demo) { toast('Sign in to comment', 'info'); return }
    if (!content.trim() || !session) return
    setLoading(true)
    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })
      if (!res.ok) throw new Error()
      setContent('')
      router.refresh()
    } catch {
      toast('Failed to post comment', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-lg">Comments <span className="text-muted-foreground font-normal text-base">({comments.length})</span></h3>

      {/* Input */}
      {demo ? (
        <p className="text-sm text-muted-foreground bg-secondary rounded-lg px-4 py-3">
          <a href="/login" className="text-primary hover:underline">Log in</a> to leave a comment.
        </p>
      ) : session ? (
        <form onSubmit={submit} className="flex gap-3">
          <Avatar src={session.user.image} username={session.user.username} size={36} className="shrink-0 mt-0.5" />
          <div className="flex-1 space-y-2">
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Share your thoughts on this setup..."
              rows={3}
              className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
            />
            <Button type="submit" size="sm" loading={loading} disabled={!content.trim()}>
              Post Comment
            </Button>
          </div>
        </form>
      ) : (
        <p className="text-sm text-muted-foreground bg-secondary rounded-lg px-4 py-3">
          <a href="/login" className="text-primary hover:underline">Log in</a> to leave a comment.
        </p>
      )}


      {/* Comments list */}
      <div className="space-y-4">
        {comments.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">No comments yet. Be the first!</p>
        )}
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} postId={postId} />
        ))}
      </div>
    </div>
  )
}

function CommentItem({ comment, postId, depth = 0 }: { comment: CommentWithAuthor; postId: string; depth?: number }) {
  const { data: session } = useSession()
  const { toast } = useToast()
  const router = useRouter()
  const [replying, setReplying] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [loading, setLoading] = useState(false)

  async function submitReply(e: React.FormEvent) {
    e.preventDefault()
    if (!replyContent.trim()) return
    setLoading(true)
    try {
      await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: replyContent, parentId: comment.id }),
      })
      setReplyContent('')
      setReplying(false)
      router.refresh()
    } catch {
      toast('Failed to post reply', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (comment.deleted) {
    return (
      <div className="text-sm text-muted-foreground italic pl-4 border-l-2 border-border">
        [deleted]
      </div>
    )
  }

  return (
    <div className={depth > 0 ? 'pl-6 border-l-2 border-border/50' : ''}>
      <div className="flex gap-3">
        <Avatar src={comment.author.avatar} username={comment.author.username} size={32} className="shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <a href={`/u/${comment.author.username}`} className="text-sm font-medium hover:text-primary transition-colors">
              @{comment.author.username}
            </a>
            <span className="text-xs text-muted-foreground">{timeAgo(comment.createdAt)}</span>
          </div>
          <p className="text-sm leading-relaxed text-foreground/90">{comment.content}</p>
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => setReplying(!replying)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Reply
            </button>
          </div>

          {replying && session && (
            <form onSubmit={submitReply} className="mt-2 flex gap-2">
              <textarea
                value={replyContent}
                onChange={e => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                rows={2}
                autoFocus
                className="flex-1 bg-secondary border border-border rounded-lg px-3 py-1.5 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <div className="flex flex-col gap-1">
                <Button type="submit" size="sm" loading={loading}>Reply</Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => setReplying(false)}>Cancel</Button>
              </div>
            </form>
          )}

          {/* Nested replies */}
          {comment.replies && comment.replies.length > 0 && depth < 3 && (
            <div className="mt-3 space-y-3">
              {comment.replies.map(reply => (
                <CommentItem key={reply.id} comment={reply} postId={postId} depth={depth + 1} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
