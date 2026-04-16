import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Portfolio — Rein',
  description: 'Portfolio van Rein: projecten, tools en guides gebouwd met Next.js, TypeScript en meer.',
}

const projects = [
  {
    slug: 'uselesssite',
    href: '/feed',
    external: false,
    icon: '📌',
    title: 'UselessSite',
    tagline: 'Community platform voor setups & werkplekken',
    desc: 'Een full-stack community waar gebruikers hun gaming rig, dev-workspace of thuiskantoor kunnen delen en laten beoordelen door de gemeenschap. Volledig gebouwd met Next.js App Router, Prisma, NextAuth en Tailwind.',
    tags: ['Next.js 14', 'TypeScript', 'Prisma', 'PostgreSQL', 'NextAuth', 'Tailwind CSS'],
    status: 'live',
    statusLabel: 'Live',
    color: 'from-primary to-violet-500',
  },
  {
    slug: 'scrum-guide',
    href: '/scrum',
    external: false,
    icon: '🔄',
    title: 'Scrum Guide (NL)',
    tagline: 'Nederlandstalige Scrum-uitleg voor teams',
    desc: 'Een praktische, toegankelijke uitleg van het Scrum-framework in het Nederlands. Behandelt rollen, ceremonies, artefacten en een stappenplan voor implementatie — gebaseerd op de officiële Scrum Guide.',
    tags: ['Kennisdeling', 'Agile', 'Scrum', 'Next.js'],
    status: 'live',
    statusLabel: 'Live',
    color: 'from-emerald-500 to-teal-400',
  },
]

const stack = [
  { name: 'Next.js', icon: '⚡' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'React', icon: '⚛️' },
  { name: 'Tailwind CSS', icon: '🎨' },
  { name: 'Prisma', icon: '🗄️' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Git', icon: '🌿' },
]

const statusColors: Record<string, string> = {
  live:        'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  wip:         'bg-amber-500/10  text-amber-400  border-amber-500/20',
  archived:    'bg-secondary     text-muted-foreground border-border',
}

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
          <span className="bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-transparent">
            Rein
          </span>
          .
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Ik bouw webapplicaties en tools die werken. Fullstack-developer met focus op schone architectuur, goede gebruikerservaring en leesbare code.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/feed"
            className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            Bekijk UselessSite →
          </Link>
          <a
            href="https://github.com/Rein033"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg bg-secondary text-foreground font-medium text-sm hover:bg-secondary/80 transition-colors"
          >
            GitHub
          </a>
        </div>
      </section>

      {/* Projects */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Projecten</h2>
          <p className="text-muted-foreground mt-1">Wat ik heb gebouwd.</p>
        </div>
        <div className="space-y-5">
          {projects.map(project => (
            <Link
              key={project.slug}
              href={project.href}
              className="group block bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center text-xl shrink-0`}>
                    {project.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusColors[project.status]}`}>
                        {project.statusLabel}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{project.tagline}</p>
                  </div>
                </div>
                <span className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all text-lg">→</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                {project.desc}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs bg-secondary text-muted-foreground px-2.5 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Tech stack</h2>
          <p className="text-muted-foreground mt-1">Wat ik dagelijks gebruik.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stack.map(item => (
            <div
              key={item.name}
              className="bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-3 text-sm font-medium"
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold">Samenwerken?</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Heb je een project, idee of vraag? Neem contact op via GitHub.
        </p>
        <a
          href="https://github.com/Rein033"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
        >
          Open GitHub →
        </a>
      </section>

    </div>
  )
}
