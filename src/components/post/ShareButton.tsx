'use client'

export function ShareButton() {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(window.location.href)}
      className="w-full text-sm bg-secondary hover:bg-secondary/80 transition-colors py-2 rounded-lg"
    >
      🔗 Copy Link
    </button>
  )
}
