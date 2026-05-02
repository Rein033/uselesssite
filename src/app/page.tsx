import type { Metadata } from 'next'
import Link from 'next/link'
import EasterEggs from './EasterEggs'

export const metadata: Metadata = {
  title: 'REIN.DEV — QUICK LINKS',
  description: 'Have you tried turning it off and on again?',
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: 'PROJECTEN',
    count: '4 bestanden',
    items: [
      { path: '/eemlandbouw', label: 'EEMLANDBOUW WEBSITE', tag: 'AGRARISCH', note: 'Concept site voor eemlandbouw.nl · wachtwoord beveiligd', external: false, locked: true },
      { path: '/airsoft/',    label: '3D AIRSOFT PATCHES',  tag: 'WEBSHOP',   note: 'Webshop voor custom 3D-geprinte PLA airsoft patches',       external: true,  locked: false },
      { path: '/feed',        label: 'USELESSSITE COMMUNITY', tag: 'PLATFORM', note: 'Community om setups te delen en te beoordelen',              external: false, locked: false },
      { path: '/scrum',       label: 'SCRUM GUIDE NL',      tag: 'ARTIKEL',   note: 'Nederlandstalige uitleg van het Scrum-framework',             external: false, locked: false },
    ],
  },
  {
    id: 'COMMUNITY',
    count: '3 paginas',
    items: [
      { path: '/feed',        label: 'FEED',        tag: 'OVERZICHT', note: 'Alle setup-posts van de community',              external: false, locked: false },
      { path: '/leaderboard', label: 'LEADERBOARD', tag: 'RANGLIJST', note: 'Gebruikers gerangschikt op score en activiteit', external: false, locked: false },
      { path: '/submit',      label: 'SUBMIT',      tag: 'FORMULIER', note: 'Dien een nieuwe post in met jouw setup',         external: false, locked: false },
    ],
  },
  {
    id: 'TOOLS',
    count: '6 executables',
    items: [
      { path: '/tools/json',       label: 'JSON FORMATTER',          tag: 'DEV',        note: 'Format, minify of valideer JSON in de browser',            external: false, locked: false },
      { path: '/tools/sap',        label: 'SAP IMPORT GENERATOR',    tag: 'BEDRIJF',    note: 'Genereer SAP-compatibele CSV-importbestanden',              external: false, locked: false },
      { path: '/tools/sprint',     label: 'SPRINT PLANNER',          tag: 'AGILE',      note: 'Plan sprint-capaciteit op basis van team en velocity',      external: false, locked: false },
      { path: '/tools/wachtwoord', label: 'WACHTWOORD GENERATOR',    tag: 'SECURITY',   note: 'Veilige wachtwoorden via crypto.getRandomValues()',          external: false, locked: false },
      { path: '/tools/signature',  label: 'EMAIL HANDTEKENING GEN.', tag: 'PRODUCTIVITEIT', note: 'Maak een Outlook-klare e-mailhandtekening',             external: false, locked: false },
      { path: '/tools/wipe',       label: 'DISK WIPE SCRIPT',        tag: 'PRIVÉ',      note: 'PowerShell diskpart wipe script · wachtwoord vereist',      external: false, locked: true  },
    ],
  },
  {
    id: 'ACCOUNT',
    count: '5 paginas',
    items: [
      { path: '/login',    label: 'INLOGGEN',     tag: 'AUTH',     note: 'Log in op je UselessSite account',       external: false, locked: false },
      { path: '/register', label: 'REGISTREREN',  tag: 'AUTH',     note: 'Maak een nieuw account aan',             external: false, locked: false },
      { path: '/settings', label: 'INSTELLINGEN', tag: 'ACCOUNT',  note: 'Beheer profiel, avatar en voorkeuren',   external: false, locked: false },
      { path: '/bookmarks',label: 'BLADWIJZERS',  tag: 'ACCOUNT',  note: 'Bekijk opgeslagen posts',                external: false, locked: false },
      { path: '/u/[username]', label: 'GEBRUIKERSPROFIEL', tag: 'PROFIEL', note: 'Publiek profiel van een gebruiker · /u/{naam}', external: false, locked: false },
    ],
  },
  {
    id: 'ADMIN',
    count: '4 paginas',
    items: [
      { path: '/admin',          label: 'ADMIN DASHBOARD', tag: 'ADMIN', note: 'Overzicht statistieken en beheer',     external: false, locked: false },
      { path: '/admin/users',    label: 'GEBRUIKERSBEHEER', tag: 'ADMIN', note: 'Gebruikers inzien en modereren',      external: false, locked: false },
      { path: '/admin/posts',    label: 'POSTBEHEER',       tag: 'ADMIN', note: 'Posts beoordelen en verwijderen',     external: false, locked: false },
      { path: '/admin/reports',  label: 'RAPPORTENBEHEER',  tag: 'ADMIN', note: 'Gerapporteerde content afhandelen',   external: false, locked: false },
    ],
  },
  {
    id: 'API',
    count: '8 endpoints',
    items: [
      { path: '/api/posts',                   label: 'GET|POST /api/posts',                  tag: 'REST', note: 'Posts ophalen of aanmaken',                    external: false, locked: false },
      { path: '/api/posts/[id]',              label: 'GET|PATCH|DELETE /api/posts/[id]',     tag: 'REST', note: 'Specifieke post beheren',                      external: false, locked: false },
      { path: '/api/posts/[id]/rate',         label: 'POST /api/posts/[id]/rate',            tag: 'REST', note: 'Post beoordelen',                              external: false, locked: false },
      { path: '/api/posts/[id]/comments',     label: 'GET|POST /api/posts/[id]/comments',   tag: 'REST', note: 'Reacties ophalen of plaatsen',                  external: false, locked: false },
      { path: '/api/posts/[id]/bookmark',     label: 'POST /api/posts/[id]/bookmark',        tag: 'REST', note: 'Post opslaan als bladwijzer',                  external: false, locked: false },
      { path: '/api/posts/[id]/report',       label: 'POST /api/posts/[id]/report',          tag: 'REST', note: 'Post rapporteren',                             external: false, locked: false },
      { path: '/api/users/me',                label: 'GET|PATCH /api/users/me',              tag: 'REST', note: 'Huidig ingelogde gebruiker',                   external: false, locked: false },
      { path: '/api/users/[id]/follow',       label: 'POST /api/users/[id]/follow',          tag: 'REST', note: 'Gebruiker volgen / ontvolgen',                 external: false, locked: false },
      { path: '/api/auth/register',           label: 'POST /api/auth/register',              tag: 'AUTH', note: 'Nieuw account aanmaken',                       external: false, locked: false },
      { path: '/api/upload',                  label: 'POST /api/upload',                     tag: 'MEDIA', note: 'Afbeeldingen uploaden via Cloudinary',         external: false, locked: false },
      { path: '/api/admin/stats',             label: 'GET /api/admin/stats',                 tag: 'ADMIN', note: 'Platformstatistieken voor admins',             external: false, locked: false },
      { path: '/api/admin/posts',             label: 'GET|PATCH /api/admin/posts',           tag: 'ADMIN', note: 'Posts beheren als admin',                     external: false, locked: false },
      { path: '/api/admin/users',             label: 'GET|PATCH /api/admin/users',           tag: 'ADMIN', note: 'Gebruikers beheren als admin',                 external: false, locked: false },
      { path: '/api/admin/reports',           label: 'GET|PATCH /api/admin/reports',         tag: 'ADMIN', note: 'Rapportages afhandelen als admin',             external: false, locked: false },
    ],
  },
]

const STACK = ['NEXT.JS', 'TYPESCRIPT', 'REACT', 'TAILWIND', 'PRISMA', 'POSTGRESQL', 'NODE.JS', 'GIT']

// ─── COMPONENT ───────────────────────────────────────────────────────────────

type LinkItem = typeof SECTIONS[0]['items'][0]

function LinkRow({ item, isApi }: { item: LinkItem; isApi?: boolean }) {
  const inner = (
    <div className="group flex items-start justify-between gap-3 px-3 py-2 hover:bg-green-950/40 transition-colors cursor-pointer border-b border-green-900/20 last:border-0">
      <div className="flex items-baseline gap-2 min-w-0">
        <span className="text-green-800 text-xs shrink-0 select-none">›</span>
        <span className={`text-xs font-bold tracking-wide group-hover:text-green-200 transition-colors truncate ${isApi ? 'text-green-700 font-mono' : 'text-green-300'}`}>
          {item.label}
        </span>
        {item.locked && <span className="text-yellow-600 text-[10px] shrink-0">🔒</span>}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-green-900 text-[10px] hidden sm:block truncate max-w-[200px] text-right">{item.note}</span>
        <span className="text-green-800 text-[10px] border border-green-900/60 px-1.5 py-0.5 shrink-0">{item.tag}</span>
        <span className="text-green-800 group-hover:text-green-500 text-[10px] transition-colors shrink-0">→</span>
      </div>
    </div>
  )

  if (item.path.includes('[')) {
    return <div className="opacity-50 cursor-default">{inner}</div>
  }
  if (item.external) {
    return <a href={item.path} target="_blank" rel="noopener noreferrer">{inner}</a>
  }
  return <Link href={item.path}>{inner}</Link>
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function QuickLinksPage() {
  const total = SECTIONS.reduce((acc, s) => acc + s.items.filter(i => !i.path.includes('[')).length, 0)

  return (
    <>
      <EasterEggs />

      {/* Scanline overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-30 opacity-[0.04]"
        style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, #000 3px, #000 4px)' }}
      />
      {/* CRT vignette */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-20"
        style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)' }}
      />

      <div className="bg-black text-green-400 font-mono min-h-[calc(100vh-3.5rem)] relative z-10 retro-screen">
        <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">

          {/* ── BOOT HEADER ── */}
          <header className="border border-green-900 p-5 space-y-4">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <span className="text-green-600 text-xs tracking-widest">REIN.DEV SYSTEEM v2.0 — QUICK LINKS</span>
              <span className="text-xs">
                <span className="text-green-700">STATUS: </span>
                <span className="text-green-400 animate-pulse">● ONLINE</span>
              </span>
            </div>
            <div className="border-t border-green-900/50 pt-4 space-y-1.5 text-sm">
              <div><span className="text-green-700">C:\REIN&gt; </span><span className="text-green-500">whoami</span></div>
              <div className="text-green-300 pl-4">GEBRUIKER........... REIN</div>
              <div className="text-green-300 pl-4">ROL................. FULL-STACK DEVELOPER</div>
              <div className="text-green-300 pl-4">STATUS............. <span className="text-green-200 font-bold">BESCHIKBAAR VOOR PROJECTEN</span></div>
              <div className="pt-1"><span className="text-green-700">C:\REIN&gt; </span><span className="text-green-500">ls -la --all</span></div>
              <div className="text-green-300 pl-4">TOTAAL.............. <span className="text-green-200 font-bold">{total} LINKS GEVONDEN</span></div>
              <div className="text-green-300 pl-4">SECTIES............. <span className="text-green-200">{SECTIONS.length} MAPPEN</span></div>
              <div className="pt-1">
                <span className="text-green-700">C:\REIN&gt; </span>
                <span className="retro-cursor text-green-500" />
              </div>
            </div>
            <div className="border-t border-green-900/50 pt-4 flex flex-wrap gap-3">
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

          {/* ── SECTIONS ── */}
          {SECTIONS.map(section => (
            <section key={section.id} className="space-y-2">
              <div className="flex items-center gap-3 text-xs text-green-700">
                <span className="tracking-widest">══ {section.id}</span>
                <span className="flex-1 border-t border-green-900/40" />
                <span>{section.count}</span>
              </div>
              <div className="border border-green-900/60">
                {section.items.map(item => (
                  <LinkRow key={item.path + item.label} item={item} isApi={section.id === 'API'} />
                ))}
              </div>
            </section>
          ))}

          {/* ── TECH STACK ── */}
          <section className="space-y-2">
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
              <a href="https://github.com/Rein033" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors">
                GITHUB.COM/REIN033
              </a>
            </div>
            <div className="text-green-900">VOOR NOODGEVALLEN: 0118 999 881 999 119 725 3</div>
            <div className="text-green-900/50 text-[10px] pt-1">
              TIP: OPEN DE BROWSER CONSOLE · PROBEER DE KONAMI CODE ↑↑↓↓←→←→BA
            </div>
          </footer>

        </div>
      </div>
    </>
  )
}
