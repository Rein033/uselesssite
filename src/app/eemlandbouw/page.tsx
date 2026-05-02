import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Eemlandbouw B.V. — Concept Website | Portfolio',
  robots: { index: false, follow: false },
}

const MD5_FN = `function md5(s){function safe_add(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF);}function bit_rol(num,cnt){return(num<<cnt)|(num>>>(32-cnt));}function md5_cmn(q,a,b,x,s,t){return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b);}function md5_ff(a,b,c,d,x,s,t){return md5_cmn((b&c)|((~b)&d),a,b,x,s,t);}function md5_gg(a,b,c,d,x,s,t){return md5_cmn((b&d)|(c&(~d)),a,b,x,s,t);}function md5_hh(a,b,c,d,x,s,t){return md5_cmn(b^c^d,a,b,x,s,t);}function md5_ii(a,b,c,d,x,s,t){return md5_cmn(c^(b|(~d)),a,b,x,s,t);}function md5_blks(s){var nblk=((s.length+8)>>6)+1;var blks=new Array(nblk*16);for(var i=0;i<nblk*16;i++)blks[i]=0;for(var i=0;i<s.length;i++)blks[i>>2]|=s.charCodeAt(i)<<((i%4)*8);blks[s.length>>2]|=0x80<<((s.length%4)*8);blks[nblk*16-2]=s.length*8;return blks;}var x=md5_blks(s);var a=1732584193,b=-271733879,c=-1732584194,d=271733878;for(var i=0;i<x.length;i+=16){var olda=a,oldb=b,oldc=c,oldd=d;a=md5_ff(a,b,c,d,x[i+0],7,-680876936);d=md5_ff(d,a,b,c,x[i+1],12,-389564586);c=md5_ff(c,d,a,b,x[i+2],17,606105819);b=md5_ff(b,c,d,a,x[i+3],22,-1044525330);a=md5_ff(a,b,c,d,x[i+4],7,-176418897);d=md5_ff(d,a,b,c,x[i+5],12,1200080426);c=md5_ff(c,d,a,b,x[i+6],17,-1473231341);b=md5_ff(b,c,d,a,x[i+7],22,-45705983);a=md5_ff(a,b,c,d,x[i+8],7,1770035416);d=md5_ff(d,a,b,c,x[i+9],12,-1958414417);c=md5_ff(c,d,a,b,x[i+10],17,-42063);b=md5_ff(b,c,d,a,x[i+11],22,-1990404162);a=md5_ff(a,b,c,d,x[i+12],7,1804603682);d=md5_ff(d,a,b,c,x[i+13],12,-40341101);c=md5_ff(c,d,a,b,x[i+14],17,-1502002290);b=md5_ff(b,c,d,a,x[i+15],22,1236535329);a=md5_gg(a,b,c,d,x[i+1],5,-165796510);d=md5_gg(d,a,b,c,x[i+6],9,-1069501632);c=md5_gg(c,d,a,b,x[i+11],14,643717713);b=md5_gg(b,c,d,a,x[i+0],20,-373897302);a=md5_gg(a,b,c,d,x[i+5],5,-701558691);d=md5_gg(d,a,b,c,x[i+10],9,38016083);c=md5_gg(c,d,a,b,x[i+15],14,-660478335);b=md5_gg(b,c,d,a,x[i+4],20,-405537848);a=md5_gg(a,b,c,d,x[i+9],5,568446438);d=md5_gg(d,a,b,c,x[i+14],9,-1019803690);c=md5_gg(c,d,a,b,x[i+3],14,-187363961);b=md5_gg(b,c,d,a,x[i+8],20,1163531501);a=md5_gg(a,b,c,d,x[i+13],5,-1444681467);d=md5_gg(d,a,b,c,x[i+2],9,-51403784);c=md5_gg(c,d,a,b,x[i+7],14,1735328473);b=md5_gg(b,c,d,a,x[i+12],20,-1926607734);a=md5_hh(a,b,c,d,x[i+5],4,-378558);d=md5_hh(d,a,b,c,x[i+8],11,-2022574463);c=md5_hh(c,d,a,b,x[i+11],16,1839030562);b=md5_hh(b,c,d,a,x[i+14],23,-35309556);a=md5_hh(a,b,c,d,x[i+1],4,-1530992060);d=md5_hh(d,a,b,c,x[i+4],11,1272893353);c=md5_hh(c,d,a,b,x[i+7],16,-155497632);b=md5_hh(b,c,d,a,x[i+10],23,-1094730640);a=md5_hh(a,b,c,d,x[i+13],4,681279174);d=md5_hh(d,a,b,c,x[i+0],11,-358537222);c=md5_hh(c,d,a,b,x[i+3],16,-722521979);b=md5_hh(b,c,d,a,x[i+6],23,76029189);a=md5_hh(a,b,c,d,x[i+9],4,-640364487);d=md5_hh(d,a,b,c,x[i+12],11,-421815835);c=md5_hh(c,d,a,b,x[i+15],16,530742520);b=md5_hh(b,c,d,a,x[i+2],23,-995338651);a=md5_ii(a,b,c,d,x[i+0],6,-198630844);d=md5_ii(d,a,b,c,x[i+7],10,1126891415);c=md5_ii(c,d,a,b,x[i+14],15,-1416354905);b=md5_ii(b,c,d,a,x[i+5],21,-57434055);a=md5_ii(a,b,c,d,x[i+12],6,1700485571);d=md5_ii(d,a,b,c,x[i+3],10,-1894986606);c=md5_ii(c,d,a,b,x[i+10],15,-1051523);b=md5_ii(b,c,d,a,x[i+1],21,-2054922799);a=md5_ii(a,b,c,d,x[i+8],6,1873313359);d=md5_ii(d,a,b,c,x[i+15],10,-30611744);c=md5_ii(c,d,a,b,x[i+6],15,-1560198380);b=md5_ii(b,c,d,a,x[i+13],21,1309151649);a=md5_ii(a,b,c,d,x[i+4],6,-145523070);d=md5_ii(d,a,b,c,x[i+11],10,-1120210379);c=md5_ii(c,d,a,b,x[i+2],15,718787259);b=md5_ii(b,c,d,a,x[i+9],21,-343485551);a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd);}function rhex(n){var s='',j=0;for(;j<4;j++)s+=('0'+(n>>>(j*8)&0xFF).toString(16)).slice(-2);return s;}return rhex(a)+rhex(b)+rhex(c)+rhex(d);}`

export default function EemlandbouwPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        #eb-site { display: none; }
        #eb-site * { box-sizing: border-box; }

        /* ── VARS ── */
        #eb-site {
          --blue:      #3A9BD4;
          --blue-dark: #1E6FA8;
          --blue-900:  #1A4F7A;
          --white:     #ffffff;
          --gray-50:   #F8F9FA;
          --gray-100:  #F0F2F4;
          --gray-300:  #CBD2DA;
          --gray-500:  #6B7A8D;
          --gray-900:  #1A202C;
          --shadow:    0 4px 24px rgba(0,0,0,.10);
          --shadow-lg: 0 12px 48px rgba(0,0,0,.15);
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
          color: var(--gray-900);
          line-height: 1.6;
        }

        /* ── NAV ── */
        #eb-nav {
          position: sticky; top: 0; z-index: 100;
          background: var(--white);
          border-bottom: 1px solid var(--gray-100);
          box-shadow: 0 2px 8px rgba(0,0,0,.06);
        }
        .eb-nav-inner {
          max-width: 1100px; margin: 0 auto; padding: 0 1.5rem;
          height: 70px; display: flex; align-items: center; justify-content: space-between;
        }
        .eb-logo { display: flex; align-items: center; gap: .75rem; text-decoration: none; }
        .eb-logo-hex {
          width: 44px; height: 44px; position: relative;
          background: linear-gradient(135deg, #5DC0E8 0%, #3A9BD4 50%, #1E6FA8 100%);
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        .eb-logo-text { font-size: .7rem; font-weight: 800; letter-spacing: .15em; color: var(--blue-900); text-transform: uppercase; }
        .eb-nav-links { display: flex; gap: .25rem; }
        .eb-nav-links a {
          padding: .5rem .9rem; border-radius: .4rem; font-size: .88rem;
          color: var(--gray-500); text-decoration: none; transition: background .2s, color .2s;
        }
        .eb-nav-links a:hover { background: var(--gray-100); color: var(--blue); }
        .eb-nav-cta {
          padding: .55rem 1.25rem; background: var(--blue); color: var(--white) !important;
          border-radius: .5rem; font-weight: 600; font-size: .88rem;
          text-decoration: none; transition: background .2s;
        }
        .eb-nav-cta:hover { background: var(--blue-dark) !important; color: var(--white) !important; }
        @media (max-width: 768px) { .eb-nav-links { display: none; } }

        /* ── HERO ── */
        #eb-hero {
          background: linear-gradient(160deg, var(--blue-900) 0%, var(--blue-dark) 40%, var(--blue) 100%);
          padding: 5rem 1.5rem 4.5rem; position: relative; overflow: hidden;
        }
        #eb-hero::before {
          content: ''; position: absolute; inset: 0; opacity: .06;
          background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40' fill='%23fff'/%3E%3C/svg%3E");
        }
        .eb-hero-inner { max-width: 1100px; margin: 0 auto; position: relative; }
        .eb-hero-badge {
          display: inline-flex; align-items: center; gap: .5rem;
          background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.2);
          border-radius: 2rem; padding: .3rem .9rem; font-size: .75rem;
          color: rgba(255,255,255,.85); margin-bottom: 1.5rem; letter-spacing: .04em;
        }
        .eb-hero h1 {
          font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 800;
          color: var(--white); letter-spacing: .02em; margin-bottom: .75rem;
          text-transform: uppercase; line-height: 1.1;
        }
        .eb-hero-sub {
          font-size: 1.15rem; color: rgba(255,255,255,.85);
          max-width: 560px; margin-bottom: 1rem; font-weight: 500;
        }
        .eb-hero-body {
          font-size: .92rem; color: rgba(255,255,255,.7);
          max-width: 520px; margin-bottom: 2.5rem; line-height: 1.7;
        }
        .eb-hero-btns { display: flex; flex-direction: column; gap: .75rem; max-width: 320px; }
        .eb-btn-outline {
          display: block; padding: .85rem 1.5rem; text-align: center;
          border: 1.5px solid rgba(255,255,255,.6); border-radius: .5rem;
          color: var(--white); font-size: .9rem; text-decoration: none;
          transition: background .2s, border-color .2s;
        }
        .eb-btn-outline:hover { background: rgba(255,255,255,.1); border-color: var(--white); }
        .eb-btn-solid {
          display: block; padding: .85rem 1.5rem; text-align: center;
          background: var(--blue); border: none; border-radius: .5rem;
          color: var(--white); font-size: .9rem; font-weight: 600;
          text-decoration: none; transition: background .2s; cursor: pointer;
        }
        .eb-btn-solid:hover { background: var(--blue-dark); }

        /* ── SECTIONS ── */
        .eb-section { padding: 5rem 1.5rem; }
        .eb-section-inner { max-width: 1100px; margin: 0 auto; }
        .eb-label { font-size: .72rem; font-weight: 700; letter-spacing: .15em; text-transform: uppercase; color: var(--blue); margin-bottom: .5rem; }
        .eb-title { font-size: clamp(1.6rem, 3vw, 2.25rem); font-weight: 800; color: var(--gray-900); margin-bottom: 1rem; line-height: 1.2; }
        .eb-divider { width: 48px; height: 3px; background: var(--blue); border-radius: 2px; margin: .75rem 0 1.25rem; }
        .eb-lead { color: var(--gray-500); font-size: .95rem; max-width: 560px; line-height: 1.7; }

        /* ── DIENSTEN ── */
        #eb-diensten { background: var(--white); }
        .eb-diensten-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; margin-top: 3rem; }
        .eb-dienst-card {
          border: 1.5px solid var(--gray-100); border-radius: 1rem; padding: 2rem;
          transition: box-shadow .2s, border-color .2s, transform .2s;
        }
        .eb-dienst-card:hover { box-shadow: var(--shadow-lg); border-color: var(--blue); transform: translateY(-2px); }
        .eb-dienst-icon {
          width: 52px; height: 52px; background: linear-gradient(135deg, #5DC0E8, var(--blue));
          border-radius: .75rem; display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem; margin-bottom: 1.25rem;
        }
        .eb-dienst-title { font-size: 1.05rem; font-weight: 700; color: var(--gray-900); margin-bottom: .5rem; }
        .eb-dienst-desc { font-size: .88rem; color: var(--gray-500); line-height: 1.65; }

        /* ── WERKWIJZE ── */
        #eb-werkwijze { background: var(--gray-50); }
        .eb-stappen { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.25rem; margin-top: 3rem; }
        .eb-stap {
          background: var(--white); border-radius: .75rem; padding: 1.75rem;
          border-top: 3px solid var(--blue); box-shadow: var(--shadow);
        }
        .eb-stap-num { font-size: 2rem; font-weight: 900; color: var(--blue); opacity: .2; margin-bottom: .25rem; line-height: 1; }
        .eb-stap-title { font-size: .95rem; font-weight: 700; color: var(--gray-900); margin-bottom: .4rem; }
        .eb-stap-desc { font-size: .82rem; color: var(--gray-500); line-height: 1.6; }

        /* ── WAAROM ── */
        #eb-waarom { background: var(--blue-900); }
        #eb-waarom .eb-title, #eb-waarom .eb-label { color: var(--white); }
        #eb-waarom .eb-lead { color: rgba(255,255,255,.7); }
        #eb-waarom .eb-divider { background: rgba(255,255,255,.4); }
        .eb-waarom-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.25rem; margin-top: 3rem; }
        .eb-waarom-item { background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12); border-radius: .75rem; padding: 1.5rem; }
        .eb-waarom-icon { font-size: 1.5rem; margin-bottom: .75rem; }
        .eb-waarom-title { font-size: .92rem; font-weight: 700; color: var(--white); margin-bottom: .35rem; }
        .eb-waarom-desc { font-size: .82rem; color: rgba(255,255,255,.6); line-height: 1.6; }

        /* ── CONTACT ── */
        #eb-contact { background: var(--white); }
        .eb-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-top: 3rem; align-items: start; }
        @media (max-width: 768px) { .eb-contact-grid { grid-template-columns: 1fr; } }
        .eb-contact-items { display: flex; flex-direction: column; gap: 1.25rem; }
        .eb-contact-item { display: flex; gap: .9rem; align-items: flex-start; }
        .eb-contact-icon {
          width: 42px; height: 42px; background: linear-gradient(135deg, #5DC0E8, var(--blue));
          border-radius: .6rem; display: flex; align-items: center; justify-content: center;
          font-size: 1rem; flex-shrink: 0;
        }
        .eb-contact-label { font-size: .72rem; text-transform: uppercase; letter-spacing: .07em; color: var(--gray-500); margin-bottom: .15rem; }
        .eb-contact-val { font-size: .9rem; font-weight: 600; color: var(--gray-900); }
        .eb-form { display: flex; flex-direction: column; gap: .9rem; }
        .eb-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: .9rem; }
        @media (max-width: 540px) { .eb-form-row { grid-template-columns: 1fr; } }
        .eb-field { display: flex; flex-direction: column; gap: .3rem; }
        .eb-field label { font-size: .78rem; font-weight: 600; color: var(--gray-900); }
        .eb-field input, .eb-field textarea, .eb-field select {
          padding: .65rem .9rem; border: 1.5px solid var(--gray-300); border-radius: .5rem;
          font-size: .88rem; font-family: inherit; background: var(--white); color: var(--gray-900);
          outline: none; transition: border-color .2s;
        }
        .eb-field input:focus, .eb-field textarea:focus, .eb-field select:focus { border-color: var(--blue); }
        .eb-field textarea { resize: vertical; min-height: 110px; }
        .eb-form-note { font-size: .72rem; color: var(--gray-500); margin-top: .25rem; }

        /* ── FOOTER ── */
        #eb-footer { background: var(--blue-900); color: rgba(255,255,255,.7); padding: 3rem 1.5rem 1.5rem; }
        .eb-footer-inner { max-width: 1100px; margin: 0 auto; }
        .eb-footer-top { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 2rem; margin-bottom: 2rem; }
        .eb-footer-brand p { font-size: .82rem; color: rgba(255,255,255,.45); margin-top: .5rem; max-width: 260px; line-height: 1.6; }
        .eb-footer-brand .eb-logo-text { color: rgba(255,255,255,.7); }
        .eb-footer-col h4 { font-size: .72rem; text-transform: uppercase; letter-spacing: .1em; color: rgba(255,255,255,.35); margin-bottom: .75rem; }
        .eb-footer-col a { display: block; font-size: .85rem; color: rgba(255,255,255,.55); margin-bottom: .4rem; text-decoration: none; transition: color .2s; }
        .eb-footer-col a:hover { color: var(--blue); }
        .eb-footer-bottom { border-top: 1px solid rgba(255,255,255,.08); padding-top: 1.25rem; display: flex; flex-wrap: wrap; justify-content: space-between; gap: .5rem; font-size: .75rem; color: rgba(255,255,255,.25); }
        .eb-footer-bottom a { color: rgba(255,255,255,.4); text-decoration: none; }
        .eb-footer-bottom a:hover { color: var(--blue); }
      `}} />

      {/* ── PASSWORD GATE (retro terminal stijl) ── */}
      <div id="pw-gate" className="bg-black text-green-400 font-mono min-h-[calc(100vh-3.5rem)] relative">
        <div aria-hidden className="pointer-events-none fixed inset-0 z-30 opacity-[0.04]" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, #000 3px, #000 4px)' }} />
        <div aria-hidden className="pointer-events-none fixed inset-0 z-20" style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 py-10 space-y-6">
          <div className="border border-green-900 p-5 space-y-4">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <span className="text-green-600 text-xs tracking-widest">REIN.DEV PORTFOLIO — CONCEPT PROJECT</span>
              <span className="text-xs text-green-700">STATUS: <span className="text-yellow-500 animate-pulse">● BEVEILIGD</span></span>
            </div>
            <div className="border-t border-green-900/50 pt-4 space-y-1.5 text-sm">
              <div><span className="text-green-700">C:\REIN\PROJECTEN&gt; </span><span className="text-green-500">open eemlandbouw.prj</span></div>
              <div className="text-green-300 pl-4">BESTAND............. eemlandbouw.prj</div>
              <div className="text-green-300 pl-4">TYPE............... CONCEPT WEBSITE</div>
              <div className="text-green-300 pl-4">OPDRACHTGEVER...... EEMLANDBOUW B.V.</div>
              <div className="text-green-300 pl-4">BEVEILIGING........ <span className="text-yellow-400 font-bold">WACHTWOORD VEREIST</span></div>
              <div className="pt-2"><span className="text-green-700">C:\REIN\PROJECTEN&gt; </span><span className="text-green-500">authenticate</span></div>
            </div>
          </div>
          <div className="border border-green-900 p-5 space-y-4">
            <label className="text-green-600 text-xs tracking-widest block" htmlFor="pw-input">TOEGANGSCODE:</label>
            <div className="flex gap-2 items-center">
              <span className="text-green-700 text-sm shrink-0">C:\REIN&gt;</span>
              <input id="pw-input" type="password" className="flex-1 bg-transparent border-b border-green-800 focus:border-green-500 text-green-300 text-sm outline-none pb-1 placeholder:text-green-900 transition-colors" placeholder="_ _ _ _ _ _" autoComplete="current-password" />
            </div>
            <p id="pw-error" className="text-red-500 text-xs hidden">TOEGANG GEWEIGERD — ONGELDIG WACHTWOORD</p>
            <button id="pw-btn" className="border border-green-800 hover:border-green-500 px-6 py-2 text-xs text-green-600 hover:text-green-300 hover:bg-green-950/40 transition-all tracking-widest">
              [ TOEGANG VERKRIJGEN ]
            </button>
          </div>
        </div>
      </div>

      {/* ── EEMLANDBOUW WEBSITE ── */}
      <div id="eb-site">

        {/* NAV */}
        <nav id="eb-nav">
          <div className="eb-nav-inner">
            <a href="#" className="eb-logo">
              <div className="eb-logo-hex" />
              <span className="eb-logo-text">Eemlandbouw</span>
            </a>
            <div className="eb-nav-links">
              <a href="#eb-diensten">Diensten</a>
              <a href="#eb-werkwijze">Werkwijze</a>
              <a href="#eb-waarom">Over ons</a>
              <a href="#eb-contact" className="eb-nav-cta">Contact</a>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section id="eb-hero">
          <div className="eb-hero-inner">
            <div className="eb-hero-badge">
              <span>🏗️</span> Bouwbedrijf in Hoogland, Amersfoort
            </div>
            <h1>Bouwen is<br />vertrouwen</h1>
            <p className="eb-hero-sub">Uw partner voor nieuwbouw, verbouw, renovatie en projectbegeleiding</p>
            <p className="eb-hero-body">
              Wij realiseren nieuwbouw, verbouwingen en renovaties voor zakelijke en particuliere opdrachtgevers.
              Altijd met dezelfde insteek: vanuit vertrouwen samenwerken vanaf het begin.
            </p>
            <div className="eb-hero-btns">
              <a href="#eb-diensten" className="eb-btn-outline">Samen dromen</a>
              <a href="#eb-werkwijze" className="eb-btn-outline">Samen voorbereiden</a>
              <a href="#eb-contact" className="eb-btn-outline">Samen realiseren</a>
              <a href="#eb-diensten" className="eb-btn-solid">Projecten bekijken</a>
            </div>
          </div>
        </section>

        {/* DIENSTEN */}
        <section id="eb-diensten" className="eb-section">
          <div className="eb-section-inner">
            <p className="eb-label">Wat wij doen</p>
            <h2 className="eb-title">Onze diensten</h2>
            <div className="eb-divider" />
            <p className="eb-lead">Van nieuwbouw tot renovatie — Eemlandbouw levert vakkundig bouwwerk voor zowel particulieren als zakelijke opdrachtgevers.</p>
            <div className="eb-diensten-grid">
              <div className="eb-dienst-card">
                <div className="eb-dienst-icon">🏗️</div>
                <div className="eb-dienst-title">Nieuwbouw</div>
                <p className="eb-dienst-desc">Bedrijfshallen, kantoren, utiliteitsgebouwen en villa's. Van eerste schop tot sleuteloverdracht — wij realiseren nieuwbouwprojecten van A tot Z met oog voor kwaliteit en planning.</p>
              </div>
              <div className="eb-dienst-card">
                <div className="eb-dienst-icon">🔨</div>
                <div className="eb-dienst-title">Verbouwingen & renovaties</div>
                <p className="eb-dienst-desc">Aanbouwen, opbouwen, transformaties en opsplitsingen voor particulieren. Uw woning of pand naar wens verbouwen — wij denken mee en leveren maatwerk.</p>
              </div>
              <div className="eb-dienst-card">
                <div className="eb-dienst-icon">🤝</div>
                <div className="eb-dienst-title">Zakelijke bouw & partnerships</div>
                <p className="eb-dienst-desc">Voor projectontwikkelaars, vastgoedeigenaren en ondernemers. Onderhoud en renovatie van vastgoed met een betrouwbare bouwpartner die meedenkt.</p>
              </div>
            </div>
          </div>
        </section>

        {/* WERKWIJZE */}
        <section id="eb-werkwijze" className="eb-section">
          <div className="eb-section-inner">
            <p className="eb-label">Hoe wij werken</p>
            <h2 className="eb-title">Zo werken wij</h2>
            <div className="eb-divider" />
            <p className="eb-lead">Samenwerking bij Eemlandbouw start al in de voorbereidingsfase. Transparant, betrokken en met duidelijke afspraken.</p>
            <div className="eb-stappen">
              {[
                { n: '01', t: 'Samen dromen', d: 'Uw wensen en ideeën worden vertaald naar een concreet plan. Wij luisteren, denken mee en geven eerlijk advies.' },
                { n: '02', t: 'Samen voorbereiden', d: 'Duidelijke afspraken over planning, budget en uitvoering. Geen verrassingen achteraf — transparantie staat centraal.' },
                { n: '03', t: 'Samen realiseren', d: 'Hands-on uitvoering door ervaren vakmensen. U bent betrokken van begin tot eind van het project.' },
                { n: '04', t: 'Oplevering', d: 'Nette oplevering met sleuteloverdracht en nazorg. Uw tevredenheid is ons eindresultaat.' },
              ].map(s => (
                <div key={s.n} className="eb-stap">
                  <div className="eb-stap-num">{s.n}</div>
                  <div className="eb-stap-title">{s.t}</div>
                  <p className="eb-stap-desc">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WAAROM */}
        <section id="eb-waarom" className="eb-section">
          <div className="eb-section-inner">
            <p className="eb-label">Waarom kiezen voor ons</p>
            <h2 className="eb-title">Waarom Eemlandbouw anders is</h2>
            <div className="eb-divider" />
            <p className="eb-lead">Wij zijn geen anoniem bouwbedrijf. Wij zijn uw bouwpartner — betrokken, eerlijk en vakkundig.</p>
            <div className="eb-waarom-grid">
              {[
                { icon: '⭐', t: 'Professioneel', d: 'Vakkundig uitgevoerd met oog voor detail, kwaliteit en veiligheid op de bouwplaats.' },
                { icon: '💡', t: 'Meedenkend', d: 'Wij denken actief mee in de voorbereiding en uitvoering. Uw belang staat voorop.' },
                { icon: '🙌', t: 'Hands-on', d: 'Direct contact, korte lijnen en persoonlijke betrokkenheid bij elk project.' },
                { icon: '🎯', t: 'Maatwerk', d: 'Elke situatie is anders. Wij leveren oplossingen die passen bij uw project en budget.' },
              ].map(w => (
                <div key={w.t} className="eb-waarom-item">
                  <div className="eb-waarom-icon">{w.icon}</div>
                  <div className="eb-waarom-title">{w.t}</div>
                  <p className="eb-waarom-desc">{w.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="eb-contact" className="eb-section">
          <div className="eb-section-inner">
            <p className="eb-label">Neem contact op</p>
            <h2 className="eb-title">Vraag een offerte aan</h2>
            <div className="eb-divider" />
            <p className="eb-lead">Heeft u een bouwproject? Neem contact op voor een vrijblijvend gesprek en offerte.</p>
            <div className="eb-contact-grid">
              <div className="eb-contact-items">
                {[
                  { icon: '📍', label: 'Adres', val: 'Mgr. van de Weteringstraat 70\n3828 PH Hoogland' },
                  { icon: '📞', label: 'Telefoon', val: '033-2023255' },
                  { icon: '✉️', label: 'E-mail', val: 'info@eemlandbouw.nl' },
                  { icon: '🏛️', label: 'KVK', val: '94381100' },
                ].map(c => (
                  <div key={c.label} className="eb-contact-item">
                    <div className="eb-contact-icon">{c.icon}</div>
                    <div>
                      <div className="eb-contact-label">{c.label}</div>
                      <div className="eb-contact-val" style={{ whiteSpace: 'pre-line' }}>{c.val}</div>
                    </div>
                  </div>
                ))}
              </div>
              <form className="eb-form" onSubmit="return false">
                <div className="eb-form-row">
                  <div className="eb-field"><label>Naam</label><input type="text" placeholder="Jan de Vries" /></div>
                  <div className="eb-field"><label>E-mail</label><input type="email" placeholder="jan@voorbeeld.nl" /></div>
                </div>
                <div className="eb-field">
                  <label>Type project</label>
                  <select>
                    <option value="">Selecteer type</option>
                    <option>Nieuwbouw</option>
                    <option>Verbouwing / Renovatie</option>
                    <option>Zakelijke bouw &amp; partnership</option>
                    <option>Overig</option>
                  </select>
                </div>
                <div className="eb-field"><label>Bericht</label><textarea placeholder="Beschrijf uw project..." /></div>
                <button type="button" id="c-btn" className="eb-btn-solid" style={{ border: 'none', cursor: 'pointer' }}>Aanvraag versturen →</button>
                <p className="eb-form-note">* Concept website — berichten worden niet daadwerkelijk verstuurd.</p>
              </form>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer id="eb-footer">
          <div className="eb-footer-inner">
            <div className="eb-footer-top">
              <div className="eb-footer-brand">
                <div className="eb-logo">
                  <div className="eb-logo-hex" style={{ width: 36, height: 36 }} />
                  <span className="eb-logo-text">Eemlandbouw</span>
                </div>
                <p>Uw betrouwbare bouwpartner in Hoogland. Nieuwbouw, verbouwingen en renovaties voor particulieren en bedrijven.</p>
              </div>
              <div className="eb-footer-col">
                <h4>Diensten</h4>
                <a href="#eb-diensten">Nieuwbouw</a>
                <a href="#eb-diensten">Verbouwingen</a>
                <a href="#eb-diensten">Zakelijke bouw</a>
              </div>
              <div className="eb-footer-col">
                <h4>Contact</h4>
                <a href="tel:0332023255">033-2023255</a>
                <a href="mailto:info@eemlandbouw.nl">info@eemlandbouw.nl</a>
                <a href="#eb-contact">Offerte aanvragen</a>
              </div>
            </div>
            <div className="eb-footer-bottom">
              <span>© 2026 Eemlandbouw B.V. · KVK 94381100 · Hoogland</span>
              <span>Concept door <a href="/">REIN.DEV</a></span>
            </div>
          </div>
        </footer>

      </div>{/* /eb-site */}

      <script dangerouslySetInnerHTML={{ __html: `
(function(){
  var HASH = "bfd925fa86084bd0300fde7fd05ddd97";
  ${MD5_FN}
  function unlock(){
    var val = document.getElementById('pw-input').value;
    if(md5(val) === HASH){
      document.getElementById('pw-gate').style.display = 'none';
      document.getElementById('eb-site').style.display = 'block';
    } else {
      document.getElementById('pw-error').classList.remove('hidden');
    }
  }
  document.getElementById('pw-btn').addEventListener('click', unlock);
  document.getElementById('pw-input').addEventListener('keydown', function(e){ if(e.key==='Enter') unlock(); });
  document.getElementById('c-btn').addEventListener('click', function(){
    this.textContent = 'Verstuurd ✓';
    this.style.background = '#1E6FA8';
    var self = this;
    setTimeout(function(){ self.textContent = 'Aanvraag versturen →'; self.style.background = ''; }, 3000);
  });
})();
      `}} />
    </>
  )
}
