'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

type Toast = { id: string; message: string; type: 'success' | 'error' | 'info' }

const ToastCtx = createContext<{ toast: (msg: string, type?: Toast['type']) => void }>({
  toast: () => {},
})

export function useToast() { return useContext(ToastCtx) }

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = Math.random().toString(36).slice(2)
    setToasts(p => [...p, { id, message, type }])
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500)
  }, [])

  return (
    <ToastCtx.Provider value={{ toast }}>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className={cn(
              'animate-fade-in px-4 py-3 rounded-lg shadow-lg text-sm font-medium pointer-events-auto max-w-sm',
              t.type === 'success' && 'bg-emerald-500 text-white',
              t.type === 'error'   && 'bg-destructive text-white',
              t.type === 'info'    && 'bg-secondary text-foreground border border-border',
            )}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}
