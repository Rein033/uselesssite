import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Portfolio — Rein',
  description: 'Portfolio van Rein: een overzicht van projecten en tools.',
}

const projects = [
  {
    href: '/airsoft/',
    external: true,
    icon: '◈',
    gradient: 'from-orange-500 to-red-500',
    glow: 'group-hover:shadow-orange-500/20',
    border: 'group-hover:border-orange-500/40',
    tag: 'Webshop',
    title: '3D Airsoft Patches',
    desc: 'Webshop voor custom 3D-geprinte PLA airsoft patches en accessoires. Volledig statisch gebouwd met HTML, CSS en JavaScript. Inclusief winkelmandje en bestelformulier.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    cta: 'Bekijk webshop',
  },
  {
    href: '/feed',
    external: false,
    icon: '📌',
    gradient: 'from-primary to-violet-500',
    glow: 'group-hover:shadow-primary/20',
    border: 'group-hover:border-primary/40',
    tag: 'Community platform',
    title: 'UselessSite Community',
    desc: 'Full-stack community waar gebruikers hun gaming rig, dev-workspace of thuiskantoor delen en laten beoordelen. Met accounts, ratings, comments en een leaderboard.',
    tags: ['Next.js 14', 'TypeScript', 'Prisma', 'PostgreSQL'],
    cta: 'Open platform',
  },
  {
    href: '/scrum',
    external: false,
    icon: '🔄',
    gradient: 'from-emerald-500 to-teal-400',
    glow: 'group-hover:shadow-emerald-500/20',
    border: 'group-hover:border-emerald-500/40',
    tag: 'Kennisartikel',
    title: 'Scrum Guide NL',
    desc: 'Nederlandstalige uitleg van het Scrum-framework: rollen, ceremonies, artefacten en een stap-voor-stap implementatieplan. Gebaseerd op de officiële Scrum Guide 2020.',
    tags: ['Scrum', 'Agile', 'Kennisdeling'],
    cta: 'Lees artikel',
  },
]

export default function PortfolioPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-14 space-y-20">

      {/* Hero */}
      <section className="space-y-4">
        <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest">Portfolio</p>
        <h1 className="text-5xl font-black leading-tight tracking-tight">
          Hey, ik ben{' '}
          <span className="bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-transparent">
            Rein
          </span>
          .
        </h1>
        <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
          Ik bouw websites en tools. Hieronder een overzicht van mijn projecten — klik op een kaart om te openen.
        </p>
      </section>

      {/* Projects */}
      <section className="space-y-5">
        <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Projecten
        </h2>

        <div className="grid grid-cols-1 gap-5">
          {projects.map((p) => {
            const inner = (
              <div
                className={`group relative bg-card border border-border rounded-2xl p-7 transition-all duration-200 hover:shadow-xl ${p.glow} ${p.border} cursor-pointer`}
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center text-2xl shrink-0 shadow-lg`}>
                    {p.icon}
                  </div>
                  <span className="text-xs bg-secondary border border-border text-muted-foreground px-2.5 py-1 rounded-full font-medium">
                    {p.tag}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {p.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tags.map(t => (
                    <span key={t} className="text-xs bg-secondary text-muted-foreground px-2.5 py-1 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${p.gradient} bg-clip-text text-transparent`}>
                  {p.cta}
                  <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </div>
              </div>
            )

            return p.external ? (
              <a key={p.href} href={p.href}>{inner}</a>
            ) : (
              <Link key={p.href} href={p.href}>{inner}</Link>
            )
          })}
        </div>
      </section>

      {/* Footer */}
      <section className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} Rein</span>
        <a
          href="https://github.com/Rein033"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          GitHub →
        </a>
      </section>

    </div>
  )
}
