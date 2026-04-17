import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'JSON Formatter | UselessSite' }

export default function JsonPage() {
  const js = `
(function(){
  var input=document.getElementById('json-input');
  var output=document.getElementById('json-output');
  var error=document.getElementById('json-error');
  var stats=document.getElementById('json-stats');

  function setOutput(text,isError){
    output.value=text;
    error.textContent=isError?text:'';
    error.style.display=isError?'block':'none';
    output.style.display=isError?'none':'block';
  }

  function updateStats(parsed){
    if(!parsed){stats.textContent='';return;}
    var keys=JSON.stringify(parsed).replace(/[^{[]/g,'').length;
    stats.textContent='Grootte: '+JSON.stringify(parsed).length+' tekens | Keys: '+keys;
  }

  document.getElementById('json-format').addEventListener('click',function(){
    try{var p=JSON.parse(input.value);var out=JSON.stringify(p,null,2);setOutput(out,false);updateStats(p);}
    catch(e){setOutput(e.message,true);updateStats(null);}
  });
  document.getElementById('json-minify').addEventListener('click',function(){
    try{var p=JSON.parse(input.value);setOutput(JSON.stringify(p),false);updateStats(p);}
    catch(e){setOutput(e.message,true);updateStats(null);}
  });
  document.getElementById('json-validate').addEventListener('click',function(){
    try{var p=JSON.parse(input.value);setOutput('✓ Geldige JSON',false);updateStats(p);}
    catch(e){setOutput(e.message,true);updateStats(null);}
  });
  document.getElementById('json-clear').addEventListener('click',function(){
    input.value='';output.value='';error.textContent='';output.style.display='block';error.style.display='none';stats.textContent='';
  });
  document.getElementById('json-copy').addEventListener('click',function(){
    var btn=this;var text=output.style.display!=='none'?output.value:input.value;
    navigator.clipboard.writeText(text).then(function(){
      btn.textContent='✓ Gekopieerd';
      setTimeout(function(){btn.textContent='Kopieer output';},2000);
    });
  });
  document.getElementById('json-sample').addEventListener('click',function(){
    input.value=JSON.stringify({naam:"Jan de Vries",afdeling:"IT",projecten:[{id:1,naam:"UselessSite",status:"actief"},{id:2,naam:"SAP Migratie",status:"gepland"}],actief:true},null,2);
  });
})();
`

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <div>
        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Tool</p>
        <h1 className="text-3xl font-black mb-1">JSON Formatter</h1>
        <p className="text-muted-foreground">Format, minify of valideer JSON direct in je browser.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button id="json-format" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">Formatteren</button>
        <button id="json-minify" className="px-4 py-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">Minify</button>
        <button id="json-validate" className="px-4 py-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">Valideren</button>
        <button id="json-sample" className="px-4 py-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">Voorbeeld laden</button>
        <button id="json-clear" className="px-4 py-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">Wissen</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Invoer</label>
          <textarea id="json-input" rows={16} placeholder='Plak hier je JSON...' className="w-full bg-secondary border border-border rounded-xl p-4 text-sm font-mono outline-none focus:border-primary transition-colors resize-none" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Uitvoer</label>
          <textarea id="json-output" rows={16} readOnly className="w-full bg-secondary border border-border rounded-xl p-4 text-sm font-mono outline-none resize-none" />
          <pre id="json-error" className="hidden mt-2 bg-red-950/40 border border-red-800/50 rounded-xl p-4 text-red-400 text-sm font-mono whitespace-pre-wrap" />
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <span id="json-stats" className="text-xs text-muted-foreground" />
        <button id="json-copy" className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-sm font-medium transition-colors">Kopieer output</button>
      </div>

      <script dangerouslySetInnerHTML={{ __html: js }} />
    </div>
  )
}
