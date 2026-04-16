'use client'
import { useState, useCallback } from 'react'

const SETS = {
  upper:   { label: 'Hoofdletters (A–Z)',   chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
  lower:   { label: 'Kleine letters (a–z)', chars: 'abcdefghijklmnopqrstuvwxyz' },
  numbers: { label: 'Cijfers (0–9)',         chars: '0123456789' },
  symbols: { label: 'Symbolen (!@#...)',     chars: '!@#$%^&*()_+-=[]{}|;:,.<>?' },
}
type SetKey = keyof typeof SETS

function generate(length: number, enabled: Record<SetKey, boolean>): string {
  const pool = (Object.entries(SETS) as [SetKey, typeof SETS[SetKey]][])
    .filter(([k]) => enabled[k])
    .map(([, v]) => v.chars)
    .join('')
  if (!pool) return ''
  const arr = new Uint32Array(length)
  crypto.getRandomValues(arr)
  return Array.from(arr, n => pool[n % pool.length]).join('')
}

function strength(pwd: string): { label: string; color: string; width: string } {
  if (!pwd) return { label: '', color: '', width: '0%' }
  let score = 0
  if (pwd.length >= 12) score++
  if (pwd.length >= 16) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[a-z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++
  if (score <= 2) return { label: 'Zwak',   color: 'bg-red-500',    width: '25%' }
  if (score <= 3) return { label: 'Matig',  color: 'bg-amber-500',  width: '50%' }
  if (score <= 4) return { label: 'Goed',   color: 'bg-blue-500',   width: '75%' }
  return               { label: 'Sterk',  color: 'bg-emerald-500', width: '100%' }
}

export default function WachtwoordClient() {
  const [length,  setLength]  = useState(16)
  const [count,   setCount]   = useState(5)
  const [enabled, setEnabled] = useState<Record<SetKey, boolean>>({
    upper: true, lower: true, numbers: true, symbols: false,
  })
  const [passwords, setPasswords] = useState<string[]>([])
  const [copied,    setCopied]    = useState<number | null>(null)

  function toggleSet(k: SetKey) {
    const next = { ...enabled, [k]: !enabled[k] }
    const anyOn = Object.values(next).some(Boolean)
    if (!anyOn) return
    setEnabled(next)
  }

  function generateAll() {
    setPasswords(Array.from({ length: count }, () => generate(length, enabled)))
    setCopied(null)
  }

  function copy(i: number, pwd: string) {
    navigator.clipboard.writeText(pwd).then(() => {
      setCopied(i)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  const anyGenerated = passwords.length > 0

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">
      <div>
        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Tool</p>
        <h1 className="text-3xl font-black mb-1">Wachtwoord Generator</h1>
        <p className="text-muted-foreground">Genereer sterke, willekeurige wachtwoorden direct in je browser.</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        {/* Length */}
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">
            Lengte: <span className="text-foreground font-bold">{length} tekens</span>
          </label>
          <input type="range" min={8} max={64} value={length}
            onChange={e => setLength(+e.target.value)}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>8</span><span>64</span>
          </div>
        </div>

        {/* Count */}
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">
            Aantal: <span className="text-foreground font-bold">{count}</span>
          </label>
          <input type="range" min={1} max={20} value={count}
            onChange={e => setCount(+e.target.value)}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1</span><span>20</span>
          </div>
        </div>

        {/* Character sets */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Tekens</p>
          {(Object.entries(SETS) as [SetKey, typeof SETS[SetKey]][]).map(([key, { label }]) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer group">
              <div
                onClick={() => toggleSet(key)}
                className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                  enabled[key] ? 'bg-primary border-primary' : 'border-border bg-secondary'
                }`}
              >
                {enabled[key] && <span className="text-white text-xs">✓</span>}
              </div>
              <span className="text-sm group-hover:text-foreground transition-colors">{label}</span>
            </label>
          ))}
        </div>

        <button
          onClick={generateAll}
          className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
        >
          Genereer {count} wachtwoord{count !== 1 ? 'en' : ''}
        </button>
      </div>

      {/* Results */}
      {anyGenerated && (
        <div className="space-y-3">
          <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-widest">Resultaten</h2>
          {passwords.map((pwd, i) => {
            const s = strength(pwd)
            return (
              <div key={i} className="bg-card border border-border rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-3">
                  <code className="flex-1 font-mono text-sm break-all select-all">{pwd}</code>
                  <button
                    onClick={() => copy(i, pwd)}
                    className="shrink-0 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-xs font-medium transition-colors"
                  >
                    {copied === i ? '✓' : 'Kopieer'}
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${s.color}`} style={{ width: s.width }} />
                  </div>
                  <span className="text-xs text-muted-foreground w-10">{s.label}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center">
        Wachtwoorden worden lokaal gegenereerd via <code>crypto.getRandomValues()</code> — er wordt niets verzonden.
      </p>
    </div>
  )
}
