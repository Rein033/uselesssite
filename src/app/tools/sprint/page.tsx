import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Sprint Planner | UselessSite' }

export default function SprintPage() {
  const js = `
(function(){
  var state={duration:2,velocity:40,goal:'',members:[{id:1,name:'Teamlid 1',days:10}],items:[{id:1,title:'',points:0}],nextId:2};

  function workingDays(){return state.duration*5;}
  function totalCapacity(){return state.members.reduce(function(s,m){return s+m.days;},0);}
  function totalPoints(){return state.items.reduce(function(s,i){return s+(parseInt(i.points)||0);},0);}
  function pointBudget(){var cap=totalCapacity();var wdays=state.members.length*workingDays()||1;return Math.round((cap/wdays)*state.velocity);}

  function render(){
    var budget=pointBudget();var cap=totalCapacity();var pts=totalPoints();
    var remaining=budget-pts;var overloaded=pts>budget;
    var progress=budget>0?Math.min(100,Math.round((pts/budget)*100)):0;

    // Duration label
    document.getElementById('sp-dur-label').textContent='Duur: '+state.duration+' week'+(state.duration>1?'en':'');
    // Velocity label
    document.getElementById('sp-vel-label').textContent='Team velocity: '+state.velocity+' punten/sprint';
    // Sliders
    document.getElementById('sp-duration').value=state.duration;
    document.getElementById('sp-velocity').value=state.velocity;
    // Goal
    document.getElementById('sp-goal').value=state.goal;
    // Stats
    document.getElementById('sp-cap').textContent=cap;
    document.getElementById('sp-budget').textContent=budget;
    document.getElementById('sp-planned').textContent=pts;
    // Progress
    var bar=document.getElementById('sp-bar');
    bar.style.width=progress+'%';
    bar.className='h-full rounded-full transition-all '+(overloaded?'bg-red-500':'bg-primary');
    var label=document.getElementById('sp-remaining');
    label.textContent=overloaded?Math.abs(remaining)+' pt te veel':remaining+' pt resterend';
    label.className='font-medium '+(overloaded?'text-red-400':'text-emerald-400');

    // Members
    var el=document.getElementById('sp-members');
    el.innerHTML='';
    state.members.forEach(function(m){
      var row=document.createElement('div');
      row.className='flex gap-2 items-center';
      row.innerHTML='<input class="sp-mname flex-1 bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors" value="'+m.name+'" placeholder="Naam" data-mid="'+m.id+'">'+
        '<input type="number" min="0" max="'+workingDays()+'" class="sp-mdays w-20 bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-center outline-none focus:border-primary transition-colors" value="'+m.days+'" data-mid="'+m.id+'">'+
        '<span class="text-xs text-muted-foreground">d</span>'+
        '<button class="sp-mdel text-muted-foreground/40 hover:text-red-400 transition-colors text-lg" data-mid="'+m.id+'">×</button>';
      el.appendChild(row);
    });
    el.querySelectorAll('.sp-mname').forEach(function(inp){
      inp.oninput=function(){var id=parseInt(inp.getAttribute('data-mid'));state.members.forEach(function(m){if(m.id===id)m.name=inp.value;});renderSummary();};
    });
    el.querySelectorAll('.sp-mdays').forEach(function(inp){
      inp.oninput=function(){var id=parseInt(inp.getAttribute('data-mid'));var v=Math.min(workingDays(),Math.max(0,parseInt(inp.value)||0));state.members.forEach(function(m){if(m.id===id)m.days=v;});render();};
    });
    el.querySelectorAll('.sp-mdel').forEach(function(btn){
      btn.onclick=function(){var id=parseInt(btn.getAttribute('data-mid'));if(state.members.length>1){state.members=state.members.filter(function(m){return m.id!==id;});render();}};
    });

    // Items
    var iel=document.getElementById('sp-items');
    iel.innerHTML='';
    state.items.forEach(function(item){
      var row=document.createElement('div');
      row.className='flex gap-2 items-center';
      row.innerHTML='<input class="sp-ititle flex-1 bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors" value="'+item.title+'" placeholder="Omschrijving taak..." data-iid="'+item.id+'">'+
        '<input type="number" min="0" max="99" class="sp-ipts w-16 bg-secondary border border-border rounded-lg px-2 py-2 text-sm text-center outline-none focus:border-primary transition-colors" value="'+(item.points||'')+'" placeholder="pt" data-iid="'+item.id+'">'+
        '<button class="sp-idel text-muted-foreground/40 hover:text-red-400 transition-colors text-lg" data-iid="'+item.id+'">×</button>';
      iel.appendChild(row);
    });
    iel.querySelectorAll('.sp-ititle').forEach(function(inp){
      inp.oninput=function(){var id=parseInt(inp.getAttribute('data-iid'));state.items.forEach(function(i){if(i.id===id)i.title=inp.value;});renderSummary();};
    });
    iel.querySelectorAll('.sp-ipts').forEach(function(inp){
      inp.oninput=function(){var id=parseInt(inp.getAttribute('data-iid'));var v=Math.max(0,parseInt(inp.value)||0);state.items.forEach(function(i){if(i.id===id)i.points=v;});render();};
    });
    iel.querySelectorAll('.sp-idel').forEach(function(btn){
      btn.onclick=function(){var id=parseInt(btn.getAttribute('data-iid'));if(state.items.length>1){state.items=state.items.filter(function(i){return i.id!==id;});render();}};
    });
  }

  function renderSummary(){}

  document.getElementById('sp-goal').addEventListener('input',function(){state.goal=this.value;});
  document.getElementById('sp-duration').addEventListener('input',function(){
    state.duration=parseInt(this.value);
    state.members.forEach(function(m){m.days=state.duration*5;});
    render();
  });
  document.getElementById('sp-velocity').addEventListener('input',function(){state.velocity=parseInt(this.value);render();});
  document.getElementById('sp-add-member').addEventListener('click',function(){
    var id=state.nextId++;
    state.members.push({id:id,name:'Teamlid '+(state.members.length+1),days:workingDays()});
    render();
  });
  document.getElementById('sp-add-item').addEventListener('click',function(){
    var id=state.nextId++;
    state.items.push({id:id,title:'',points:0});
    render();
  });
  document.getElementById('sp-copy').addEventListener('click',function(){
    var btn=this;
    var budget=pointBudget();var pts=totalPoints();var cap=totalCapacity();
    var lines=['Sprint doel: '+(state.goal||'(niet ingevuld)'),'Duur: '+state.duration+' week'+(state.duration>1?'en':''),'Velocity: '+state.velocity+' punten','Capaciteit: '+cap+' mandagen','Budget: '+budget+' story points','','Team:'];
    state.members.forEach(function(m){lines.push('  - '+m.name+': '+m.days+' dagen');});
    lines.push('','Backlog:');
    state.items.filter(function(i){return i.title;}).forEach(function(i){lines.push('  ['+i.points+'pt] '+i.title);});
    lines.push('','Totaal gepland: '+pts+' / '+budget+' punten');
    navigator.clipboard.writeText(lines.join('\\n')).then(function(){
      btn.textContent='✓ Gekopieerd!';
      setTimeout(function(){btn.textContent='Kopieer sprint samenvatting';},2000);
    });
  });

  render();
})();
`

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <div>
        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Tool</p>
        <h1 className="text-3xl font-black mb-1">Sprint Planner</h1>
        <p className="text-muted-foreground">Plan je sprint-capaciteit op basis van teamgrootte en velocity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <h2 className="font-semibold">Sprint instellingen</h2>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Sprint doel</label>
              <input id="sp-goal" placeholder="Bijv. Afronden module X..." className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label id="sp-dur-label" className="text-sm text-muted-foreground mb-1 block">Duur: 2 weken</label>
              <input id="sp-duration" type="range" min={1} max={4} defaultValue={2} className="w-full accent-primary" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>1w</span><span>2w</span><span>3w</span><span>4w</span></div>
            </div>
            <div>
              <label id="sp-vel-label" className="text-sm text-muted-foreground mb-1 block">Team velocity: 40 punten/sprint</label>
              <input id="sp-velocity" type="range" min={10} max={120} step={5} defaultValue={40} className="w-full accent-primary" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>10</span><span>120</span></div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <h2 className="font-semibold">Team</h2>
            <div id="sp-members" className="space-y-2" />
            <button id="sp-add-member" className="text-sm text-primary hover:underline">+ Teamlid toevoegen</button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <h2 className="font-semibold">Capaciteit</h2>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-secondary rounded-lg p-3"><div id="sp-cap" className="text-2xl font-black">10</div><div className="text-xs text-muted-foreground mt-0.5">Mandagen</div></div>
              <div className="bg-secondary rounded-lg p-3"><div id="sp-budget" className="text-2xl font-black">40</div><div className="text-xs text-muted-foreground mt-0.5">Story points budget</div></div>
              <div className="bg-secondary rounded-lg p-3"><div id="sp-planned" className="text-2xl font-black">0</div><div className="text-xs text-muted-foreground mt-0.5">Gepland</div></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-muted-foreground">Voortgang</span>
                <span id="sp-remaining" className="font-medium text-emerald-400">40 pt resterend</span>
              </div>
              <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                <div id="sp-bar" className="h-full rounded-full transition-all bg-primary" style={{width:'0%'}} />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <h2 className="font-semibold">Sprint backlog</h2>
            <div id="sp-items" className="space-y-2" />
            <button id="sp-add-item" className="text-sm text-primary hover:underline">+ Taak toevoegen</button>
          </div>

          <button id="sp-copy" className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all">
            Kopieer sprint samenvatting
          </button>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: js }} />
    </div>
  )
}
