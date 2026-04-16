import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Portfolio — Rein',
  description: 'Portfolio van Rein: projecten en tools gebouwd met Next.js, TypeScript en meer.',
}

const projects = [
  {
    href: '/airsoft/',
    external: true,
    icon: '◈',
    gradient: 'from-orange-500 to-red-500',
    tag: 'Webshop',
    title: '3D Airsoft Patches',
    desc: 'Webshop voor custom 3D-geprinte PLA airsoft patches en accessoires. Statisch gebouwd met HTML, CSS en JavaScript. Inclusief winkelmandje en bestelformulier.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    cta: 'Bekijk webshop',
  },
  {
    href: '/feed',
    external: false,
    icon: '📌',
    gradient: 'from-indigo-500 to-violet-500',
    tag: 'Community platform',
    title: 'UselessSite Community',
    desc: 'Full-stack community waar gebruikers hun gaming rig, dev-workspace of thuiskantoor delen en laten beoordelen. Met accounts, ratings, comments en leaderboard.',
    tags: ['Next.js 14', 'TypeScript', 'Prisma', 'PostgreSQL'],
    cta: 'Open platform',
  },
  {
    href: '/scrum',
    external: false,
    icon: '🔄',
    gradient: 'from-emerald-500 to-teal-400',
    tag: 'Kennisartikel',
    title: 'Scrum Guide NL',
    desc: 'Nederlandstalige uitleg van het Scrum-framework: rollen, ceremonies, artefacten en een stap-voor-stap implementatieplan. Gebaseerd op de officiële Scrum Guide 2020.',
    tags: ['Scrum', 'Agile', 'Kennisdeling'],
    cta: 'Lees artikel',
  },
]

const tools = [
  {
    href: '/tools/sap',
    external: false,
    icon: '🗂️',
    gradient: 'from-blue-500 to-cyan-400',
    tag: 'Bedrijfstool',
    title: 'SAP Import Generator',
    desc: 'Genereer SAP-compatibele CSV-importbestanden voor inkooporders, materiaalstam, leveranciers en kostenplaatsen. Direct downloaden, klaar voor import.',
    tags: ['SAP', 'CSV', 'Excel'],
    cta: 'Open tool',
  },
  {
    href: '/tools/sprint',
    external: false,
    icon: '📋',
    gradient: 'from-violet-500 to-purple-400',
    tag: 'Agile tool',
    title: 'Sprint Planner',
    desc: 'Plan sprint-capaciteit op basis van teamgrootte, beschikbare dagen en velocity. Voeg backlog-items toe en zie direct of je team overloaded is.',
    tags: ['Scrum', 'Planning', 'Agile'],
    cta: 'Open tool',
  },
  {
    href: '/tools/wachtwoord',
    external: false,
    icon: '🔐',
    gradient: 'from-pink-500 to-rose-400',
    tag: 'Beveiligingstool',
    title: 'Wachtwoord Generator',
    desc: 'Genereer sterke, willekeurige wachtwoorden via crypto.getRandomValues(). Instelbare lengte, tekensets en sterkte-indicator. Niets wordt verzonden.',
    tags: ['Beveiliging', 'Privacy', 'Crypto'],
    cta: 'Open tool',
  },
  {
    href: '/tools/json',
    external: false,
    icon: '{ }',
    gradient: 'from-amber-500 to-yellow-400',
    tag: 'Developer tool',
    title: 'JSON Formatter',
    desc: 'Format, minify of valideer JSON direct in je browser. Toont fouten met uitleg, statistieken over de structuur en een kopieerknop voor de uitvoer.',
    tags: ['JSON', 'Developer', 'Formatter'],
    cta: 'Open tool',
  },
  {
    href: '/tools/signature',
    external: false,
    icon: '✍️',
    gradient: 'from-teal-500 to-emerald-400',
    tag: 'Productiviteitstool',
    title: 'E-mail Handtekening Generator',
    desc: 'Maak een professionele e-mailhandtekening op basis van je gegevens — naam, functie, foto, contactinfo en meer. Kopieer direct naar Outlook of Gmail.',
    tags: ['Outlook', 'E-mail', 'Handtekening'],
    cta: 'Open tool',
  },
]

type Item = typeof projects[0] & { external: boolean }

function Card({ p }: { p: Item }) {
  const inner = (
    <div className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-200 cursor-pointer flex gap-5">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center text-xl shrink-0 shadow-md font-mono mt-0.5`}>
        {p.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h3 className="font-bold group-hover:text-primary transition-colors">{p.title}</h3>
          <span className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">{p.tag}</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">{p.desc}</p>
        <div className="flex flex-wrap items-center gap-2">
          {p.tags.map(t => (
            <span key={t} className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-md">{t}</span>
          ))}
          <span className={`ml-auto text-sm font-semibold bg-gradient-to-r ${p.gradient} bg-clip-text text-transparent flex items-center gap-1`}>
            {p.cta} <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </span>
        </div>
      </div>
    </div>
  )

  if (p.external) return <a href={p.href}>{inner}</a>
  return <Link href={p.href}>{inner}</Link>
}

const stack = [
  { name: 'Next.js',     icon: '⚡' },
  { name: 'TypeScript',  icon: '🔷' },
  { name: 'React',       icon: '⚛️' },
  { name: 'Tailwind CSS',icon: '🎨' },
  { name: 'Prisma',      icon: '🗄️' },
  { name: 'PostgreSQL',  icon: '🐘' },
  { name: 'Node.js',     icon: '🟢' },
  { name: 'Git',         icon: '🌿' },
]

export default function PortfolioPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-20">

      {/* Hero */}
      <section className="space-y-5">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-sm text-emerald-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
          Beschikbaar voor projecten
        </div>
        <h1 className="text-5xl font-black leading-tight tracking-tight">
          Hey, ik ben{' '}
          <span className="bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-transparent">Rein</span>.
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Ik bouw webapplicaties en tools die werken. Klik op een project of tool hieronder om het te openen.
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <Link href="/feed" className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
            Bekijk UselessSite →
          </Link>
          <a href="https://github.com/Rein033" target="_blank" rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg bg-secondary text-foreground font-medium text-sm hover:bg-secondary/80 transition-colors">
            GitHub
          </a>
        </div>
      </section>

      {/* Projects */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold">Projecten</h2>
        <div className="space-y-4">
          {projects.map(p => <Card key={p.href} p={p as Item} />)}
        </div>
      </section>

      {/* Tools */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold">Tools</h2>
        <div className="space-y-4">
          {tools.map(p => <Card key={p.href} p={p as Item} />)}
        </div>
      </section>

      {/* Stack */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold">Tech stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stack.map(s => (
            <div key={s.name} className="bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-3 text-sm font-medium">
              <span className="text-xl">{s.icon}</span>
              <span>{s.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold">Samenwerken?</h2>
        <p className="text-muted-foreground max-w-md mx-auto">Heb je een project, idee of vraag? Neem contact op via GitHub.</p>
        <a href="https://github.com/Rein033" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
          Open GitHub →
        </a>
      </section>

    </div>
  )
}
