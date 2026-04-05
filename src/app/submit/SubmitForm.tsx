'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toaster'
import { TAGS, uploadImage } from '@/lib/cloudinary'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const SPEC_FIELDS = [
  { key: 'cpu',         label: 'CPU',         placeholder: 'e.g. AMD Ryzen 9 7950X' },
  { key: 'gpu',         label: 'GPU',         placeholder: 'e.g. NVIDIA RTX 4090' },
  { key: 'ram',         label: 'RAM',         placeholder: 'e.g. 32GB DDR5 6000MHz' },
  { key: 'storage',     label: 'Storage',     placeholder: 'e.g. 2TB Samsung 990 Pro' },
  { key: 'peripherals', label: 'Peripherals', placeholder: 'Monitor, keyboard, mouse...' },
  { key: 'deskChair',   label: 'Desk / Chair', placeholder: 'e.g. Uplift V2 + Herman Miller' },
]

export function SubmitForm() {
  const router = useRouter()
  const { toast } = useToast()
  const fileRef = useRef<HTMLInputElement>(null)

  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const [form, setForm] = useState({
    title: '', description: '', buildCost: '',
    cpu: '', gpu: '', ram: '', storage: '', peripherals: '', deskChair: '',
  })

  function set(key: string, value: string) {
    setForm(f => ({ ...f, [key]: value }))
  }

  async function handleFiles(files: FileList) {
    if (images.length + files.length > 6) {
      toast('Max 6 images allowed', 'error')
      return
    }
    setUploading(true)
    try {
      const uploaded = await Promise.all(Array.from(files).map(uploadImage))
      setImages(p => [...p, ...uploaded])
    } catch {
      toast('Image upload failed', 'error')
    } finally {
      setUploading(false)
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim()) { toast('Title is required', 'error'); return }
    if (!form.description.trim()) { toast('Description is required', 'error'); return }

    setLoading(true)
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          buildCost: form.buildCost ? parseFloat(form.buildCost) : null,
          tags: selectedTags,
          images,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      toast('Setup posted!')
      router.push(`/post/${data.id}`)
    } catch (err: any) {
      toast(err.message || 'Failed to post setup', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      {/* Images */}
      <div>
        <label className="block text-sm font-medium mb-2">Images</label>
        <div
          className={cn(
            'border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors',
            uploading && 'opacity-50 pointer-events-none'
          )}
          onClick={() => fileRef.current?.click()}
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files) }}
        >
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden"
            onChange={e => e.target.files && handleFiles(e.target.files)} />
          <p className="text-4xl mb-2">📸</p>
          <p className="font-medium">{uploading ? 'Uploading…' : 'Drop images here or click to browse'}</p>
          <p className="text-sm text-muted-foreground mt-1">PNG, JPG, WEBP — max 6 images</p>
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-3">
            {images.map((img, i) => (
              <div key={i} className="relative aspect-video rounded-lg overflow-hidden bg-secondary group">
                <Image src={img} alt="" fill className="object-cover" sizes="200px" />
                <button
                  type="button"
                  onClick={() => setImages(p => p.filter((_, j) => j !== i))}
                  className="absolute top-1 right-1 bg-black/70 rounded-full w-6 h-6 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >✕</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1.5">Title *</label>
        <input
          type="text"
          value={form.title}
          onChange={e => set('title', e.target.value)}
          placeholder="My Ultimate Battle Station 2024"
          maxLength={100}
          required
          className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1.5">Description *</label>
        <textarea
          value={form.description}
          onChange={e => set('description', e.target.value)}
          placeholder="Tell the community about your setup. How long did it take? What choices did you make?"
          rows={5}
          required
          className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium mb-2">Tags</label>
        <div className="flex flex-wrap gap-2">
          {TAGS.map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTags(p => p.includes(tag) ? p.filter(t => t !== tag) : [...p, tag])}
              className={cn(
                'px-3 py-1 rounded-full text-xs border transition-all',
                selectedTags.includes(tag)
                  ? 'bg-primary/20 border-primary/50 text-primary font-medium'
                  : 'border-border text-muted-foreground hover:border-border/80 hover:text-foreground'
              )}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Specs */}
      <div>
        <h3 className="text-sm font-medium mb-3">Specs (optional)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SPEC_FIELDS.map(f => (
            <div key={f.key}>
              <label className="block text-xs text-muted-foreground mb-1">{f.label}</label>
              <input
                type={f.key === 'peripherals' || f.key === 'deskChair' ? 'text' : 'text'}
                value={(form as any)[f.key]}
                onChange={e => set(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Build cost */}
      <div>
        <label className="block text-sm font-medium mb-1.5">Estimated Build Cost ($)</label>
        <input
          type="number"
          value={form.buildCost}
          onChange={e => set('buildCost', e.target.value)}
          placeholder="3500"
          min="0"
          className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
        />
      </div>

      <Button type="submit" size="lg" className="w-full" loading={loading}>
        🚀 Post Setup
      </Button>
    </form>
  )
}
