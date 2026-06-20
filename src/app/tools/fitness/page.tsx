import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Sport & Spier Schema Generator | UselessSite' }

const EXERCISES: Record<string, [string, number, string][]> = {
  FullBody: [['Squat', 4, '6-10'], ['Bench Press', 3, '8-12'], ['Bent-over Row', 3, '8-12'], ['Overhead Press', 3, '8-12']],
  Push:     [['Bench Press', 4, '6-10'], ['Overhead Press', 3, '8-12'], ['Dips', 3, '10-15'], ['Triceps Pushdown', 3, '12-15']],
  Pull:     [['Lat Pulldown / Pull-up', 4, '6-10'], ['Barbell Row', 3, '8-12'], ['Face Pull', 3, '15-20'], ['Biceps Curl', 3, '10-15']],
  Legs:     [['Squat', 4, '6-10'], ['Romanian Deadlift', 3, '8-12'], ['Leg Press', 3, '10-15'], ['Calf Raise', 3, '15-20']],
  Upper:    [['Bench Press', 3, '8-12'], ['Barbell Row', 3, '8-12'], ['Overhead Press', 3, '8-12'], ['Lat Pulldown', 3, '10-15'], ['Biceps Curl', 2, '10-15']],
  Lower:    [['Squat', 4, '6-10'], ['Deadlift', 3, '6-10'], ['Leg Press', 3, '10-15'], ['Hip Thrust', 3, '10-15'], ['Calf Raise', 3, '15-20']],
}

const CORE_FINISHER: [string, number, string][] = [
  ['Hanging Knee Raise', 3, '12-15'],
  ['Cable Crunch', 3, '12-15'],
  ['Plank', 3, '45-60s'],
]

const FOCUS_LABELS: Record<string, string> = {
  FullBody: 'Volledige lichaam',
  Push: 'Push — borst, schouders, triceps',
  Pull: 'Pull — rug, biceps',
  Legs: 'Benen',
  Upper: 'Bovenlichaam',
  Lower: 'Onderlichaam',
}

const SCHEDULES: Record<string, (string | null)[]> = {
  '3': ['FullBody', null, 'FullBody', null, 'FullBody', null, null],
  '4': ['Upper', 'Lower', null, 'Upper', 'Lower', null, null],
  '5': ['Push', 'Pull', 'Legs', 'Upper', 'Lower', null, null],
  '6': ['Push', 'Pull', 'Legs', 'Push', 'Pull', 'Legs', null],
}

const DAY_NAMES = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag']

export default function FitnessPage() {
  const js = `
(function(){
  var EXERCISES=${JSON.stringify(EXERCISES)};
  var CORE_FINISHER=${JSON.stringify(CORE_FINISHER)};
  var FOCUS_LABELS=${JSON.stringify(FOCUS_LABELS)};
  var SCHEDULES=${JSON.stringify(SCHEDULES)};
  var DAY_NAMES=${JSON.stringify(DAY_NAMES)};
  var ACTIVITY_MULT={zitten:1.2,licht:1.375,matig:1.55,actief:1.725,extreem:1.9};
  var lastSummary='';

  function calcBMR(gender,weight,height,age){
    var base=10*weight+6.25*height-5*age;
    return gender==='man'?base+5:base-161;
  }

  function calcCalories(tdee,goal){
    if(goal==='afvallen')return Math.round(tdee*0.8);
    if(goal==='opbouw')return Math.round(tdee*1.12);
    return Math.round(tdee);
  }

  function proteinPerKg(goal){
    if(goal==='afvallen')return 2.4;
    if(goal==='opbouw')return 2.0;
    return 1.8;
  }

  function bmiInfo(bmi){
    if(bmi<18.5)return{label:'Ondergewicht',cls:'text-blue-400'};
    if(bmi<25)return{label:'Gezond gewicht',cls:'text-emerald-400'};
    if(bmi<30)return{label:'Overgewicht',cls:'text-yellow-400'};
    return{label:'Obesitas',cls:'text-red-400'};
  }

  function setAdjust(exp){
    if(exp==='beginner')return -1;
    if(exp==='gevorderd')return 1;
    return 0;
  }

  function setMacro(key,g,kcal,totalKcal){
    document.getElementById('fs-'+key+'-g').textContent=g+'g';
    document.getElementById('fs-'+key+'-kcal').textContent=kcal+' kcal';
    var pct=totalKcal>0?Math.round((kcal/totalKcal)*100):0;
    document.getElementById('fs-'+key+'-bar').style.width=pct+'%';
    document.getElementById('fs-'+key+'-pct').textContent=pct+'%';
  }

  function renderSchedule(days,exp){
    var pattern=SCHEDULES[days];
    var adj=setAdjust(exp);
    var el=document.getElementById('fs-schema');
    el.innerHTML='';
    pattern.forEach(function(focus,i){
      var card=document.createElement('div');
      card.className='bg-card border border-border rounded-xl p-4';
      if(!focus){
        card.innerHTML='<div class="flex items-center justify-between"><span class="font-semibold">'+DAY_NAMES[i]+'</span><span class="text-sm text-muted-foreground">Rustdag — herstel</span></div>';
        el.appendChild(card);
        return;
      }
      var exercises=EXERCISES[focus];
      var rows='';
      exercises.forEach(function(ex){
        var sets=Math.max(2,ex[1]+adj);
        rows+='<div class="flex items-center justify-between text-sm py-1 border-b border-border/50 last:border-0"><span>'+ex[0]+'</span><span class="text-muted-foreground">'+sets+' x '+ex[2]+'</span></div>';
      });
      rows+='<div class="text-xs uppercase tracking-wide text-muted-foreground/60 pt-2 pb-1">Core afsluiter</div>';
      CORE_FINISHER.forEach(function(ex){
        rows+='<div class="flex items-center justify-between text-sm py-1 border-b border-border/50 last:border-0"><span>'+ex[0]+'</span><span class="text-muted-foreground">'+ex[1]+' x '+ex[2]+'</span></div>';
      });
      card.innerHTML='<div class="flex items-center justify-between mb-2"><span class="font-semibold">'+DAY_NAMES[i]+'</span><span class="text-xs uppercase tracking-wide text-primary">'+FOCUS_LABELS[focus]+'</span></div>'+rows;
      el.appendChild(card);
    });
  }

  function buildSummary(d){
    var lines=[
      'Sport & Spier Schema',
      '',
      'Geslacht: '+(d.gender==='man'?'Man':'Vrouw'),
      'Leeftijd: '+d.age+' jaar',
      'Lengte: '+d.height+' cm',
      'Gewicht: '+d.weight+' kg',
      'BMI: '+d.bmi.toFixed(1)+' ('+d.bmiI.label+')',
      '',
      'BMR: '+Math.round(d.bmr)+' kcal',
      'TDEE: '+Math.round(d.tdee)+' kcal',
      'Calorieendoel: '+d.calories+' kcal',
      '',
      'Macros per dag:',
      '  Eiwit: '+d.proteinG+' g',
      '  Vet: '+d.fatG+' g',
      '  Koolhydraten: '+d.carbsG+' g',
      '',
      'Trainingsschema ('+d.days+'x per week):'
    ];
    var pattern=SCHEDULES[d.days];
    var adj=setAdjust(d.exp);
    pattern.forEach(function(focus,i){
      if(!focus){lines.push('  '+DAY_NAMES[i]+': Rustdag');return;}
      lines.push('  '+DAY_NAMES[i]+' - '+FOCUS_LABELS[focus]+':');
      EXERCISES[focus].forEach(function(ex){
        var sets=Math.max(2,ex[1]+adj);
        lines.push('    - '+ex[0]+': '+sets+' x '+ex[2]);
      });
      CORE_FINISHER.forEach(function(ex){
        lines.push('    - '+ex[0]+': '+ex[1]+' x '+ex[2]);
      });
    });
    lastSummary=lines.join(String.fromCharCode(10));
  }

  function render(){
    var gender=document.getElementById('fs-gender').value;
    var age=parseInt(document.getElementById('fs-age').value)||25;
    var height=parseInt(document.getElementById('fs-height').value)||180;
    var weight=parseFloat(document.getElementById('fs-weight').value)||80;
    var activity=document.getElementById('fs-activity').value;
    var goal=document.getElementById('fs-goal').value;
    var days=document.getElementById('fs-days').value;
    var exp=document.getElementById('fs-experience').value;

    var bmi=weight/((height/100)*(height/100));
    var bmiI=bmiInfo(bmi);
    var bmr=calcBMR(gender,weight,height,age);
    var tdee=bmr*ACTIVITY_MULT[activity];
    var calories=calcCalories(tdee,goal);

    var proteinG=Math.round(proteinPerKg(goal)*weight);
    var proteinKcal=proteinG*4;
    var fatKcal=Math.round(calories*0.25);
    var fatG=Math.round(fatKcal/9);
    var carbsKcal=Math.max(0,calories-proteinKcal-fatKcal);
    var carbsG=Math.round(carbsKcal/4);

    document.getElementById('fs-bmi').textContent=bmi.toFixed(1);
    var bmiLabelEl=document.getElementById('fs-bmi-label');
    bmiLabelEl.textContent=bmiI.label;
    bmiLabelEl.className='text-xs mt-0.5 '+bmiI.cls;
    document.getElementById('fs-bmr').textContent=Math.round(bmr)+' kcal';
    document.getElementById('fs-tdee').textContent=Math.round(tdee)+' kcal';
    document.getElementById('fs-calories').textContent=calories+' kcal';

    document.getElementById('fs-calories-label').textContent=goal==='afvallen'?'Caloriebeperking (-20%)':goal==='opbouw'?'Calorieoverschot (+12%)':'Onderhoud';

    setMacro('protein',proteinG,proteinKcal,calories);
    setMacro('fat',fatG,fatKcal,calories);
    setMacro('carbs',carbsG,carbsKcal,calories);

    renderSchedule(days,exp);
    buildSummary({gender:gender,age:age,height:height,weight:weight,activity:activity,goal:goal,days:days,exp:exp,bmi:bmi,bmiI:bmiI,bmr:bmr,tdee:tdee,calories:calories,proteinG:proteinG,fatG:fatG,carbsG:carbsG});
  }

  document.getElementById('fs-copy').addEventListener('click',function(){
    var btn=this;
    navigator.clipboard.writeText(lastSummary).then(function(){
      btn.textContent='✓ Gekopieerd!';
      setTimeout(function(){btn.textContent='Kopieer volledig schema';},2000);
    });
  });

  ['fs-gender','fs-age','fs-height','fs-weight','fs-activity','fs-goal','fs-days','fs-experience'].forEach(function(id){
    var el=document.getElementById(id);
    el.addEventListener('input',render);
    el.addEventListener('change',render);
  });

  render();
})();
`

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <div>
        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Tool</p>
        <h1 className="text-3xl font-black mb-1">Sport & Spier Schema Generator</h1>
        <p className="text-muted-foreground">Persoonlijk voedings- en trainingsschema op basis van lengte, gewicht en doel.</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <h2 className="font-semibold">Jouw gegevens</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Geslacht</label>
            <select id="fs-gender" defaultValue="man" className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors">
              <option value="man">Man</option>
              <option value="vrouw">Vrouw</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Leeftijd</label>
            <input id="fs-age" type="number" min={14} max={90} defaultValue={25} className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Lengte (cm)</label>
            <input id="fs-height" type="number" min={120} max={230} defaultValue={180} className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Gewicht (kg)</label>
            <input id="fs-weight" type="number" min={35} max={250} step={0.5} defaultValue={80} className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Activiteitsniveau</label>
            <select id="fs-activity" defaultValue="matig" className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors">
              <option value="zitten">Zittend werk, weinig beweging</option>
              <option value="licht">Licht actief (1-3x/week sport)</option>
              <option value="matig">Matig actief (3-5x/week sport)</option>
              <option value="actief">Zeer actief (6-7x/week sport)</option>
              <option value="extreem">Extreem actief (zwaar fysiek werk + sport)</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Doel</label>
            <select id="fs-goal" defaultValue="afvallen" className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors">
              <option value="afvallen">Afvallen / vet verliezen</option>
              <option value="behoud">Gewicht behouden</option>
              <option value="opbouw">Spieropbouw / bulken</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Trainingsdagen per week</label>
            <select id="fs-days" defaultValue="4" className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors">
              <option value="3">3 dagen</option>
              <option value="4">4 dagen</option>
              <option value="5">5 dagen</option>
              <option value="6">6 dagen</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Trainingservaring</label>
            <select id="fs-experience" defaultValue="gemiddeld" className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors">
              <option value="beginner">Beginner (&lt;1 jaar)</option>
              <option value="gemiddeld">Gemiddeld (1-3 jaar)</option>
              <option value="gevorderd">Gevorderd (3+ jaar)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
        <div className="bg-card border border-border rounded-xl p-4">
          <div id="fs-bmi" className="text-2xl font-black">0</div>
          <div className="text-xs text-muted-foreground mt-0.5">BMI</div>
          <div id="fs-bmi-label" className="text-xs mt-0.5 text-emerald-400">—</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div id="fs-bmr" className="text-2xl font-black">0 kcal</div>
          <div className="text-xs text-muted-foreground mt-0.5">Rustmetabolisme (BMR)</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div id="fs-tdee" className="text-2xl font-black">0 kcal</div>
          <div className="text-xs text-muted-foreground mt-0.5">Totaal verbruik (TDEE)</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div id="fs-calories" className="text-2xl font-black text-primary">0 kcal</div>
          <div id="fs-calories-label" className="text-xs text-muted-foreground mt-0.5">Calorieën doel</div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4">
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground font-medium">Wanneer zie je een sixpack?</span> Vooral een laag vetpercentage maakt buikspieren zichtbaar: bij mannen vanaf ~10-12% (duidelijke six-pack bij 6-9%), bij vrouwen vanaf ~16-19%. Dat bereik je met een consistent calorietekort — dit schema voegt daarom standaard een core-afsluiter toe aan elke trainingsdag voor spierdefinitie onder dat lagere vetpercentage.
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <h2 className="font-semibold">Macro-verdeling per dag</h2>
        {[
          { key: 'protein', label: 'Eiwit', color: 'bg-primary' },
          { key: 'fat', label: 'Vet', color: 'bg-yellow-500' },
          { key: 'carbs', label: 'Koolhydraten', color: 'bg-blue-500' },
        ].map(m => (
          <div key={m.key}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-muted-foreground">{m.label}</span>
              <span className="font-medium">
                <span id={`fs-${m.key}-g`}>0g</span> · <span id={`fs-${m.key}-kcal`}>0 kcal</span> · <span id={`fs-${m.key}-pct`}>0%</span>
              </span>
            </div>
            <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
              <div id={`fs-${m.key}-bar`} className={`h-full rounded-full transition-all ${m.color}`} style={{ width: '0%' }} />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h2 className="font-semibold text-lg">Trainingsschema</h2>
        <div id="fs-schema" className="space-y-3" />
      </div>

      <button id="fs-copy" className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all">
        Kopieer volledig schema
      </button>

      <p className="text-xs text-muted-foreground text-center">
        Berekend met de Mifflin-St Jeor formule, ACSM-richtlijnen voor krachttraining (elke spiergroep ≥2x per week, effort-to-failure) en de ISSN position stand over eiwitinname (1.4–2.0 g/kg, hoger tijdens een dieet). Indicatief advies — geen vervanging voor medisch of sportief advies.
      </p>

      <script dangerouslySetInnerHTML={{ __html: js }} />
    </div>
  )
}
