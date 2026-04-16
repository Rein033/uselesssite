import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Scrum — Hoe werkt het?',
  description: 'Een praktische uitleg over Scrum: de doelen, rollen, ceremonies en hoe je het implementeert in je team.',
}

const roles = [
  {
    icon: '🎯',
    title: 'Product Owner',
    desc: 'Beheert en prioriteert de Product Backlog. Bepaalt welke functionaliteiten de meeste waarde leveren voor de organisatie en communiceert de visie aan het team.',
  },
  {
    icon: '🧭',
    title: 'Scrum Master',
    desc: 'Faciliteert het Scrum-proces en beschermt het team tegen externe verstoringen. Coacht het team in zelfsturing en helpt obstakels op te lossen.',
  },
  {
    icon: '👥',
    title: 'Ontwikkelteam',
    desc: 'Zelforganiserend team van 3–9 personen dat de werkende increment oplevert. Het team bepaalt zelf hoe het de Sprint-doelen bereikt.',
  },
]

const ceremonies = [
  {
    icon: '📋',
    title: 'Sprint Planning',
    duration: 'Max. 8 uur per 4 weken',
    desc: 'Het team selecteert items uit de Product Backlog en stelt een Sprint Goal op. Samen wordt bepaald hoeveel werk haalbaar is in de komende Sprint.',
  },
  {
    icon: '☀️',
    title: 'Daily Scrum',
    duration: '15 minuten, dagelijks',
    desc: 'Kort dagelijks overleg waarin het team de voortgang bespreekt, de samenwerking afstemt en obstakels benoemt. Geen statusmeeting, maar een planningsmoment.',
  },
  {
    icon: '🔍',
    title: 'Sprint Review',
    duration: 'Max. 4 uur per 4 weken',
    desc: 'Het team demonstreert de opgeleverde increment aan stakeholders en verzamelt feedback. De Product Backlog wordt indien nodig bijgesteld.',
  },
  {
    icon: '🔄',
    title: 'Sprint Retrospective',
    duration: 'Max. 3 uur per 4 weken',
    desc: 'Het team reflecteert op de samenwerking en het proces. Concrete verbeteracties worden benoemd en meegenomen naar de volgende Sprint.',
  },
]

const artifacts = [
  {
    icon: '📦',
    title: 'Product Backlog',
    desc: 'De geordende lijst van alles wat nog in het product moet komen. De Product Owner is eigenaar en werkt de backlog continu bij op basis van nieuwe inzichten.',
  },
  {
    icon: '🗂️',
    title: 'Sprint Backlog',
    desc: 'De geselecteerde items voor de huidige Sprint, plus het plan om het Sprint Goal te bereiken. Eigendom van het Ontwikkelteam.',
  },
  {
    icon: '✅',
    title: 'Increment',
    desc: 'Het concrete, bruikbare resultaat van een Sprint. Elke increment voldoet aan de "Definition of Done" en is potentieel inzetbaar.',
  },
]

const steps = [
  { num: '01', title: 'Vorm een team', desc: 'Stel de drie rollen in: Product Owner, Scrum Master en Ontwikkelteam. Zorg voor duidelijke verantwoordelijkheden en een gezamenlijk begrip van Scrum.' },
  { num: '02', title: 'Bouw de Product Backlog op', desc: 'De Product Owner verzamelt wensen en behoeften, verwerkt deze tot User Stories en prioriteert op basis van waarde. Begin klein — perfectie is niet nodig.' },
  { num: '03', title: 'Definieer "Done"', desc: 'Spreek af wanneer een taak écht af is. Een duidelijke Definition of Done voorkomt onduidelijkheid over kwaliteit en oplevering.' },
  { num: '04', title: 'Start je eerste Sprint', desc: 'Houd een Sprint Planning, kies een realistisch doel en begin met werken. De eerste Sprint hoeft niet perfect te zijn — leren staat centraal.' },
  { num: '05', title: 'Voer de ceremonies uit', desc: 'Houd consequent de Daily Scrum, Sprint Review en Retrospective. Consistentie in het ritme is cruciaal voor het succes van Scrum.' },
  { num: '06', title: 'Inspect en adapteer', desc: 'Gebruik de Retrospective actief om te verbeteren. Kleine, concrete aanpassingen per Sprint leiden tot duurzame groei in teameffectiviteit.' },
]

export default function ScrumPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-16">

      {/* Hero */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-sm text-primary font-medium">
          <span>🔄</span> Agile Framework
        </div>
        <h1 className="text-4xl font-black leading-tight">
          Wat is{' '}
          <span className="bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-transparent">
            Scrum
          </span>
          ?
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Scrum is een lichtgewicht raamwerk waarmee teams complexe producten stapsgewijs ontwikkelen en verbeteren. Het geeft structuur zonder bureaucratie en maakt voortgang zichtbaar.
        </p>
        <p className="text-muted-foreground max-w-2xl">
          Het raamwerk is gebaseerd op drie pijlers: <strong className="text-foreground">transparantie</strong>, <strong className="text-foreground">inspectie</strong> en <strong className="text-foreground">adaptatie</strong>. Teams leveren elke Sprint (1–4 weken) werkende resultaten op, waardoor vroeg bijgestuurd kan worden.
        </p>
      </section>

      {/* Goals */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Doelen van Scrum</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: '🚀', title: 'Sneller waarde leveren', desc: 'Korte iteraties zorgen ervoor dat bruikbare resultaten snel beschikbaar zijn, in plaats van pas na maanden.' },
            { icon: '🔎', title: 'Risico beheersen', desc: 'Door vroeg en regelmatig op te leveren worden fouten snel ontdekt en is de schade beperkt.' },
            { icon: '🤝', title: 'Samenwerking versterken', desc: 'Duidelijke rollen en gestructureerde momenten verbeteren de communicatie binnen en buiten het team.' },
            { icon: '📈', title: 'Continu verbeteren', desc: 'De Retrospective verankert een cultuur van leren: elk team wordt elke Sprint een beetje beter.' },
          ].map(goal => (
            <div key={goal.title} className="bg-card border border-border rounded-xl p-5 space-y-2">
              <div className="text-2xl">{goal.icon}</div>
              <h3 className="font-semibold">{goal.title}</h3>
              <p className="text-sm text-muted-foreground">{goal.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">De drie rollen</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roles.map(role => (
            <div key={role.title} className="bg-card border border-border rounded-xl p-5 space-y-3">
              <div className="text-3xl">{role.icon}</div>
              <h3 className="font-bold">{role.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{role.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ceremonies */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">De vier ceremonies</h2>
        <p className="text-muted-foreground">
          Scrum heeft vier vaste overlegmomenten — ook wel <em>events</em> genoemd. Ze geven het team een duidelijk ritme en zorgen voor transparantie.
        </p>
        <div className="space-y-4">
          {ceremonies.map(c => (
            <div key={c.title} className="bg-card border border-border rounded-xl p-5 flex gap-4">
              <div className="text-3xl shrink-0">{c.icon}</div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-bold">{c.title}</h3>
                  <span className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">{c.duration}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Artifacts */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">De drie artefacten</h2>
        <p className="text-muted-foreground">
          Scrum-artefacten maken werk en voortgang zichtbaar voor het hele team en de stakeholders.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {artifacts.map(a => (
            <div key={a.title} className="bg-card border border-border rounded-xl p-5 space-y-3">
              <div className="text-3xl">{a.icon}</div>
              <h3 className="font-bold">{a.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sprint cycle visual */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">De Sprint-cyclus</h2>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium">
            {[
              { label: 'Product Backlog', bg: 'bg-primary/10 text-primary border-primary/20' },
              { label: '→', bg: 'text-muted-foreground', plain: true },
              { label: 'Sprint Planning', bg: 'bg-violet-500/10 text-violet-400 border-violet-500/20' },
              { label: '→', bg: 'text-muted-foreground', plain: true },
              { label: 'Sprint (1–4 weken)', bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
              { label: '→', bg: 'text-muted-foreground', plain: true },
              { label: 'Increment', bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
            ].map((item, i) =>
              item.plain ? (
                <span key={i} className={item.bg}>{item.label}</span>
              ) : (
                <span key={i} className={`px-3 py-1.5 rounded-lg border ${item.bg}`}>{item.label}</span>
              )
            )}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary inline-block" /> Daily Scrum (dagelijks)</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-violet-400 inline-block" /> Sprint Review (einde Sprint)</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Retrospective (einde Sprint)</span>
          </div>
        </div>
      </section>

      {/* Implementation steps */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Scrum implementeren in 6 stappen</h2>
        <p className="text-muted-foreground">
          Je hoeft niet te wachten op een perfecte situatie. Begin klein, leer van elke Sprint en bouw het proces gaandeweg verder uit.
        </p>
        <div className="space-y-4">
          {steps.map(step => (
            <div key={step.num} className="flex gap-5 bg-card border border-border rounded-xl p-5">
              <div className="shrink-0 text-2xl font-black text-primary/30 w-10 text-center leading-none pt-0.5">
                {step.num}
              </div>
              <div className="space-y-1">
                <h3 className="font-bold">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="bg-primary/5 border border-primary/20 rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-bold">Praktische tips voor de start</h2>
        <ul className="space-y-3 text-sm text-muted-foreground">
          {[
            'Begin met Sprints van 2 weken — dat is lang genoeg om iets op te leveren en kort genoeg om snel bij te sturen.',
            'Houd de Daily Scrum op een vaste tijd en locatie. Consistentie is belangrijker dan de perfecte plek.',
            'Gebruik een eenvoudig bord (fysiek of digitaal) met kolommen To Do, In Progress en Done. Visualiseer voortgang.',
            'Zorg dat de Product Owner bereikbaar is voor het team. Onduidelijkheid over prioriteiten is een van de grootste vertragingsfactoren.',
            'De Retrospective is heilig — sla hem niet over bij tijdgebrek. Juist dan is hij het meest waardevol.',
            'Scrum is een framework, geen keurslijf. Pas het aan op je team, zolang de kernprincipes intact blijven.',
          ].map((tip, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-primary shrink-0 mt-0.5">✓</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Footer note */}
      <section className="text-center text-sm text-muted-foreground py-4 border-t border-border">
        <p>Gebaseerd op de officiële <strong className="text-foreground">Scrum Guide</strong> (Schwaber & Sutherland, 2020).</p>
        <p className="mt-1">Vrij beschikbaar op <span className="text-primary">scrumguides.org</span></p>
      </section>

    </div>
  )
}
