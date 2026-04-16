'use client'
import { useState, useCallback } from 'react'

type Mode = 'format' | 'minify' | 'validate'

function analyse(raw: string) {
  try {
    const parsed = JSON.parse(raw)
    const keyCount = typeof parsed === 'object' && parsed !== null
      ? Object.keys(parsed).length
      : null
    return { ok: true, parsed, keyCount }
  } catch (e: any) {
    return { ok: false, error: e.message as string, parsed: null, keyCount: null }
  }
}

export default function JsonClient() {
  const [input,  setInput]  = useState('')
  const [output, setOutput] = useState('')
  const [error,  setError]  = useState('')
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle')
  const [copied, setCopied] = useState(false)
  const [indent, setIndent] = useState(2)

  function run(mode: Mode) {
    if (!input.trim()) return
    const { ok, parsed, error: err } = analyse(input)
    if (!ok) {
      setError(err!)
      setOutput('')
      setStatus('error')
      return
    }
    setError('')
    setStatus('ok')
    if (mode === 'minify') {
      setOutput(JSON.stringify(parsed))
    } else if (mode === 'format') {
      setOutput(JSON.stringify(parsed, null, indent))
    } else {
      setOutput('✓ Geldige JSON')
    }
  }

  function clear() {
    setInput('')
    setOutput('')
    setError('')
    setStatus('idle')
  }

  function copyOutput() {
    if (!output) return
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function loadExample() {
    setInput(JSON.stringify({
      project: 'UselessSite',
      version: '2.0',
      features: ['portfolio', 'community', 'tools'],
      meta: { author: 'Rein', year: 2024 },
    }, null, 2))
    setOutput('')
    setError('')
    setStatus('idle')
  }

  const stats = input ? analyse(input) : null
  const charCount = input.length
  const lineCount = input ? input.split('\n').length : 0

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <div>
        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Tool</p>
        <h1 className="text-3xl font-black mb-1">JSON Formatter</h1>
        <p className="text-muted-foreground">Format, minify of valideer JSON direct in je browser.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={() => run('format')}   className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all">Formatteren</button>
        <button onClick={() => run('minify')}   className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-sm font-medium transition-colors">Minify</button>
        <button onClick={() => run('validate')} className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-sm font-medium transition-colors">Valideren</button>
        <button onClick={clear}                 className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-sm font-medium transition-colors text-muted-foreground">Wissen</button>
        <button onClick={loadExample}           className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-sm font-medium transition-colors text-muted-foreground">Voorbeeld</button>
        <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
          <span>Inspringing:</span>
          {[2, 4].map(n => (
            <button key={n} onClick={() => setIndent(n)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${indent === n ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
            >{n} spaties</button>
          ))}
        </div>
      </div>

      {/* Editor area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Invoer</label>
            {input && (
              <span className="text-xs text-muted-foreground">{charCount} tekens · {lineCount} regels</span>
            )}
          </div>
          <textarea
            value={input}
            onChange={e => { setInput(e.target.value); setStatus('idle'); setError(''); setOutput('') }}
            placeholder={'{\n  "sleutel": "waarde"\n}'}
            spellCheck={false}
            className="w-full h-80 bg-card border border-border rounded-xl p-4 font-mono text-sm resize-none outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/30"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Uitvoer</label>
            {output && (
              <button onClick={copyOutput} className="text-xs text-primary hover:underline">
                {copied ? '✓ Gekopieerd' : 'Kopieer'}
              </button>
            )}
          </div>
          <div className={`w-full h-80 bg-card border rounded-xl p-4 font-mono text-sm overflow-auto transition-colors ${
            status === 'error' ? 'border-red-500/50' : status === 'ok' ? 'border-emerald-500/30' : 'border-border'
          }`}>
            {error ? (
              <div className="space-y-2">
                <p className="text-red-400 font-semibold text-xs uppercase tracking-wider">Fout</p>
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            ) : output ? (
              <pre className="text-sm whitespace-pre-wrap break-words">{output}</pre>
            ) : (
              <p className="text-muted-foreground/30 text-sm">Uitvoer verschijnt hier...</p>
            )}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      {stats?.ok && (
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground bg-card border border-border rounded-xl px-4 py-3">
          <span className="text-emerald-400 font-medium">✓ Geldige JSON</span>
          {stats.keyCount !== null && <span>{stats.keyCount} sleutels op hoofdniveau</span>}
          <span>Type: <span className="text-foreground">{Array.isArray(stats.parsed) ? 'Array' : typeof stats.parsed}</span></span>
          {Array.isArray(stats.parsed) && <span>Lengte: <span className="text-foreground">{stats.parsed.length}</span></span>}
          <span className="ml-auto">{new Blob([input]).size} bytes</span>
        </div>
      )}
    </div>
  )
}
