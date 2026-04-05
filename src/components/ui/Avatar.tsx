import Image from 'next/image'
import { cn } from '@/lib/utils'

interface AvatarProps {
  src?: string | null
  alt?: string
  size?: number
  className?: string
  username?: string
}

export function Avatar({ src, alt, size = 36, className, username }: AvatarProps) {
  const initials = username?.slice(0, 2).toUpperCase() ?? '?'

  return (
    <div
      className={cn(
        'relative rounded-full overflow-hidden bg-secondary flex items-center justify-center shrink-0',
        className
      )}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image src={src} alt={alt ?? username ?? ''} fill className="object-cover" sizes={`${size}px`} />
      ) : (
        <span className="text-xs font-semibold text-muted-foreground">{initials}</span>
      )}
    </div>
  )
}
