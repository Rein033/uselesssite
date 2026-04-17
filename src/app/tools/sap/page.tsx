import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'SAP Import Generator | UselessSite' }

const TEMPLATES = {
  inkooporder: { label: 'Inkooporder (ME21N)', fields: ['Leverancier','Materiaal','Omschrijving','Hoeveelheid','Eenheid','Prijs','Valuta','Fabriek','Levertijd'] },
  materiaal:   { label: 'Materiaalstam (MM01)', fields: ['Materiaalnummer','Omschrijving','Materialtype','Eenheid','Artikelgroep','Fabriek','Gewicht','EAN-code'] },
  leverancier: { label: 'Leverancier (XK01)',   fields: ['Naam','Straat','Postcode','Stad','Land','BTW-nummer','IBAN','Betalingsconditie'] },
  kostenplaats:{ label: 'Kostenplaats (KS01)',  fields: ['Kostenplaats','Omschrijving','Verantwoordelijke','Afdeling','Valuta','Begindatum','Einddatum'] },
}

export default function SapPage() {
  const js = `
(function(){
  var templates=${JSON.stringify(TEMPLATES)};
  var current='inkooporder';
  var rows=[{}];

  function emptyRow(fields){var r={};fields.forEach(function(f){r[f]='';});return r;}

  function render(){
    var tpl=templates[current];
    var fields=tpl.fields;

    // Render tab buttons
    var tabsEl=document.getElementById('sap-tabs');
    tabsEl.innerHTML='';
    Object.keys(templates).forEach(function(key){
      var btn=document.createElement('button');
      btn.textContent=templates[key].label;
      btn.className='px-4 py-2 rounded-lg text-sm font-medium transition-all '+(key===current?'bg-primary text-primary-foreground':'bg-secondary text-muted-foreground hover:text-foreground');
      btn.onclick=function(){current=key;rows=[emptyRow(templates[key].fields)];render();};
      tabsEl.appendChild(btn);
    });

    // Render table
    var tableEl=document.getElementById('sap-table');
    var thead='<thead><tr class="border-b border-border bg-secondary/40"><th class="px-3 py-2.5 text-left text-muted-foreground font-medium w-10">#</th>';
    fields.forEach(function(f){thead+='<th class="px-3 py-2.5 text-left text-muted-foreground font-medium whitespace-nowrap">'+f+'</th>';});
    thead+='<th class="px-3 py-2.5 w-10"></th></tr></thead>';
    var tbody='<tbody>';
    rows.forEach(function(row,i){
      tbody+='<tr class="border-b border-border/50 last:border-0"><td class="px-3 py-2 text-muted-foreground/50 text-xs">'+(i+1)+'</td>';
      fields.forEach(function(f){
        tbody+='<td class="px-2 py-1.5"><input data-row="'+i+'" data-field="'+f+'" value="'+(row[f]||'')+'" placeholder="'+f+'" class="sap-input w-full min-w-[100px] bg-transparent border border-transparent hover:border-border focus:border-primary outline-none rounded px-2 py-1 text-sm transition-colors placeholder:text-muted-foreground/30"></td>';
      });
      tbody+='<td class="px-2 py-1.5"><button data-del="'+i+'" class="text-muted-foreground/40 hover:text-red-400 transition-colors text-lg leading-none">×</button></td></tr>';
    });
    tbody+='</tbody>';
    tableEl.innerHTML=thead+tbody;

    // Attach input handlers
    tableEl.querySelectorAll('.sap-input').forEach(function(inp){
      inp.addEventListener('input',function(){
        var ri=parseInt(inp.getAttribute('data-row'));
        var fi=inp.getAttribute('data-field');
        rows[ri][fi]=inp.value;
        updateDownloadBtn();
      });
    });
    // Attach delete handlers
    tableEl.querySelectorAll('[data-del]').forEach(function(btn){
      btn.addEventListener('click',function(){
        var i=parseInt(btn.getAttribute('data-del'));
        if(rows.length>1){rows.splice(i,1);render();}
      });
    });

    updateDownloadBtn();
    // Update instructions
    var instrEl=document.getElementById('sap-instr');
    if(instrEl) instrEl.textContent=tpl.label.match(/\\(([^)]+)\\)/)?.[1]||'';
  }

  function buildCsv(){
    var fields=templates[current].fields;
    var header=fields.join(';');
    var body=rows.map(function(row){return fields.map(function(f){return '"'+((row[f]||'').replace(/"/g,'""'))+'"';}).join(';');}).join('\\n');
    return '\\uFEFF'+header+'\\n'+body;
  }

  function filledCount(){
    var fields=templates[current].fields;
    return rows.filter(function(r){return fields.some(function(f){return(r[f]||'').trim();});}).length;
  }

  function updateDownloadBtn(){
    var btn=document.getElementById('sap-download');
    var n=filledCount();
    btn.disabled=n===0;
    btn.textContent='Download CSV ('+n+' '+(n===1?'rij':'rijen')+')';
  }

  document.getElementById('sap-add').addEventListener('click',function(){
    rows.push(emptyRow(templates[current].fields));render();
  });

  document.getElementById('sap-copy').addEventListener('click',function(){
    var btn=document.getElementById('sap-copy');
    navigator.clipboard.writeText(buildCsv()).then(function(){
      btn.textContent='✓ Gekopieerd';
      setTimeout(function(){btn.textContent='Kopieer CSV';},2000);
    });
  });

  document.getElementById('sap-download').addEventListener('click',function(){
    var csv=buildCsv();
    var blob=new Blob([csv],{type:'text/csv;charset=utf-8;'});
    var url=URL.createObjectURL(blob);
    var a=document.createElement('a');
    a.href=url;a.download='SAP_'+current+'_import.csv';a.click();
    URL.revokeObjectURL(url);
  });

  render();
})();
`

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      <div>
        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Tool</p>
        <h1 className="text-3xl font-black mb-1">SAP Import Generator</h1>
        <p className="text-muted-foreground">Vul gegevens in en download een SAP-compatibel CSV-importbestand.</p>
      </div>

      <div id="sap-tabs" className="flex flex-wrap gap-2" />

      <div className="overflow-x-auto rounded-xl border border-border">
        <table id="sap-table" className="w-full text-sm" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button id="sap-add" className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-sm font-medium transition-colors">
          + Rij toevoegen
        </button>
        <div className="flex gap-3">
          <button id="sap-copy" className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-sm font-medium transition-colors">
            Kopieer CSV
          </button>
          <button id="sap-download" disabled className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
            Download CSV
          </button>
        </div>
      </div>

      <div className="bg-secondary/30 border border-border rounded-xl p-4 text-sm text-muted-foreground space-y-1">
        <p className="font-medium text-foreground">Hoe te importeren in SAP</p>
        <p>1. Download het CSV-bestand (puntkomma-gescheiden, UTF-8 BOM).</p>
        <p>2. Open transactie (<span id="sap-instr" />) in SAP.</p>
        <p>3. Gebruik <strong>Systeem → Services → Lijst → Lokaal bestand downloaden</strong> of de LSMW/BAPI voor bulk-import.</p>
      </div>

      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <script dangerouslySetInnerHTML={{ __html: js }} />
    </div>
  )
}
