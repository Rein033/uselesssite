import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'E-mail Handtekening Generator | UselessSite' }

export default function SignaturePage() {
  const js = `
(function(){
  var state={name:'Jan de Vries',title:'IT Specialist',dept:'ICT Afdeling',company:'Bedrijf B.V.',phone:'+31 20 123 4567',mobile:'',website:'',address:'',photo:'',color:'#6366f1',theme:'modern'};

  function esc(s){return(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

  function buildHtml(){
    var s=state;
    var imgHtml=s.photo?'<img src="'+esc(s.photo)+'" width="80" height="80" style="border-radius:50%;object-fit:cover;display:block;" alt="'+esc(s.name)+'">':'';
    if(s.theme==='modern'){
      return '<table cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;font-size:13px;color:#333;">'+
        '<tr>'+(imgHtml?'<td style="padding-right:16px;vertical-align:top;">'+imgHtml+'</td>':'')+'<td style="vertical-align:top;border-left:3px solid '+esc(s.color)+';padding-left:12px;">'+
        '<div style="font-weight:bold;font-size:15px;color:'+esc(s.color)+'">'+esc(s.name)+'</div>'+
        (s.title?'<div style="color:#555;font-size:12px;">'+esc(s.title)+(s.dept?' | '+esc(s.dept):'')+'</div>':'')+
        (s.company?'<div style="font-weight:500;margin-top:4px;">'+esc(s.company)+'</div>':'')+
        (s.phone?'<div style="color:#555;font-size:12px;margin-top:4px;">📞 '+esc(s.phone)+'</div>':'')+
        (s.mobile?'<div style="color:#555;font-size:12px;">📱 '+esc(s.mobile)+'</div>':'')+
        (s.website?'<div style="font-size:12px;margin-top:2px;"><a href="'+esc(s.website)+'" style="color:'+esc(s.color)+';">'+esc(s.website)+'</a></div>':'')+
        (s.address?'<div style="color:#555;font-size:12px;margin-top:2px;">📍 '+esc(s.address)+'</div>':'')+
        '</td></tr></table>';
    }
    if(s.theme==='classic'){
      return '<table cellpadding="0" cellspacing="0" style="font-family:Georgia,serif;font-size:13px;color:#333;border-top:2px solid '+esc(s.color)+';padding-top:8px;">'+
        '<tr>'+(imgHtml?'<td style="padding-right:16px;vertical-align:top;">'+imgHtml+'</td>':'')+'<td style="vertical-align:top;">'+
        '<div style="font-weight:bold;font-size:16px;">'+esc(s.name)+'</div>'+
        (s.title?'<div style="font-style:italic;color:#666;">'+esc(s.title)+(s.dept?', '+esc(s.dept):'')+'</div>':'')+
        (s.company?'<div style="margin-top:3px;color:#444;">'+esc(s.company)+'</div>':'')+
        (s.phone?'<div style="margin-top:4px;color:#555;font-size:12px;">T: '+esc(s.phone)+'</div>':'')+
        (s.mobile?'<div style="color:#555;font-size:12px;">M: '+esc(s.mobile)+'</div>':'')+
        (s.website?'<div style="font-size:12px;"><a href="'+esc(s.website)+'" style="color:'+esc(s.color)+';">'+esc(s.website)+'</a></div>':'')+
        (s.address?'<div style="color:#555;font-size:12px;">'+esc(s.address)+'</div>':'')+
        '</td></tr></table>';
    }
    // minimal
    return '<div style="font-family:Arial,sans-serif;font-size:13px;color:#333;">'+
      '<div style="font-weight:bold;color:'+esc(s.color)+'">'+esc(s.name)+(s.title?' — <span style=\\"color:#555;font-weight:normal;\\">'+esc(s.title)+'</span>':'')+'</div>'+
      (s.company?'<div style="color:#666;font-size:12px;">'+esc(s.company)+'</div>':'')+
      '<div style="color:#555;font-size:12px;margin-top:2px;">'+
      [s.phone&&('📞 '+s.phone),s.mobile&&('📱 '+s.mobile),s.website&&('<a href="'+esc(s.website)+'" style="color:'+esc(s.color)+';">'+esc(s.website)+'</a>')].filter(Boolean).join(' · ')+
      '</div></div>';
  }

  function render(){
    var html=buildHtml();
    document.getElementById('sig-preview').innerHTML=html;
    document.getElementById('sig-code').textContent=html;
  }

  var fields=['name','title','dept','company','phone','mobile','website','address','photo'];
  fields.forEach(function(f){
    var el=document.getElementById('sig-'+f);
    if(el) el.addEventListener('input',function(){state[f]=this.value;render();});
  });
  document.getElementById('sig-color').addEventListener('input',function(){state.color=this.value;render();});
  ['modern','classic','minimal'].forEach(function(t){
    document.getElementById('sig-theme-'+t).addEventListener('click',function(){
      state.theme=t;
      ['modern','classic','minimal'].forEach(function(x){
        var btn=document.getElementById('sig-theme-'+x);
        btn.className='px-3 py-1.5 rounded-lg text-sm font-medium transition-all '+(x===t?'bg-primary text-primary-foreground':'bg-secondary text-muted-foreground hover:text-foreground');
      });
      render();
    });
  });

  document.getElementById('sig-copy').addEventListener('click',function(){
    var btn=this;
    var preview=document.getElementById('sig-preview');
    var range=document.createRange();
    range.selectNodeContents(preview);
    var sel=window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    try{document.execCommand('copy');btn.textContent='✓ Gekopieerd voor Outlook!';}
    catch(e){navigator.clipboard.writeText(buildHtml()).then(function(){btn.textContent='✓ HTML gekopieerd!';});}
    sel.removeAllRanges();
    setTimeout(function(){btn.textContent='Kopieer voor Outlook';},2500);
  });

  document.getElementById('sig-copy-html').addEventListener('click',function(){
    var btn=this;
    navigator.clipboard.writeText(buildHtml()).then(function(){
      btn.textContent='✓ Gekopieerd!';
      setTimeout(function(){btn.textContent='Kopieer HTML';},2000);
    });
  });

  render();
})();
`

  const inputClass = "w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors"

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      <div>
        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Tool</p>
        <h1 className="text-3xl font-black mb-1">E-mail Handtekening Generator</h1>
        <p className="text-muted-foreground">Maak een professionele handtekening. Klaar voor Outlook en andere e-mailclients.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <h2 className="font-semibold">Gegevens</h2>
            {[
              {id:'name',     label:'Naam',          placeholder:'Jan de Vries'},
              {id:'title',    label:'Functie',        placeholder:'IT Specialist'},
              {id:'dept',     label:'Afdeling',       placeholder:'ICT Afdeling'},
              {id:'company',  label:'Bedrijf',        placeholder:'Bedrijf B.V.'},
              {id:'phone',    label:'Telefoon',       placeholder:'+31 20 123 4567'},
              {id:'mobile',   label:'Mobiel',         placeholder:'+31 6 12345678'},
              {id:'website',  label:'Website',        placeholder:'https://bedrijf.nl'},
              {id:'address',  label:'Adres',          placeholder:'Straat 1, Amsterdam'},
              {id:'photo',    label:'Foto URL',       placeholder:'https://...foto.jpg'},
            ].map(f => (
              <div key={f.id}>
                <label className="text-xs text-muted-foreground mb-1 block">{f.label}</label>
                <input id={`sig-${f.id}`} defaultValue={f.id==='name'?'Jan de Vries':f.id==='title'?'IT Specialist':f.id==='dept'?'ICT Afdeling':f.id==='company'?'Bedrijf B.V.':f.id==='phone'?'+31 20 123 4567':''} placeholder={f.placeholder} className={inputClass} />
              </div>
            ))}
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Accentkleur</label>
              <div className="flex items-center gap-3">
                <input id="sig-color" type="color" defaultValue="#6366f1" className="h-9 w-16 rounded border border-border cursor-pointer bg-secondary" />
                <span className="text-sm text-muted-foreground">Kleur voor naam en links</span>
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Stijl</label>
              <div className="flex gap-2">
                <button id="sig-theme-modern" className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all bg-primary text-primary-foreground">Modern</button>
                <button id="sig-theme-classic" className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all bg-secondary text-muted-foreground hover:text-foreground">Classic</button>
                <button id="sig-theme-minimal" className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all bg-secondary text-muted-foreground hover:text-foreground">Minimal</button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <h2 className="font-semibold">Voorbeeld</h2>
            <div id="sig-preview" className="bg-white rounded-lg p-4 min-h-[120px]" />
            <div className="flex gap-3 flex-wrap">
              <button id="sig-copy" className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all">
                Kopieer voor Outlook
              </button>
              <button id="sig-copy-html" className="px-4 py-2.5 rounded-lg bg-secondary text-sm font-medium hover:bg-secondary/80 transition-all">
                Kopieer HTML
              </button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5">
            <h2 className="font-semibold mb-3">HTML code</h2>
            <pre id="sig-code" className="text-xs font-mono bg-secondary rounded-lg p-3 overflow-auto max-h-48 whitespace-pre-wrap break-all" />
          </div>

          <div className="bg-secondary/30 border border-border rounded-xl p-4 text-sm text-muted-foreground space-y-1">
            <p className="font-medium text-foreground">Installeren in Outlook</p>
            <p>1. Klik op &ldquo;Kopieer voor Outlook&rdquo; hierboven.</p>
            <p>2. Ga in Outlook naar <strong>Bestand → Opties → E-mail → Handtekeningen</strong>.</p>
            <p>3. Maak een nieuwe handtekening aan en plak de inhoud.</p>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: js }} />
    </div>
  )
}
