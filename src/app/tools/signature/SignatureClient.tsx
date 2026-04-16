'use client'
import { useState, useRef } from 'react'

interface Fields {
  firstName:   string
  lastName:    string
  jobTitle:    string
  department:  string
  company:     string
  email:       string
  phone:       string
  mobile:      string
  website:     string
  street:      string
  city:        string
  country:     string
  imageUrl:    string
  accentColor: string
}

const DEFAULTS: Fields = {
  firstName:   '',
  lastName:    '',
  jobTitle:    '',
  department:  '',
  company:     '',
  email:       '',
  phone:       '',
  mobile:      '',
  website:     '',
  street:      '',
  city:        '',
  country:     '',
  imageUrl:    '',
  accentColor: '#6366f1',
}

type Theme = 'modern' | 'classic' | 'minimal'

function buildHtml(f: Fields, theme: Theme): string {
  const name    = [f.firstName, f.lastName].filter(Boolean).join(' ')
  const address = [f.street, f.city, f.country].filter(Boolean).join(', ')
  const website = f.website
    ? (f.website.startsWith('http') ? f.website : 'https://' + f.website)
    : ''
  const color   = f.accentColor || '#6366f1'

  const photo = f.imageUrl
    ? `<td style="padding-right:16px;vertical-align:top;">
        <img src="${f.imageUrl}" alt="${name}" width="80" height="80"
          style="border-radius:50%;object-fit:cover;display:block;"/>
      </td>`
    : ''

  if (theme === 'minimal') {
    return `<table cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;font-size:13px;color:#374151;line-height:1.5;">
  <tr>
    ${photo}
    <td style="vertical-align:top;">
      ${name ? `<div style="font-weight:700;font-size:15px;color:#111827;">${name}</div>` : ''}
      ${f.jobTitle ? `<div style="color:#6b7280;font-size:12px;">${f.jobTitle}${f.company ? ` · ${f.company}` : ''}</div>` : ''}
      <div style="margin-top:6px;font-size:12px;color:#6b7280;">
        ${f.email ? `<a href="mailto:${f.email}" style="color:${color};text-decoration:none;">${f.email}</a>` : ''}
        ${f.phone ? ` · ${f.phone}` : ''}
        ${f.mobile ? ` · ${f.mobile}` : ''}
      </div>
      ${website ? `<div><a href="${website}" style="font-size:12px;color:${color};text-decoration:none;">${f.website}</a></div>` : ''}
    </td>
  </tr>
</table>`
  }

  if (theme === 'classic') {
    return `<table cellpadding="0" cellspacing="0" style="font-family:'Times New Roman',serif;font-size:13px;color:#1f2937;line-height:1.6;border-top:2px solid ${color};padding-top:12px;">
  <tr>
    ${photo}
    <td style="vertical-align:top;">
      ${name ? `<div style="font-weight:700;font-size:16px;">${name}</div>` : ''}
      ${f.jobTitle ? `<div style="font-style:italic;color:#4b5563;">${f.jobTitle}</div>` : ''}
      ${f.department ? `<div style="color:#4b5563;font-size:12px;">${f.department}</div>` : ''}
      ${f.company ? `<div style="font-weight:600;margin-top:4px;">${f.company}</div>` : ''}
      <div style="margin-top:8px;font-size:12px;color:#4b5563;">
        ${f.email ? `<div>✉ <a href="mailto:${f.email}" style="color:${color};text-decoration:none;">${f.email}</a></div>` : ''}
        ${f.phone ? `<div>☎ ${f.phone}</div>` : ''}
        ${f.mobile ? `<div>📱 ${f.mobile}</div>` : ''}
        ${address ? `<div>📍 ${address}</div>` : ''}
        ${website ? `<div>🌐 <a href="${website}" style="color:${color};text-decoration:none;">${f.website}</a></div>` : ''}
      </div>
    </td>
  </tr>
</table>`
  }

  // modern (default)
  return `<table cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;font-size:13px;color:#374151;line-height:1.5;">
  <tr>
    ${photo}
    <td style="border-left:3px solid ${color};padding-left:14px;vertical-align:top;">
      ${name ? `<div style="font-weight:700;font-size:15px;color:#111827;">${name}</div>` : ''}
      ${f.jobTitle ? `<div style="color:${color};font-size:12px;font-weight:600;">${f.jobTitle}</div>` : ''}
      ${(f.department || f.company) ? `<div style="color:#6b7280;font-size:12px;">${[f.department, f.company].filter(Boolean).join(' · ')}</div>` : ''}
      <div style="margin-top:8px;font-size:12px;border-top:1px solid #e5e7eb;padding-top:8px;">
        ${f.email ? `<div>✉ <a href="mailto:${f.email}" style="color:${color};text-decoration:none;">${f.email}</a></div>` : ''}
        ${f.phone ? `<div>☎ ${f.phone}</div>` : ''}
        ${f.mobile ? `<div>📱 ${f.mobile}</div>` : ''}
        ${address ? `<div>📍 ${address}</div>` : ''}
        ${website ? `<div>🌐 <a href="${website}" style="color:${color};text-decoration:none;">${f.website}</a></div>` : ''}
      </div>
    </td>
  </tr>
</table>`
}

const FIELD_GROUPS = [
  {
    label: 'Persoonlijk',
    fields: [
      { key: 'firstName',  label: 'Voornaam',       placeholder: 'Jan' },
      { key: 'lastName',   label: 'Achternaam',      placeholder: 'de Vries' },
      { key: 'imageUrl',   label: 'Foto URL',        placeholder: 'https://... (optioneel)' },
    ],
  },
  {
    label: 'Functie & bedrijf',
    fields: [
      { key: 'jobTitle',   label: 'Functietitel',    placeholder: 'Projectmanager' },
      { key: 'department', label: 'Afdeling',        placeholder: 'ICT' },
      { key: 'company',    label: 'Organisatie',     placeholder: 'Bedrijfsnaam' },
    ],
  },
  {
    label: 'Contactgegevens',
    fields: [
      { key: 'email',      label: 'E-mailadres',     placeholder: 'jan@bedrijf.nl' },
      { key: 'phone',      label: 'Telefoon',        placeholder: '+31 20 123 4567' },
      { key: 'mobile',     label: 'Mobiel',          placeholder: '+31 6 12345678' },
      { key: 'website',    label: 'Website',         placeholder: 'www.bedrijf.nl' },
    ],
  },
  {
    label: 'Adres',
    fields: [
      { key: 'street',     label: 'Straat',          placeholder: 'Hoofdstraat 1' },
      { key: 'city',       label: 'Stad',            placeholder: 'Amsterdam' },
      { key: 'country',    label: 'Land',            placeholder: 'Nederland' },
    ],
  },
] as const

const THEMES: { key: Theme; label: string }[] = [
  { key: 'modern',  label: 'Modern' },
  { key: 'classic', label: 'Klassiek' },
  { key: 'minimal', label: 'Minimaal' },
]

export default function SignatureClient() {
  const [fields, setFields] = useState<Fields>(DEFAULTS)
  const [theme,  setTheme]  = useState<Theme>('modern')
  const [copied, setCopied] = useState<'html' | 'text' | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  function set(key: keyof Fields, value: string) {
    setFields(prev => ({ ...prev, [key]: value }))
  }

  const html = buildHtml(fields, theme)

  function copyHtml() {
    navigator.clipboard.writeText(html).then(() => {
      setCopied('html')
      setTimeout(() => setCopied(null), 2000)
    })
  }

  function copyForOutlook() {
    if (!previewRef.current) return
    const range = document.createRange()
    range.selectNodeContents(previewRef.current)
    const sel = window.getSelection()
    sel?.removeAllRanges()
    sel?.addRange(range)
    document.execCommand('copy')
    sel?.removeAllRanges()
    setCopied('text')
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      <div>
        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Tool</p>
        <h1 className="text-3xl font-black mb-1">E-mail Handtekening Generator</h1>
        <p className="text-muted-foreground">Vul je gegevens in en kopieer de handtekening direct in Outlook of een andere e-mailclient.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: inputs */}
        <div className="space-y-6">
          {FIELD_GROUPS.map(group => (
            <div key={group.label} className="bg-card border border-border rounded-xl p-5 space-y-3">
              <h2 className="font-semibold text-sm">{group.label}</h2>
              {group.fields.map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="text-xs text-muted-foreground mb-1 block">{label}</label>
                  <input
                    value={fields[key as keyof Fields]}
                    onChange={e => set(key as keyof Fields, e.target.value)}
                    placeholder={placeholder}
                    className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors"
                  />
                </div>
              ))}
            </div>
          ))}

          {/* Accent color */}
          <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <h2 className="font-semibold text-sm">Stijl</h2>
            <div className="flex flex-wrap gap-2 mb-3">
              {THEMES.map(t => (
                <button key={t.key} onClick={() => setTheme(t.key)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${theme === t.key ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>
                  {t.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <label className="text-xs text-muted-foreground">Accentkleur</label>
              <input type="color" value={fields.accentColor}
                onChange={e => set('accentColor', e.target.value)}
                className="w-10 h-8 rounded cursor-pointer bg-transparent border-0"
              />
              <span className="text-xs font-mono text-muted-foreground">{fields.accentColor}</span>
              <div className="flex gap-1.5 ml-2">
                {['#6366f1','#0ea5e9','#10b981','#f59e0b','#ef4444','#8b5cf6','#374151'].map(c => (
                  <button key={c} onClick={() => set('accentColor', c)}
                    className="w-5 h-5 rounded-full border-2 transition-all"
                    style={{ backgroundColor: c, borderColor: fields.accentColor === c ? 'white' : 'transparent' }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: preview */}
        <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <h2 className="font-semibold text-sm">Voorbeeld</h2>

          <div className="bg-white rounded-xl border border-border p-5 min-h-32">
            <div
              ref={previewRef}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>

          <div className="space-y-2">
            <button onClick={copyForOutlook}
              className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all">
              {copied === 'text' ? '✓ Gekopieerd! Plak in Outlook' : '📋 Kopieer voor Outlook / Gmail'}
            </button>
            <button onClick={copyHtml}
              className="w-full py-2.5 rounded-lg bg-secondary hover:bg-secondary/80 text-sm font-medium transition-colors">
              {copied === 'html' ? '✓ HTML gekopieerd' : '&lt;/&gt; Kopieer HTML-code'}
            </button>
          </div>

          <div className="bg-secondary/40 border border-border rounded-xl p-4 text-xs text-muted-foreground space-y-1.5">
            <p className="font-medium text-foreground text-sm">Instellen in Outlook</p>
            <p>1. Klik op <strong>Bestand → Opties → E-mail → Handtekeningen</strong></p>
            <p>2. Klik op <strong>Nieuw</strong> en geef een naam</p>
            <p>3. Klik in het tekstvak en druk <strong>Ctrl+V</strong></p>
            <p>4. Sla op en wijs toe aan berichten</p>
          </div>

          <details className="text-xs">
            <summary className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors">HTML-broncode bekijken</summary>
            <pre className="mt-2 bg-card border border-border rounded-lg p-3 overflow-x-auto text-muted-foreground whitespace-pre-wrap break-all">{html}</pre>
          </details>
        </div>
      </div>
    </div>
  )
}
