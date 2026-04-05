'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export function ImageGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  if (images.length === 0) return null

  return (
    <>
      <div className="space-y-2">
        {/* Main image */}
        <div
          className="relative aspect-video rounded-xl overflow-hidden bg-secondary cursor-zoom-in"
          onClick={() => setLightbox(true)}
        >
          <Image
            src={images[active]}
            alt={`Setup image ${active + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 800px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          {images.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs text-white">
              {active + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn(
                  'relative shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all',
                  i === active ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                )}
              >
                <Image src={img} alt="" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <button className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300">✕</button>
          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-gray-300 p-2"
                onClick={e => { e.stopPropagation(); setActive(p => (p - 1 + images.length) % images.length) }}
              >‹</button>
              <button
                className="absolute right-12 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-gray-300 p-2"
                onClick={e => { e.stopPropagation(); setActive(p => (p + 1) % images.length) }}
              >›</button>
            </>
          )}
          <div className="relative max-w-5xl max-h-full w-full h-full" onClick={e => e.stopPropagation()}>
            <Image src={images[active]} alt="" fill className="object-contain" sizes="100vw" />
          </div>
        </div>
      )}
    </>
  )
}
