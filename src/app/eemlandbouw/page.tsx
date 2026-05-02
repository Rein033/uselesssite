import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Eemlandbouw — Concept Website | Portfolio',
  robots: { index: false, follow: false },
}

const DIENSTEN = [
  { id: 'D-001', title: 'AKKERBOUW', tag: 'TEELT', desc: 'Granen, aardappelen, suikerbieten en groentegewassen. Precisiebemesting en IPM-gewasbescherming op 180 ha eigen grond.' },
  { id: 'D-002', title: 'MELKVEEHOUDERIJ', tag: 'VEEHOUDERIJ', desc: 'Weidegang-systeem met Holstein-Friesian melkvee. Focus op dierwelzijn en stabiele jaarproductie.' },
  { id: 'D-003', title: 'LOONWERK', tag: 'DIENSTVERLENING', desc: 'Grondbewerking, zaaien, maaien, schudden, harken en inkuilen voor derden. Modern machinepark.' },
  { id: 'D-004', title: 'RUWVOER & GROENVOER', tag: 'LEVERING', desc: 'Mais, gras en luzernekuil. Gecertificeerde opslag en leveringslogistiek in het Eemland.' },
  { id: 'D-005', title: 'BODEMBEHEER', tag: 'DUURZAAMHEID', desc: 'Non-invasieve grondbewerking, groenbemesters, organische stofverbetering. Kringloopvisie.' },
  { id: 'D-006', title: 'OPSLAG & LOGISTIEK', tag: 'FACILITEITEN', desc: 'Klimaatgecontroleerde aardappel- en graanopslag. Directe afzet aan verwerkende industrie.' },
]

const WERKGEBIED = [
  { plaats: 'AMERSFOORT', rol: 'HOOFDLOCATIE' },
  { plaats: 'SOEST', rol: 'LOONWERK' },
  { plaats: 'BAARN', rol: 'AKKERBOUW' },
  { plaats: 'BUNSCHOTEN', rol: 'MELKVEEHOUDERIJ' },
  { plaats: 'HOEVELAKEN', rol: 'LOONWERK' },
  { plaats: 'NIJKERK', rol: 'OPSLAG & AFZET' },
]

export default function EemlandbouwPage() {
  return (
    <div className="bg-black text-green-400 font-mono min-h-[calc(100vh-3.5rem)] relative">

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

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-10 space-y-8">

        {/* ── PASSWORD GATE ── */}
        <div id="pw-gate" className="space-y-6">
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
            <label className="text-green-600 text-xs tracking-widest block" htmlFor="pw-input">
              TOEGANGSCODE:
            </label>
            <div className="flex gap-2 items-center">
              <span className="text-green-700 text-sm shrink-0">C:\REIN&gt;</span>
              <input
                id="pw-input"
                type="password"
                className="flex-1 bg-transparent border-b border-green-800 focus:border-green-500 text-green-300 text-sm outline-none pb-1 placeholder:text-green-900 transition-colors"
                placeholder="_ _ _ _ _ _"
                autoComplete="current-password"
              />
            </div>
            <p id="pw-error" className="text-red-500 text-xs hidden">TOEGANG GEWEIGERD — ONGELDIG WACHTWOORD</p>
            <button
              id="pw-btn"
              className="border border-green-800 hover:border-green-500 px-6 py-2 text-xs text-green-600 hover:text-green-300 hover:bg-green-950/40 transition-all tracking-widest"
            >
              [ TOEGANG VERKRIJGEN ]
            </button>
          </div>
        </div>

        {/* ── SITE CONTENT (unlocked) ── */}
        <div id="pw-content" className="hidden space-y-8">

          {/* BOOT HEADER */}
          <div className="border border-green-900 p-5 space-y-4">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <span className="text-green-600 text-xs tracking-widest">EEMLANDBOUW B.V. — CONCEPT WEBSITE v1.0</span>
              <span className="text-xs">
                <span className="text-green-700">STATUS: </span>
                <span className="text-green-400 animate-pulse">● CONCEPT</span>
              </span>
            </div>
            <div className="border-t border-green-900/50 pt-4 space-y-1.5 text-sm">
              <div><span className="text-green-700">C:\EEMLANDBOUW&gt; </span><span className="text-green-500">bedrijfsinfo</span></div>
              <div className="text-green-300 pl-4">NAAM................. EEMLANDBOUW B.V.</div>
              <div className="text-green-300 pl-4">TYPE................. AGRARISCH FAMILIEBEDRIJF</div>
              <div className="text-green-300 pl-4">OPGERICHT............ 1989</div>
              <div className="text-green-300 pl-4">LOCATIE.............. AMERSFOORT, EEMLAND</div>
              <div className="text-green-300 pl-4">OPPERVLAKTE.......... <span className="text-green-200 font-bold">180 HECTARE</span></div>
              <div className="text-green-300 pl-4">GENERATIE............ <span className="text-green-200 font-bold">3E GENERATIE</span></div>
              <div className="text-green-300 pl-4">ERVARING............. 35+ JAAR</div>
              <div className="pt-1">
                <span className="text-green-700">C:\EEMLANDBOUW&gt; </span>
                <span className="text-green-500">slogan</span>
              </div>
              <div className="text-green-200 pl-4 font-bold">
                "Agrarisch vakmanschap in het hart van het Eemland."
              </div>
              <div className="pt-1">
                <span className="text-green-700">C:\EEMLANDBOUW&gt; </span>
                <span className="retro-cursor text-green-500" />
              </div>
            </div>
            <div className="border-t border-green-900/50 pt-4 flex flex-wrap gap-3">
              <a href="tel:0334601234" className="text-xs border border-green-800 hover:border-green-500 px-4 py-2 transition-colors hover:bg-green-950/50 hover:text-green-200">
                [ TEL: 033 460 12 34 ]
              </a>
              <a href="mailto:info@eemlandbouw.nl" className="text-xs border border-green-800 hover:border-green-500 px-4 py-2 transition-colors hover:bg-green-950/50 hover:text-green-200 text-green-600">
                [ INFO@EEMLANDBOUW.NL ]
              </a>
            </div>
          </div>

          {/* DIENSTEN */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 text-xs text-green-700">
              <span className="tracking-widest">══ DIENSTEN</span>
              <span className="flex-1 border-t border-green-900/40" />
              <span>{DIENSTEN.length} bestanden</span>
            </div>
            {DIENSTEN.map(d => (
              <div key={d.id} className="group border border-green-900/60 hover:border-green-500/70 p-4 transition-all hover:bg-green-950/30 relative">
                <span className="absolute top-0 left-0 text-green-900 group-hover:text-green-700 transition-colors select-none text-xs leading-none">┌</span>
                <span className="absolute top-0 right-0 text-green-900 group-hover:text-green-700 transition-colors select-none text-xs leading-none">┐</span>
                <span className="absolute bottom-0 left-0 text-green-900 group-hover:text-green-700 transition-colors select-none text-xs leading-none">└</span>
                <span className="absolute bottom-0 right-0 text-green-900 group-hover:text-green-700 transition-colors select-none text-xs leading-none">┘</span>
                <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                  <div className="flex items-center gap-3">
                    <span className="text-green-800 text-xs shrink-0">{d.id}</span>
                    <span className="font-bold text-green-300 group-hover:text-green-200 transition-colors tracking-wide">{d.title}</span>
                  </div>
                  <span className="text-green-700 text-xs shrink-0">[{d.tag}]</span>
                </div>
                <p className="text-green-700 text-xs leading-relaxed pl-0">{d.desc}</p>
              </div>
            ))}
          </section>

          {/* OVER ONS */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 text-xs text-green-700">
              <span className="tracking-widest">══ OVER ONS</span>
              <span className="flex-1 border-t border-green-900/40" />
            </div>
            <div className="border border-green-900/60 p-5 space-y-3">
              <div className="space-y-1.5 text-sm">
                <div><span className="text-green-700">C:\EEMLANDBOUW&gt; </span><span className="text-green-500">cat geschiedenis.txt</span></div>
                <div className="text-green-300 pl-4 text-xs leading-relaxed max-w-prose">
                  Eemlandbouw is in 1989 opgericht door de familie Van den Berg op de rijke klei- en veengronden
                  rondom Amersfoort. Wat begon als een kleinschalig gemengd bedrijf is uitgegroeid tot een
                  professioneel agrarisch bedrijf met 180 hectare eigen grond in het Eemlandse polderlandschap.
                </div>
              </div>
              <div className="border-t border-green-900/40 pt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: 'DUURZAAMHEID', val: 'KRINGLOOPVISIE', sub: 'Gewasresten & mest sluiten de kringloop' },
                  { label: 'SAMENWERKING', val: 'REGIONAAL NETWERK', sub: 'Coöperaties & verwerkende industrie' },
                  { label: 'TECHNOLOGIE', val: 'GPS-GESTUURD', sub: 'Precisielandbouw en modern machinepark' },
                ].map(item => (
                  <div key={item.label} className="border border-green-900/40 p-3 space-y-1">
                    <div className="text-green-700 text-[10px] tracking-widest">{item.label}</div>
                    <div className="text-green-300 text-xs font-bold">{item.val}</div>
                    <div className="text-green-800 text-[10px] leading-relaxed">{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* WERKGEBIED */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 text-xs text-green-700">
              <span className="tracking-widest">══ WERKGEBIED</span>
              <span className="flex-1 border-t border-green-900/40" />
              <span>{WERKGEBIED.length} locaties</span>
            </div>
            <div className="border border-green-900/60 p-4">
              <div className="space-y-1.5 text-sm mb-3">
                <div><span className="text-green-700">C:\EEMLANDBOUW&gt; </span><span className="text-green-500">ls werkgebied/</span></div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {WERKGEBIED.map(w => (
                  <div key={w.plaats} className="border border-green-900/40 hover:border-green-700/60 p-2.5 transition-colors">
                    <div className="text-green-300 text-xs font-bold">{w.plaats}</div>
                    <div className="text-green-800 text-[10px] tracking-wide mt-0.5">{w.rol}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 text-xs text-green-700">
              <span className="tracking-widest">══ CONTACT</span>
              <span className="flex-1 border-t border-green-900/40" />
            </div>
            <div className="border border-green-900/60 p-5 space-y-4">
              <div className="space-y-1.5 text-sm">
                <div><span className="text-green-700">C:\EEMLANDBOUW&gt; </span><span className="text-green-500">cat contact.cfg</span></div>
                <div className="text-green-300 pl-4">ADRES.............. EEMWEG 12, 3817 NE AMERSFOORT</div>
                <div className="text-green-300 pl-4">TELEFOON........... 033 – 460 12 34</div>
                <div className="text-green-300 pl-4">E-MAIL............. INFO@EEMLANDBOUW.NL</div>
                <div className="text-green-300 pl-4">BEREIKBAAR......... MA–VR 07:00–18:00 · ZA 07:00–12:00</div>
              </div>
              <div className="border-t border-green-900/40 pt-4 space-y-3">
                <div className="space-y-1 text-sm">
                  <div><span className="text-green-700">C:\EEMLANDBOUW&gt; </span><span className="text-green-500">stuur --bericht</span></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-green-700 text-[10px] tracking-widest">NAAM:</label>
                    <div className="flex items-center gap-2">
                      <span className="text-green-800 text-xs">&gt;</span>
                      <input id="c-naam" type="text" placeholder="Jan de Vries" className="flex-1 bg-transparent border-b border-green-900 focus:border-green-600 text-green-300 text-xs outline-none pb-1 placeholder:text-green-900 transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-green-700 text-[10px] tracking-widest">E-MAIL:</label>
                    <div className="flex items-center gap-2">
                      <span className="text-green-800 text-xs">&gt;</span>
                      <input id="c-email" type="email" placeholder="jan@voorbeeld.nl" className="flex-1 bg-transparent border-b border-green-900 focus:border-green-600 text-green-300 text-xs outline-none pb-1 placeholder:text-green-900 transition-colors" />
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-green-700 text-[10px] tracking-widest">ONDERWERP:</label>
                  <div className="flex items-center gap-2">
                    <span className="text-green-800 text-xs">&gt;</span>
                    <select id="c-onderwerp" className="flex-1 bg-black border-b border-green-900 focus:border-green-600 text-green-300 text-xs outline-none pb-1 transition-colors">
                      <option value="">Selecteer onderwerp</option>
                      <option>Loonwerk aanvragen</option>
                      <option>Akkerbouwproducten</option>
                      <option>Ruwvoer / groenvoer</option>
                      <option>Samenwerking</option>
                      <option>Overig</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-green-700 text-[10px] tracking-widest">BERICHT:</label>
                  <textarea id="c-bericht" rows={3} placeholder="Uw bericht..." className="w-full bg-transparent border border-green-900 focus:border-green-600 text-green-300 text-xs outline-none p-2 placeholder:text-green-900 resize-none transition-colors" />
                </div>
                <button
                  id="c-btn"
                  className="border border-green-800 hover:border-green-500 px-6 py-2 text-xs text-green-600 hover:text-green-300 hover:bg-green-950/40 transition-all tracking-widest"
                >
                  [ VERSTUUR BERICHT ]
                </button>
                <p className="text-green-900 text-[10px]">* Concept website — berichten worden niet daadwerkelijk verstuurd.</p>
              </div>
            </div>
          </section>

          {/* TECH STACK */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 text-xs text-green-700">
              <span className="tracking-widest">══ TECH STACK</span>
              <span className="flex-1 border-t border-green-900/40" />
            </div>
            <div className="border border-green-900/60 p-4">
              <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-green-800">
                {['HTML', 'CSS', 'JAVASCRIPT', 'RESPONSIVE', 'WACHTWOORDBEVEILIGING'].map((s, i) => (
                  <span key={s}>
                    {i > 0 && <span className="text-green-900 mx-1">·</span>}
                    <span className="hover:text-green-500 transition-colors cursor-default">{s}</span>
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="border-t border-green-900/40 pt-5 space-y-1 text-xs text-green-800">
            <div className="flex justify-between flex-wrap gap-2">
              <span>© 2026 EEMLANDBOUW B.V. — CONCEPT DOOR <a href="/" className="hover:text-green-500 transition-colors">REIN.DEV</a></span>
              <a href="/" className="hover:text-green-500 transition-colors">← TERUG NAAR PORTFOLIO</a>
            </div>
            <div className="text-green-900">EEMWEG 12 · 3817 NE AMERSFOORT · 033 460 12 34</div>
          </footer>

        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
(function(){
  var HASH = "bfd925fa86084bd0300fde7fd05ddd97";
  ${MD5_FN}
  function unlock(){
    var val = document.getElementById('pw-input').value;
    if(md5(val) === HASH){
      document.getElementById('pw-gate').classList.add('hidden');
      document.getElementById('pw-content').classList.remove('hidden');
    } else {
      document.getElementById('pw-error').classList.remove('hidden');
    }
  }
  document.getElementById('pw-btn').addEventListener('click', unlock);
  document.getElementById('pw-input').addEventListener('keydown', function(e){ if(e.key==='Enter') unlock(); });
  document.getElementById('c-btn').addEventListener('click', function(){
    var btn = document.getElementById('c-btn');
    btn.textContent = '[ VERSTUURD ✓ ]';
    btn.style.borderColor = '#4ade80';
    btn.style.color = '#4ade80';
    setTimeout(function(){ btn.textContent = '[ VERSTUUR BERICHT ]'; btn.style.borderColor = ''; btn.style.color = ''; }, 3000);
  });
})();
      `}} />
    </div>
  )
}

const MD5_FN = `function md5(s){function safe_add(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF);}function bit_rol(num,cnt){return(num<<cnt)|(num>>>(32-cnt));}function md5_cmn(q,a,b,x,s,t){return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b);}function md5_ff(a,b,c,d,x,s,t){return md5_cmn((b&c)|((~b)&d),a,b,x,s,t);}function md5_gg(a,b,c,d,x,s,t){return md5_cmn((b&d)|(c&(~d)),a,b,x,s,t);}function md5_hh(a,b,c,d,x,s,t){return md5_cmn(b^c^d,a,b,x,s,t);}function md5_ii(a,b,c,d,x,s,t){return md5_cmn(c^(b|(~d)),a,b,x,s,t);}function md5_blks(s){var nblk=((s.length+8)>>6)+1;var blks=new Array(nblk*16);for(var i=0;i<nblk*16;i++)blks[i]=0;for(var i=0;i<s.length;i++)blks[i>>2]|=s.charCodeAt(i)<<((i%4)*8);blks[s.length>>2]|=0x80<<((s.length%4)*8);blks[nblk*16-2]=s.length*8;return blks;}var x=md5_blks(s);var a=1732584193,b=-271733879,c=-1732584194,d=271733878;for(var i=0;i<x.length;i+=16){var olda=a,oldb=b,oldc=c,oldd=d;a=md5_ff(a,b,c,d,x[i+0],7,-680876936);d=md5_ff(d,a,b,c,x[i+1],12,-389564586);c=md5_ff(c,d,a,b,x[i+2],17,606105819);b=md5_ff(b,c,d,a,x[i+3],22,-1044525330);a=md5_ff(a,b,c,d,x[i+4],7,-176418897);d=md5_ff(d,a,b,c,x[i+5],12,1200080426);c=md5_ff(c,d,a,b,x[i+6],17,-1473231341);b=md5_ff(b,c,d,a,x[i+7],22,-45705983);a=md5_ff(a,b,c,d,x[i+8],7,1770035416);d=md5_ff(d,a,b,c,x[i+9],12,-1958414417);c=md5_ff(c,d,a,b,x[i+10],17,-42063);b=md5_ff(b,c,d,a,x[i+11],22,-1990404162);a=md5_ff(a,b,c,d,x[i+12],7,1804603682);d=md5_ff(d,a,b,c,x[i+13],12,-40341101);c=md5_ff(c,d,a,b,x[i+14],17,-1502002290);b=md5_ff(b,c,d,a,x[i+15],22,1236535329);a=md5_gg(a,b,c,d,x[i+1],5,-165796510);d=md5_gg(d,a,b,c,x[i+6],9,-1069501632);c=md5_gg(c,d,a,b,x[i+11],14,643717713);b=md5_gg(b,c,d,a,x[i+0],20,-373897302);a=md5_gg(a,b,c,d,x[i+5],5,-701558691);d=md5_gg(d,a,b,c,x[i+10],9,38016083);c=md5_gg(c,d,a,b,x[i+15],14,-660478335);b=md5_gg(b,c,d,a,x[i+4],20,-405537848);a=md5_gg(a,b,c,d,x[i+9],5,568446438);d=md5_gg(d,a,b,c,x[i+14],9,-1019803690);c=md5_gg(c,d,a,b,x[i+3],14,-187363961);b=md5_gg(b,c,d,a,x[i+8],20,1163531501);a=md5_gg(a,b,c,d,x[i+13],5,-1444681467);d=md5_gg(d,a,b,c,x[i+2],9,-51403784);c=md5_gg(c,d,a,b,x[i+7],14,1735328473);b=md5_gg(b,c,d,a,x[i+12],20,-1926607734);a=md5_hh(a,b,c,d,x[i+5],4,-378558);d=md5_hh(d,a,b,c,x[i+8],11,-2022574463);c=md5_hh(c,d,a,b,x[i+11],16,1839030562);b=md5_hh(b,c,d,a,x[i+14],23,-35309556);a=md5_hh(a,b,c,d,x[i+1],4,-1530992060);d=md5_hh(d,a,b,c,x[i+4],11,1272893353);c=md5_hh(c,d,a,b,x[i+7],16,-155497632);b=md5_hh(b,c,d,a,x[i+10],23,-1094730640);a=md5_hh(a,b,c,d,x[i+13],4,681279174);d=md5_hh(d,a,b,c,x[i+0],11,-358537222);c=md5_hh(c,d,a,b,x[i+3],16,-722521979);b=md5_hh(b,c,d,a,x[i+6],23,76029189);a=md5_hh(a,b,c,d,x[i+9],4,-640364487);d=md5_hh(d,a,b,c,x[i+12],11,-421815835);c=md5_hh(c,d,a,b,x[i+15],16,530742520);b=md5_hh(b,c,d,a,x[i+2],23,-995338651);a=md5_ii(a,b,c,d,x[i+0],6,-198630844);d=md5_ii(d,a,b,c,x[i+7],10,1126891415);c=md5_ii(c,d,a,b,x[i+14],15,-1416354905);b=md5_ii(b,c,d,a,x[i+5],21,-57434055);a=md5_ii(a,b,c,d,x[i+12],6,1700485571);d=md5_ii(d,a,b,c,x[i+3],10,-1894986606);c=md5_ii(c,d,a,b,x[i+10],15,-1051523);b=md5_ii(b,c,d,a,x[i+1],21,-2054922799);a=md5_ii(a,b,c,d,x[i+8],6,1873313359);d=md5_ii(d,a,b,c,x[i+15],10,-30611744);c=md5_ii(c,d,a,b,x[i+6],15,-1560198380);b=md5_ii(b,c,d,a,x[i+13],21,1309151649);a=md5_ii(a,b,c,d,x[i+4],6,-145523070);d=md5_ii(d,a,b,c,x[i+11],10,-1120210379);c=md5_ii(c,d,a,b,x[i+2],15,718787259);b=md5_ii(b,c,d,a,x[i+9],21,-343485551);a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd);}function rhex(n){var s='',j=0;for(;j<4;j++)s+=('0'+(n>>>(j*8)&0xFF).toString(16)).slice(-2);return s;}return rhex(a)+rhex(b)+rhex(c)+rhex(d);}`
