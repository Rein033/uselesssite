import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Wachtwoord Generator | UselessSite' }

export default function WachtwoordPage() {
  const js = `
(function(){
  var SETS={upper:'ABCDEFGHIJKLMNOPQRSTUVWXYZ',lower:'abcdefghijklmnopqrstuvwxyz',digits:'0123456789',special:'!@#$%^&*()-_=+[]{}|;:,.<>?'};
  var config={length:16,count:4,upper:true,lower:true,digits:true,special:false};

  function generate(){
    var chars='';
    if(config.upper)chars+=SETS.upper;
    if(config.lower)chars+=SETS.lower;
    if(config.digits)chars+=SETS.digits;
    if(config.special)chars+=SETS.special;
    if(!chars)chars=SETS.lower;
    var result=[];
    for(var i=0;i<config.count;i++){
      var pw='';
      var arr=new Uint32Array(config.length);
      crypto.getRandomValues(arr);
      for(var j=0;j<config.length;j++) pw+=chars[arr[j]%chars.length];
      result.push(pw);
    }
    return result;
  }

  function strength(pw){
    var s=0;
    if(pw.length>=12)s++;if(pw.length>=16)s++;if(pw.length>=20)s++;
    if(/[A-Z]/.test(pw))s++;if(/[a-z]/.test(pw))s++;
    if(/[0-9]/.test(pw))s++;if(/[^A-Za-z0-9]/.test(pw))s++;
    if(s<=2)return{label:'Zwak',cls:'bg-red-500',w:25};
    if(s<=4)return{label:'Matig',cls:'bg-yellow-500',w:50};
    if(s<=5)return{label:'Goed',cls:'bg-blue-500',w:75};
    return{label:'Sterk',cls:'bg-emerald-500',w:100};
  }

  function render(){
    var pws=generate();
    var el=document.getElementById('pw-list');
    el.innerHTML='';
    pws.forEach(function(pw){
      var s=strength(pw);
      var row=document.createElement('div');
      row.className='bg-card border border-border rounded-xl p-4 space-y-2';
      row.innerHTML='<div class="flex items-center justify-between gap-3">'+
        '<code class="font-mono text-sm break-all flex-1">'+pw+'</code>'+
        '<button class="pw-copy shrink-0 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-xs font-medium transition-colors" data-pw="'+pw+'">Kopieer</button>'+
        '</div>'+
        '<div class="flex items-center gap-2">'+
        '<div class="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden"><div class="h-full rounded-full '+s.cls+'" style="width:'+s.w+'%"></div></div>'+
        '<span class="text-xs text-muted-foreground">'+s.label+'</span>'+
        '</div>';
      el.appendChild(row);
    });
    el.querySelectorAll('.pw-copy').forEach(function(btn){
      btn.addEventListener('click',function(){
        var pw=btn.getAttribute('data-pw');
        navigator.clipboard.writeText(pw).then(function(){
          var orig=btn.textContent;
          btn.textContent='✓';
          setTimeout(function(){btn.textContent=orig;},1500);
        });
      });
    });
    document.getElementById('pw-len-label').textContent='Lengte: '+config.length;
    document.getElementById('pw-cnt-label').textContent='Aantal: '+config.count;
  }

  document.getElementById('pw-length').addEventListener('input',function(){config.length=parseInt(this.value);render();});
  document.getElementById('pw-count').addEventListener('input',function(){config.count=parseInt(this.value);render();});
  ['upper','lower','digits','special'].forEach(function(k){
    document.getElementById('pw-'+k).addEventListener('change',function(){config[k]=this.checked;render();});
  });
  document.getElementById('pw-regen').addEventListener('click',render);

  render();
})();
`

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">
      <div>
        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Tool</p>
        <h1 className="text-3xl font-black mb-1">Wachtwoord Generator</h1>
        <p className="text-muted-foreground">Veilige wachtwoorden via crypto.getRandomValues(). Alles lokaal — niets wordt verstuurd.</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-5 space-y-5">
        <div>
          <label id="pw-len-label" className="text-sm text-muted-foreground mb-2 block">Lengte: 16</label>
          <input id="pw-length" type="range" min={8} max={64} defaultValue={16} className="w-full accent-primary" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>8</span><span>64</span></div>
        </div>
        <div>
          <label id="pw-cnt-label" className="text-sm text-muted-foreground mb-2 block">Aantal: 4</label>
          <input id="pw-count" type="range" min={1} max={10} defaultValue={4} className="w-full accent-primary" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>1</span><span>10</span></div>
        </div>
        <div className="flex flex-wrap gap-4">
          {[
            {id:'upper', label:'Hoofdletters (A-Z)', checked: true},
            {id:'lower', label:'Kleine letters (a-z)', checked: true},
            {id:'digits', label:'Cijfers (0-9)', checked: true},
            {id:'special', label:'Symbolen (!@#...)', checked: false},
          ].map(opt => (
            <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
              <input id={`pw-${opt.id}`} type="checkbox" defaultChecked={opt.checked} className="accent-primary" />
              <span className="text-sm">{opt.label}</span>
            </label>
          ))}
        </div>
        <button id="pw-regen" className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all">
          ↻ Nieuwe wachtwoorden genereren
        </button>
      </div>

      <div id="pw-list" className="space-y-3" />

      <p className="text-xs text-muted-foreground text-center">
        Gegenereerd met <code>crypto.getRandomValues()</code> — volledig in je browser, geen server betrokken.
      </p>

      <script dangerouslySetInnerHTML={{ __html: js }} />
    </div>
  )
}
