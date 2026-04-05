'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { useToast } from '@/components/ui/Toaster'
import { uploadImage } from '@/lib/cloudinary'

interface Props {
  user: {
    id: string
    username: string
    name: string | null
    email: string
    bio: string | null
    avatar: string | null
  }
}

export function SettingsForm({ user }: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [avatarUploading, setAvatarUploading] = useState(false)
  const [form, setForm] = useState({
    name: user.name ?? '',
    bio: user.bio ?? '',
    avatar: user.avatar ?? '',
  })

  function set(key: string, value: string) {
    setForm(f => ({ ...f, [key]: value }))
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarUploading(true)
    try {
      const url = await uploadImage(file)
      set('avatar', url)
    } catch {
      toast('Avatar upload failed', 'error')
    } finally {
      setAvatarUploading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/users/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      toast('Profile updated!')
      router.refresh()
    } catch (err: any) {
      toast(err.message || 'Update failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Avatar */}
      <div>
        <label className="block text-sm font-medium mb-3">Avatar</label>
        <div className="flex items-center gap-4">
          <Avatar src={form.avatar || null} username={user.username} size={72} />
          <div>
            <label className="cursor-pointer text-sm text-primary hover:underline">
              {avatarUploading ? 'Uploading...' : 'Change avatar'}
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} disabled={avatarUploading} />
            </label>
            {form.avatar && (
              <button type="button" onClick={() => set('avatar', '')} className="block text-xs text-muted-foreground hover:text-destructive mt-1 transition-colors">
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Read-only fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-muted-foreground mb-1.5">Username</label>
          <input
            disabled
            value={`@${user.username}`}
            className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2.5 text-sm text-muted-foreground cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1.5">Email</label>
          <input
            disabled
            value={user.email}
            className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2.5 text-sm text-muted-foreground cursor-not-allowed"
          />
        </div>
      </div>

      {/* Display name */}
      <div>
        <label className="block text-sm font-medium mb-1.5">Display Name</label>
        <input
          type="text"
          value={form.name}
          onChange={e => set('name', e.target.value)}
          maxLength={50}
          placeholder="Your full name"
          className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
        />
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium mb-1.5">Bio</label>
        <textarea
          value={form.bio}
          onChange={e => set('bio', e.target.value)}
          maxLength={300}
          rows={3}
          placeholder="Tell the community about yourself..."
          className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
        />
        <p className="text-xs text-muted-foreground mt-1 text-right">{form.bio.length}/300</p>
      </div>

      <Button type="submit" loading={loading}>
        Save Changes
      </Button>
    </form>
  )
}
