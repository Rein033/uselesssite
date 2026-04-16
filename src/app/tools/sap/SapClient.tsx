'use client'
import { useState, useCallback } from 'react'

const TEMPLATES = {
  inkooporder: {
    label: 'Inkooporder (ME21N)',
    fields: ['Leverancier', 'Materiaal', 'Omschrijving', 'Hoeveelheid', 'Eenheid', 'Prijs', 'Valuta', 'Fabriek', 'Levertijd'],
  },
  materiaal: {
    label: 'Materiaalstam (MM01)',
    fields: ['Materiaalnummer', 'Omschrijving', 'Materialtype', 'Eenheid', 'Artikelgroep', 'Fabriek', 'Gewicht', 'EAN-code'],
  },
  leverancier: {
    label: 'Leverancier (XK01)',
    fields: ['Naam', 'Straat', 'Postcode', 'Stad', 'Land', 'BTW-nummer', 'IBAN', 'Betalingsconditie'],
  },
  kostenplaats: {
    label: 'Kostenplaats (KS01)',
    fields: ['Kostenplaats', 'Omschrijving', 'Verantwoordelijke', 'Afdeling', 'Valuta', 'Begindatum', 'Einddatum'],
  },
} as const

type TemplateKey = keyof typeof TEMPLATES

function emptyRow(fields: readonly string[]): Record<string, string> {
  return Object.fromEntries(fields.map(f => [f, '']))
}

export default function SapClient() {
  const [template, setTemplate] = useState<TemplateKey>('inkooporder')
  const [rows, setRows] = useState<Record<string, string>[]>([emptyRow(TEMPLATES.inkooporder.fields)])
  const [copied, setCopied] = useState(false)

  const fields = TEMPLATES[template].fields

  function switchTemplate(t: TemplateKey) {
    setTemplate(t)
    setRows([emptyRow(TEMPLATES[t].fields)])
  }

  function updateCell(rowIdx: number, field: string, value: string) {
    setRows(prev => prev.map((r, i) => i === rowIdx ? { ...r, [field]: value } : r))
  }

  function addRow() {
    setRows(prev => [...prev, emptyRow(fields)])
  }

  function removeRow(i: number) {
    setRows(prev => prev.length === 1 ? prev : prev.filter((_, idx) => idx !== i))
  }

  function buildCsv() {
    const header = fields.join(';')
    const body = rows.map(row => fields.map(f => `"${(row[f] ?? '').replace(/"/g, '""')}"`).join(';')).join('\n')
    return '\uFEFF' + header + '\n' + body
  }

  function download() {
    const csv = buildCsv()
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `SAP_${template}_import.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(buildCsv()).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const filledRows = rows.filter(r => fields.some(f => r[f]?.trim()))

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      <div>
        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Tool</p>
        <h1 className="text-3xl font-black mb-1">SAP Import Generator</h1>
        <p className="text-muted-foreground">Vul gegevens in en download een SAP-compatibel CSV-importbestand.</p>
      </div>

      {/* Template selector */}
      <div className="flex flex-wrap gap-2">
        {(Object.entries(TEMPLATES) as [TemplateKey, typeof TEMPLATES[TemplateKey]][]).map(([key, tpl]) => (
          <button
            key={key}
            onClick={() => switchTemplate(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              template === key
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            {tpl.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/40">
              <th className="px-3 py-2.5 text-left text-muted-foreground font-medium w-10">#</th>
              {fields.map(f => (
                <th key={f} className="px-3 py-2.5 text-left text-muted-foreground font-medium whitespace-nowrap">{f}</th>
              ))}
              <th className="px-3 py-2.5 w-10" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-border/50 last:border-0">
                <td className="px-3 py-2 text-muted-foreground/50 text-xs">{i + 1}</td>
                {fields.map(f => (
                  <td key={f} className="px-2 py-1.5">
                    <input
                      value={row[f] ?? ''}
                      onChange={e => updateCell(i, f, e.target.value)}
                      placeholder={f}
                      className="w-full min-w-[100px] bg-transparent border border-transparent hover:border-border focus:border-primary outline-none rounded px-2 py-1 text-sm transition-colors placeholder:text-muted-foreground/30"
                    />
                  </td>
                ))}
                <td className="px-2 py-1.5">
                  <button
                    onClick={() => removeRow(i)}
                    className="text-muted-foreground/40 hover:text-red-400 transition-colors text-lg leading-none"
                    aria-label="Rij verwijderen"
                  >×</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={addRow}
          className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-sm font-medium transition-colors"
        >
          + Rij toevoegen
        </button>

        <div className="flex gap-3">
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-sm font-medium transition-colors"
          >
            {copied ? '✓ Gekopieerd' : 'Kopieer CSV'}
          </button>
          <button
            onClick={download}
            disabled={filledRows.length === 0}
            className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Download CSV ({filledRows.length} {filledRows.length === 1 ? 'rij' : 'rijen'})
          </button>
        </div>
      </div>

      <div className="bg-secondary/30 border border-border rounded-xl p-4 text-sm text-muted-foreground space-y-1">
        <p className="font-medium text-foreground">Hoe te importeren in SAP</p>
        <p>1. Download het CSV-bestand (puntkomma-gescheiden, UTF-8 BOM).</p>
        <p>2. Open de bijbehorende transactie ({TEMPLATES[template].label.match(/\(([^)]+)\)/)?.[1]}) in SAP.</p>
        <p>3. Gebruik <strong>Systeem → Services → Lijst → Lokaal bestand downloaden</strong> of de LSMW/BAPI voor bulk-import.</p>
      </div>
    </div>
  )
}
