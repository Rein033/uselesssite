import type { Metadata } from 'next'
import Link from 'next/link'
import EasterEggs from './EasterEggs'

export const metadata: Metadata = {
  title: 'REIN.DEV — PORTFOLIO',
  description: 'Have you tried turning it off and on again?',
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: 'PRJ-001',
    href: '/airsoft/',
    external: true,
    title: '3D AIRSOFT PATCHES',
    tag: 'WEBSHOP',
    desc: 'Webshop voor custom 3D-geprinte PLA airsoft patches en accessoires. Statisch gebouwd met HTML, CSS en JavaScript inclusief winkelmandje.',
    stack: ['HTML', 'CSS', 'JAVASCRIPT'],
  },
  {
    id: 'PRJ-002',
    href: '/feed',
    external: false,
    title: 'USELESSSITE COMMUNITY',
    tag: 'PLATFORM',
    desc: 'Full-stack community waar gebruikers hun setup delen en laten beoordelen. Met accounts, ratings, comments en leaderboard. Gebouwd door één persoon — nee, niet Moss.',
    stack: ['NEXT.JS 14', 'TYPESCRIPT', 'PRISMA', 'POSTGRESQL'],
  },
  {
    id: 'PRJ-003',
    href: '/scrum',
    external: false,
    title: 'SCRUM GUIDE NL',
    tag: 'ARTIKEL',
    desc: 'Nederlandstalige uitleg van het Scrum-framework. Rollen, ceremonies, artefacten, implementatieplan. Gebaseerd op de officiële Scrum Guide 2020.',
    stack: ['SCRUM', 'AGILE', 'KENNISDELING'],
  },
]

const TOOLS = [
  {
    id: 'T-001',
    href: '/tools/sap',
    title: 'SAP IMPORT GENERATOR',
    tag: 'BEDRIJFSTOOL',
    desc: 'Genereer SAP-compatibele CSV-importbestanden voor inkooporders, materiaalstam, leveranciers en kostenplaatsen. Geen IT-afdeling nodig.',
    stack: ['SAP', 'CSV', 'EXCEL'],
  },
  {
    id: 'T-002',
    href: '/tools/sprint',
    title: 'SPRINT PLANNER',
    tag: 'AGILE TOOL',
    desc: 'Plan sprint-capaciteit op basis van teamgrootte, beschikbare dagen en velocity. Inclusief backlog en overload-indicator.',
    stack: ['SCRUM', 'PLANNING', 'AGILE'],
  },
  {
    id: 'T-003',
    href: '/tools/wachtwoord',
    title: 'WACHTWOORD GENERATOR',
    tag: 'SECURITY',
    desc: 'Genereer sterke wachtwoorden via crypto.getRandomValues(). Alles lokaal — er wordt niets verstuurd. Zelfs niet naar Denholm.',
    stack: ['CRYPTO', 'SECURITY', 'PRIVACY'],
  },
  {
    id: 'T-004',
    href: '/tools/json',
    title: 'JSON FORMATTER',
    tag: 'DEV TOOL',
    desc: 'Format, minify of valideer JSON direct in je browser. Statistieken, foutmeldingen met uitleg en een kopieerknop. Roy zou het gebruiken.',
    stack: ['JSON', 'DEVELOPER', 'FORMATTER'],
  },
  {
    id: 'T-005',
    href: '/tools/signature',
    title: 'EMAIL HANDTEKENING GEN.',
    tag: 'PRODUCTIVITEIT',
    desc: 'Maak een professionele e-mailhandtekening met naam, functie, foto en contactinfo. Drie stijlen, kleurkiezer, live preview, Outlook-klaar.',
    stack: ['OUTLOOK', 'EMAIL', 'HTML'],
  },
]

const STACK = ['NEXT.JS', 'TYPESCRIPT', 'REACT', 'TAILWIND', 'PRISMA', 'POSTGRESQL', 'NODE.JS', 'GIT']

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Row({ item }: { item: typeof PROJECTS[0] | typeof TOOLS[0] }) {
  const inner = (
    <div className="group border border-green-900/60 hover:border-green-500/70 p-4 transition-all cursor-pointer hover:bg-green-950/30 relative">
      {/* Corner decorations */}
      <span className="absolute top-0 left-0 text-green-900 group-hover:text-green-700 transition-colors select-none text-xs leading-none">┌</span>
      <span className="absolute top-0 right-0 text-green-900 group-hover:text-green-700 transition-colors select-none text-xs leading-none">┐</span>
      <span className="absolute bottom-0 left-0 text-green-900 group-hover:text-green-700 transition-colors select-none text-xs leading-none">└</span>
      <span className="absolute bottom-0 right-0 text-green-900 group-hover:text-green-700 transition-colors select-none text-xs leading-none">┘</span>

      <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="text-green-800 text-xs shrink-0">{item.id}</span>
          <span className="font-bold text-green-300 group-hover:text-green-200 transition-colors tracking-wide">
            {item.title}
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-green-700 text-xs">[{item.tag}]</span>
          <span className="text-green-700 group-hover:text-green-400 text-xs transition-colors">
            OPEN&nbsp;→
          </span>
        </div>
      </div>

      <p className="text-green-700 text-xs leading-relaxed mb-3 ml-0">{item.desc}</p>

      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {item.stack.map((s, i) => (
          <span key={s} className="text-green-900 text-xs">
            {i > 0 && <span className="mr-3">·</span>}
            {s}
          </span>
        ))}
      </div>
    </div>
  )

  if ('external' in item && item.external) {
    return <a href={(item as typeof PROJECTS[0]).href}>{inner}</a>
  }
  return <Link href={(item as any).href}>{inner}</Link>
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  return (
    <>
      {/* Hidden HTML comment easter egg for source-code readers */}
      {/* <!-- HELLO IT. HAVE YOU TRIED TURNING IT OFF AND ON AGAIN? --> */}
      {/* <!-- NOODNUMMER: 0118 999 881 999 119 725 3 --> */}
      {/* <!-- COPYRIGHT REYNHOLM INDUSTRIES. TOMORROW'S SOLUTIONS... YESTERDAY. --> */}

      <EasterEggs />

      {/* Scanline overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-30 opacity-[0.04]"
        style={{
          backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, #000 3px, #000 4px)',
        }}
      />
      {/* CRT vignette */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-20"
        style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)' }}
      />

      <div className="bg-black text-green-400 font-mono min-h-[calc(100vh-3.5rem)] relative z-10 retro-screen">
        <div className="max-w-3xl mx-auto px-4 py-10 space-y-10">

          {/* ── BOOT HEADER ── */}
          <header className="border border-green-900 p-5 space-y-4">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <span className="text-green-600 text-xs tracking-widest">REIN.DEV PORTFOLIO SYSTEEM v2.0</span>
              <span className="text-xs">
                <span className="text-green-700">STATUS: </span>
                <span className="text-green-400 animate-pulse">● ONLINE</span>
              </span>
            </div>

            <div className="border-t border-green-900/50 pt-4 space-y-1.5 text-sm">
              <div><span className="text-green-700">C:\REIN&gt; </span><span className="text-green-500">whoami</span></div>
              <div className="text-green-300 pl-4">GEBRUIKER........... REIN</div>
              <div className="text-green-300 pl-4">ROL................. FULL-STACK DEVELOPER</div>
              <div className="text-green-300 pl-4">
                STATUS............. <span className="text-green-200 font-bold">BESCHIKBAAR VOOR PROJECTEN</span>
              </div>
              <div className="pt-1"><span className="text-green-700">C:\REIN&gt; </span><span className="text-green-500">motd</span></div>
              <div className="text-green-200 pl-4 font-bold">
                "Have you tried turning it off and on again?"
              </div>
              <div className="pt-1">
                <span className="text-green-700">C:\REIN&gt; </span>
                <span className="retro-cursor text-green-500" />
              </div>
            </div>

            <div className="border-t border-green-900/50 pt-4 flex flex-wrap gap-3">
              <Link
                href="/feed"
                className="text-xs border border-green-800 hover:border-green-500 px-4 py-2 transition-colors hover:bg-green-950/50 hover:text-green-200"
              >
                [ USELESSSITE COMMUNITY → ]
              </Link>
              <a
                href="https://github.com/Rein033"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs border border-green-800 hover:border-green-500 px-4 py-2 transition-colors hover:bg-green-950/50 hover:text-green-200 text-green-600"
              >
                [ GITHUB → ]
              </a>
            </div>
          </header>

          {/* ── PROJECTS ── */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 text-xs text-green-700">
              <span className="tracking-widest">══ PROJECTEN</span>
              <span className="flex-1 border-t border-green-900/40" />
              <span>{PROJECTS.length} bestanden</span>
            </div>
            {PROJECTS.map(p => <Row key={p.id} item={p} />)}
          </section>

          {/* ── TOOLS ── */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 text-xs text-green-700">
              <span className="tracking-widest">══ TOOLS</span>
              <span className="flex-1 border-t border-green-900/40" />
              <span>{TOOLS.length} executables</span>
            </div>
            {TOOLS.map(p => <Row key={p.id} item={p} />)}
          </section>

          {/* ── TECH STACK ── */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 text-xs text-green-700">
              <span className="tracking-widest">══ TECH STACK</span>
              <span className="flex-1 border-t border-green-900/40" />
            </div>
            <div className="border border-green-900/60 p-4">
              <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-green-800">
                {STACK.map((s, i) => (
                  <span key={s}>
                    {i > 0 && <span className="text-green-900 mx-1">·</span>}
                    <span className="hover:text-green-500 transition-colors cursor-default">{s}</span>
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ── FOOTER ── */}
          <footer className="border-t border-green-900/40 pt-5 space-y-1 text-xs text-green-800">
            <div className="flex justify-between flex-wrap gap-2">
              <span>© {new Date().getFullYear()} REIN — ALL RIGHTS RESERVED</span>
              <a
                href="https://github.com/Rein033"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-500 transition-colors"
              >
                GITHUB.COM/REIN033
              </a>
            </div>
            <div className="text-green-900">
              VOOR NOODGEVALLEN: 0118 999 881 999 119 725 3
            </div>
            <div className="text-green-900/50 text-[10px] pt-1">
              TIP: OPEN DE BROWSER CONSOLE · PROBEER DE KONAMI CODE ↑↑↓↓←→←→BA
            </div>
          </footer>

        </div>
      </div>
    </>
  )
}
