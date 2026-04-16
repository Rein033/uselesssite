'use client'
import { useState, useMemo } from 'react'

interface Member { id: number; name: string; days: number }
interface Item   { id: number; title: string; points: number }

let nextId = 1

function uid() { return nextId++ }

export default function SprintClient() {
  const [duration, setDuration]     = useState(2)
  const [velocity, setVelocity]     = useState(40)
  const [goal, setGoal]             = useState('')
  const [members, setMembers]       = useState<Member[]>([
    { id: uid(), name: 'Teamlid 1', days: duration * 5 },
  ])
  const [items, setItems]           = useState<Item[]>([
    { id: uid(), title: '', points: 0 },
  ])
  const [copied, setCopied]         = useState(false)

  const workingDays = duration * 5

  const totalCapacity = useMemo(() =>
    members.reduce((s, m) => s + m.days, 0), [members])

  const totalPoints = useMemo(() =>
    items.reduce((s, i) => s + (i.points || 0), 0), [items])

  const pointBudget = Math.round((totalCapacity / (members.length * workingDays || 1)) * velocity)

  const remaining = pointBudget - totalPoints
  const progress  = pointBudget > 0 ? Math.min(100, Math.round((totalPoints / pointBudget) * 100)) : 0
  const overloaded = totalPoints > pointBudget

  function addMember() {
    setMembers(prev => [...prev, { id: uid(), name: `Teamlid ${prev.length + 1}`, days: workingDays }])
  }

  function updateMember(id: number, patch: Partial<Member>) {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, ...patch } : m))
  }

  function removeMember(id: number) {
    setMembers(prev => prev.length === 1 ? prev : prev.filter(m => m.id !== id))
  }

  function addItem() {
    setItems(prev => [...prev, { id: uid(), title: '', points: 0 }])
  }

  function updateItem(id: number, patch: Partial<Item>) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, ...patch } : i))
  }

  function removeItem(id: number) {
    setItems(prev => prev.length === 1 ? prev : prev.filter(i => i.id !== id))
  }

  function copySummary() {
    const lines = [
      `Sprint doel: ${goal || '(niet ingevuld)'}`,
      `Duur: ${duration} week${duration > 1 ? 'en' : ''}`,
      `Velocity: ${velocity} punten`,
      `Capaciteit: ${totalCapacity} mandagen`,
      `Budget: ${pointBudget} story points`,
      '',
      'Team:',
      ...members.map(m => `  - ${m.name}: ${m.days} dagen`),
      '',
      'Backlog:',
      ...items.filter(i => i.title).map(i => `  [${i.points}pt] ${i.title}`),
      '',
      `Totaal gepland: ${totalPoints} / ${pointBudget} punten`,
    ]
    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <div>
        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Tool</p>
        <h1 className="text-3xl font-black mb-1">Sprint Planner</h1>
        <p className="text-muted-foreground">Plan je sprint-capaciteit op basis van teamgrootte en velocity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: settings */}
        <div className="space-y-6">
          {/* Sprint config */}
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <h2 className="font-semibold">Sprint instellingen</h2>

            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Sprint doel</label>
              <input
                value={goal}
                onChange={e => setGoal(e.target.value)}
                placeholder="Bijv. Afronden module X..."
                className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1 block">
                Duur: <span className="text-foreground font-medium">{duration} week{duration > 1 ? 'en' : ''}</span>
              </label>
              <input type="range" min={1} max={4} value={duration}
                onChange={e => {
                  const d = +e.target.value
                  setDuration(d)
                  setMembers(prev => prev.map(m => ({ ...m, days: d * 5 })))
                }}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1w</span><span>2w</span><span>3w</span><span>4w</span>
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1 block">
                Team velocity: <span className="text-foreground font-medium">{velocity} punten/sprint</span>
              </label>
              <input type="range" min={10} max={120} step={5} value={velocity}
                onChange={e => setVelocity(+e.target.value)}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>10</span><span>120</span>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <h2 className="font-semibold">Team</h2>
            {members.map(m => (
              <div key={m.id} className="flex gap-2 items-center">
                <input
                  value={m.name}
                  onChange={e => updateMember(m.id, { name: e.target.value })}
                  className="flex-1 bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors"
                  placeholder="Naam"
                />
                <input
                  type="number" min={0} max={workingDays} value={m.days}
                  onChange={e => updateMember(m.id, { days: Math.min(workingDays, Math.max(0, +e.target.value)) })}
                  className="w-20 bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-center outline-none focus:border-primary transition-colors"
                />
                <span className="text-xs text-muted-foreground">d</span>
                <button onClick={() => removeMember(m.id)} className="text-muted-foreground/40 hover:text-red-400 transition-colors text-lg">×</button>
              </div>
            ))}
            <button onClick={addMember} className="text-sm text-primary hover:underline">+ Teamlid toevoegen</button>
          </div>
        </div>

        {/* Right: summary + backlog */}
        <div className="space-y-6">
          {/* Capacity summary */}
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <h2 className="font-semibold">Capaciteit</h2>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: 'Mandagen', value: totalCapacity },
                { label: 'Story points budget', value: pointBudget },
                { label: 'Gepland', value: totalPoints },
              ].map(s => (
                <div key={s.label} className="bg-secondary rounded-lg p-3">
                  <div className="text-2xl font-black">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-muted-foreground">Voortgang</span>
                <span className={`font-medium ${overloaded ? 'text-red-400' : 'text-emerald-400'}`}>
                  {overloaded ? `${Math.abs(remaining)} pt te veel` : `${remaining} pt resterend`}
                </span>
              </div>
              <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${overloaded ? 'bg-red-500' : 'bg-primary'}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Backlog */}
          <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <h2 className="font-semibold">Sprint backlog</h2>
            {items.map(item => (
              <div key={item.id} className="flex gap-2 items-center">
                <input
                  value={item.title}
                  onChange={e => updateItem(item.id, { title: e.target.value })}
                  placeholder="Omschrijving taak..."
                  className="flex-1 bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors"
                />
                <input
                  type="number" min={0} max={99} value={item.points || ''}
                  onChange={e => updateItem(item.id, { points: Math.max(0, +e.target.value) })}
                  className="w-16 bg-secondary border border-border rounded-lg px-2 py-2 text-sm text-center outline-none focus:border-primary transition-colors"
                  placeholder="pt"
                />
                <button onClick={() => removeItem(item.id)} className="text-muted-foreground/40 hover:text-red-400 transition-colors text-lg">×</button>
              </div>
            ))}
            <button onClick={addItem} className="text-sm text-primary hover:underline">+ Taak toevoegen</button>
          </div>

          <button
            onClick={copySummary}
            className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all"
          >
            {copied ? '✓ Gekopieerd!' : 'Kopieer sprint samenvatting'}
          </button>
        </div>
      </div>
    </div>
  )
}
