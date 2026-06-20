'use client'
import { useMemo, useState } from 'react'

type Gender = 'man' | 'vrouw'
type Goal = 'afvallen' | 'behoud' | 'opbouw' | 'militair'
type Experience = 'beginner' | 'gemiddeld' | 'gevorderd'

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

const ACTIVITY_MULT: Record<string, number> = { zitten: 1.2, licht: 1.375, matig: 1.55, actief: 1.725, extreem: 1.9 }

// Defensie Conditieproef (DCP) eisen t/m 30 jaar — defensietest.nl/defensie-conditieproef
const MILITARY_NORMS: Record<Gender, { run: number; pushups: number; situps: number }> = {
  man: { run: 2400, pushups: 20, situps: 30 },
  vrouw: { run: 1900, pushups: 10, situps: 20 },
}

const MILITARY_BASELINE_PCT: Record<Experience, { reps: number; run: number }> = {
  beginner: { reps: 0.2, run: 0.5 },
  gemiddeld: { reps: 0.45, run: 0.7 },
  gevorderd: { reps: 0.7, run: 0.85 },
}

const MILITARY_WEEKS = 12

const MILITARY_DAY_TYPES = [
  'Push-ups & core',
  'Hardlopen (interval)',
  'Sit-ups & core',
  'Full body kracht',
  'Hardlopen (duurloop)',
  'Push-ups, sit-ups & sprints',
]

function militaryActiveDays(week: number) {
  if (week <= 3) return 4
  if (week <= 6) return 5
  return 6
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function militaryTargets(week: number, gender: Gender, exp: Experience) {
  const norms = MILITARY_NORMS[gender]
  const base = MILITARY_BASELINE_PCT[exp]
  const t = (week - 1) / (MILITARY_WEEKS - 1)
  return {
    pushups: Math.round(lerp(norms.pushups * base.reps, norms.pushups, t)),
    situps: Math.round(lerp(norms.situps * base.reps, norms.situps, t)),
    run: Math.round(lerp(norms.run * base.run, norms.run, t)),
  }
}

function militaryDayDetail(type: string, t: { pushups: number; situps: number; run: number }) {
  switch (type) {
    case 'Push-ups & core':
      return `3-4 sets, totaal opbouwend naar ${t.pushups} push-ups + core afsluiter`
    case 'Hardlopen (interval)':
      return `Sprintintervallen (bv. 8x400m rustig/snel), bouwt 12-minuten-conditie op richting ${t.run}m`
    case 'Sit-ups & core':
      return `3-4 sets, totaal opbouwend naar ${t.situps} sit-ups + plank`
    case 'Full body kracht':
      return 'Squat, push-up, sit-up, lunges — ondersteunende kracht voor de testonderdelen'
    case 'Hardlopen (duurloop)':
      return `Rustig duurtempo, bouwt op richting ${t.run}m in 12 minuten`
    case 'Push-ups, sit-ups & sprints':
      return 'Combinatie van alle testonderdelen op volgorde: push-ups, sit-ups, korte sprints'
    default:
      return 'Rustdag — herstel (licht wandelen/stretchen mag)'
  }
}

function militaryWeekSchedule(week: number, gender: Gender, exp: Experience) {
  const active = militaryActiveDays(week)
  const rest = 7 - active
  const types: string[] = []
  for (let i = 0; i < active; i++) types.push(MILITARY_DAY_TYPES[i % MILITARY_DAY_TYPES.length])
  for (let i = 0; i < rest; i++) types.push('Rust')
  const targets = militaryTargets(week, gender, exp)
  return DAY_NAMES.map((name, i) => ({ name, type: types[i], detail: militaryDayDetail(types[i], targets) }))
}

function calcBMR(gender: Gender, weight: number, height: number, age: number) {
  const base = 10 * weight + 6.25 * height - 5 * age
  return gender === 'man' ? base + 5 : base - 161
}

function calcCalories(tdee: number, goal: Goal) {
  if (goal === 'afvallen') return Math.round(tdee * 0.8)
  if (goal === 'opbouw') return Math.round(tdee * 1.12)
  return Math.round(tdee)
}

function proteinPerKg(goal: Goal) {
  if (goal === 'afvallen') return 2.4
  if (goal === 'opbouw' || goal === 'militair') return 2.0
  return 1.8
}

function bmiInfo(bmi: number) {
  if (bmi < 18.5) return { label: 'Ondergewicht', cls: 'text-blue-400' }
  if (bmi < 25) return { label: 'Gezond gewicht', cls: 'text-emerald-400' }
  if (bmi < 30) return { label: 'Overgewicht', cls: 'text-yellow-400' }
  return { label: 'Obesitas', cls: 'text-red-400' }
}

function setAdjust(exp: Experience) {
  if (exp === 'beginner') return -1
  if (exp === 'gevorderd') return 1
  return 0
}

type Tab = 'overzicht' | 'voeding' | 'schema'

const TABS: { id: Tab; label: string }[] = [
  { id: 'overzicht', label: 'Overzicht' },
  { id: 'voeding', label: 'Voedingsschema' },
  { id: 'schema', label: 'Trainingsschema' },
]

// macro's per 100g (NEVO/algemene voedingswaarden)
const FOODS: Record<string, { kcal: number; eiwit: number; koolhydraten: number; vet: number; label: string }> = {
  havermout:        { label: 'Havermout', kcal: 375, eiwit: 13, koolhydraten: 62, vet: 7 },
  banaan:           { label: 'Banaan', kcal: 95, eiwit: 1.1, koolhydraten: 23, vet: 0.3 },
  kwark:            { label: 'Magere kwark', kcal: 60, eiwit: 11, koolhydraten: 4, vet: 0.3 },
  volkorenbrood:    { label: 'Volkoren brood', kcal: 250, eiwit: 9, koolhydraten: 41, vet: 3.5 },
  kipfilet:         { label: 'Kipfilet (gegrild)', kcal: 165, eiwit: 31, koolhydraten: 0, vet: 3.6 },
  amandelen:        { label: 'Amandelen', kcal: 579, eiwit: 21, koolhydraten: 22, vet: 50 },
  appel:            { label: 'Appel', kcal: 52, eiwit: 0.3, koolhydraten: 14, vet: 0.2 },
  zalm:             { label: 'Zalm', kcal: 208, eiwit: 20, koolhydraten: 0, vet: 13 },
  zilvervliesrijst: { label: 'Zilvervliesrijst (gekookt)', kcal: 123, eiwit: 2.6, koolhydraten: 26, vet: 1 },
  broccoli:         { label: 'Broccoli', kcal: 35, eiwit: 2.4, koolhydraten: 7, vet: 0.4 },
  olijfolie:        { label: 'Olijfolie', kcal: 884, eiwit: 0, koolhydraten: 0, vet: 100 },
  eieren:           { label: 'Eieren (gekookt)', kcal: 155, eiwit: 13, koolhydraten: 1.1, vet: 11 },
  volkorenpasta:    { label: 'Volkoren pasta (gekookt)', kcal: 124, eiwit: 5, koolhydraten: 25, vet: 1.1 },
  griekseyoghurt:   { label: 'Griekse yoghurt (magere)', kcal: 59, eiwit: 10, koolhydraten: 3.6, vet: 0.4 },
  kalkoenfilet:     { label: 'Kalkoenfilet (gegrild)', kcal: 135, eiwit: 30, koolhydraten: 0, vet: 1 },
  walnoten:         { label: 'Walnoten', kcal: 654, eiwit: 15, koolhydraten: 14, vet: 65 },
  quinoa:           { label: 'Quinoa (gekookt)', kcal: 120, eiwit: 4.4, koolhydraten: 21, vet: 1.9 },
  spinazie:         { label: 'Spinazie', kcal: 23, eiwit: 2.9, koolhydraten: 3.6, vet: 0.4 },
  paprika:          { label: 'Paprika', kcal: 31, eiwit: 1, koolhydraten: 6, vet: 0.3 },
  tonijn:           { label: 'Tonijn (in water)', kcal: 116, eiwit: 26, koolhydraten: 0, vet: 0.8 },
  pindakaas:        { label: 'Pindakaas', kcal: 588, eiwit: 25, koolhydraten: 20, vet: 50 },
  rundergehakt:     { label: 'Rundergehakt (15% vet, gebakken)', kcal: 215, eiwit: 26, koolhydraten: 0, vet: 12 },
  zoeteaardappel:   { label: 'Zoete aardappel (gekookt)', kcal: 90, eiwit: 2, koolhydraten: 21, vet: 0.1 },
  komkommer:        { label: 'Komkommer', kcal: 16, eiwit: 0.7, koolhydraten: 3.6, vet: 0.1 },
  sinaasappel:      { label: 'Sinaasappel', kcal: 47, eiwit: 0.9, koolhydraten: 12, vet: 0.1 },
  avocado:          { label: 'Avocado', kcal: 160, eiwit: 2, koolhydraten: 9, vet: 15 },
}

type MealTemplate = { meal: string; items: { food: keyof typeof FOODS; g: number }[] }[]

const WEEK_MEAL_TEMPLATES: MealTemplate[] = [
  [ // Maandag
    { meal: 'Ontbijt', items: [{ food: 'havermout', g: 60 }, { food: 'banaan', g: 100 }, { food: 'kwark', g: 150 }] },
    { meal: 'Lunch', items: [{ food: 'volkorenbrood', g: 90 }, { food: 'kipfilet', g: 100 }, { food: 'broccoli', g: 80 }] },
    { meal: 'Tussendoor', items: [{ food: 'amandelen', g: 20 }, { food: 'appel', g: 150 }] },
    { meal: 'Diner', items: [{ food: 'zalm', g: 150 }, { food: 'zilvervliesrijst', g: 150 }, { food: 'broccoli', g: 150 }, { food: 'olijfolie', g: 10 }] },
  ],
  [ // Dinsdag
    { meal: 'Ontbijt', items: [{ food: 'eieren', g: 120 }, { food: 'volkorenbrood', g: 60 }, { food: 'spinazie', g: 50 }] },
    { meal: 'Lunch', items: [{ food: 'kalkoenfilet', g: 120 }, { food: 'quinoa', g: 150 }, { food: 'paprika', g: 80 }] },
    { meal: 'Tussendoor', items: [{ food: 'griekseyoghurt', g: 150 }, { food: 'walnoten', g: 20 }] },
    { meal: 'Diner', items: [{ food: 'rundergehakt', g: 130 }, { food: 'zoeteaardappel', g: 200 }, { food: 'broccoli', g: 150 }, { food: 'olijfolie', g: 10 }] },
  ],
  [ // Woensdag
    { meal: 'Ontbijt', items: [{ food: 'havermout', g: 60 }, { food: 'appel', g: 100 }, { food: 'griekseyoghurt', g: 150 }] },
    { meal: 'Lunch', items: [{ food: 'tonijn', g: 120 }, { food: 'volkorenbrood', g: 90 }, { food: 'komkommer', g: 80 }] },
    { meal: 'Tussendoor', items: [{ food: 'amandelen', g: 20 }, { food: 'sinaasappel', g: 150 }] },
    { meal: 'Diner', items: [{ food: 'kipfilet', g: 150 }, { food: 'zilvervliesrijst', g: 150 }, { food: 'spinazie', g: 100 }, { food: 'olijfolie', g: 10 }] },
  ],
  [ // Donderdag
    { meal: 'Ontbijt', items: [{ food: 'eieren', g: 120 }, { food: 'volkorenbrood', g: 60 }, { food: 'paprika', g: 50 }] },
    { meal: 'Lunch', items: [{ food: 'kipfilet', g: 120 }, { food: 'quinoa', g: 150 }, { food: 'spinazie', g: 80 }] },
    { meal: 'Tussendoor', items: [{ food: 'kwark', g: 150 }, { food: 'banaan', g: 100 }] },
    { meal: 'Diner', items: [{ food: 'zalm', g: 150 }, { food: 'zoeteaardappel', g: 200 }, { food: 'broccoli', g: 150 }, { food: 'olijfolie', g: 10 }] },
  ],
  [ // Vrijdag
    { meal: 'Ontbijt', items: [{ food: 'havermout', g: 60 }, { food: 'banaan', g: 100 }, { food: 'pindakaas', g: 20 }] },
    { meal: 'Lunch', items: [{ food: 'kalkoenfilet', g: 120 }, { food: 'volkorenbrood', g: 90 }, { food: 'komkommer', g: 80 }] },
    { meal: 'Tussendoor', items: [{ food: 'walnoten', g: 20 }, { food: 'appel', g: 150 }] },
    { meal: 'Diner', items: [{ food: 'rundergehakt', g: 130 }, { food: 'volkorenpasta', g: 200 }, { food: 'spinazie', g: 100 }, { food: 'olijfolie', g: 10 }] },
  ],
  [ // Zaterdag
    { meal: 'Ontbijt', items: [{ food: 'griekseyoghurt', g: 150 }, { food: 'havermout', g: 50 }, { food: 'walnoten', g: 15 }] },
    { meal: 'Lunch', items: [{ food: 'tonijn', g: 120 }, { food: 'zilvervliesrijst', g: 150 }, { food: 'paprika', g: 80 }] },
    { meal: 'Tussendoor', items: [{ food: 'amandelen', g: 20 }, { food: 'sinaasappel', g: 150 }] },
    { meal: 'Diner', items: [{ food: 'kipfilet', g: 150 }, { food: 'quinoa', g: 150 }, { food: 'broccoli', g: 150 }, { food: 'olijfolie', g: 10 }] },
  ],
  [ // Zondag
    { meal: 'Ontbijt', items: [{ food: 'eieren', g: 120 }, { food: 'volkorenbrood', g: 60 }, { food: 'avocado', g: 50 }] },
    { meal: 'Lunch', items: [{ food: 'kalkoenfilet', g: 120 }, { food: 'zilvervliesrijst', g: 150 }, { food: 'broccoli', g: 80 }] },
    { meal: 'Tussendoor', items: [{ food: 'kwark', g: 150 }, { food: 'appel', g: 150 }] },
    { meal: 'Diner', items: [{ food: 'zalm', g: 150 }, { food: 'quinoa', g: 150 }, { food: 'spinazie', g: 100 }, { food: 'olijfolie', g: 10 }] },
  ],
]

function foodAt(food: keyof typeof FOODS, grams: number) {
  const f = FOODS[food]
  const r = grams / 100
  return { label: f.label, grams, kcal: Math.round(f.kcal * r), eiwit: Math.round(f.eiwit * r), koolhydraten: Math.round(f.koolhydraten * r), vet: Math.round(f.vet * r) }
}

function buildDayMealPlan(template: MealTemplate, targetCalories: number) {
  const referenceKcal = template.reduce((sum, m) => sum + m.items.reduce((s, it) => s + FOODS[it.food].kcal * (it.g / 100), 0), 0)
  const scale = targetCalories / referenceKcal
  return template.map(m => {
    const items = m.items.map(it => foodAt(it.food, Math.max(5, Math.round((it.g * scale) / 5) * 5)))
    const subtotal = items.reduce((acc, it) => ({
      kcal: acc.kcal + it.kcal, eiwit: acc.eiwit + it.eiwit, koolhydraten: acc.koolhydraten + it.koolhydraten, vet: acc.vet + it.vet,
    }), { kcal: 0, eiwit: 0, koolhydraten: 0, vet: 0 })
    return { meal: m.meal, items, subtotal }
  })
}

function buildWeekMealPlan(targetCalories: number) {
  return DAY_NAMES.map((day, i) => ({ day, meals: buildDayMealPlan(WEEK_MEAL_TEMPLATES[i], targetCalories) }))
}

export default function FitnessClient() {
  const [tab, setTab] = useState<Tab>('overzicht')
  const [gender, setGender] = useState<Gender>('man')
  const [age, setAge] = useState(25)
  const [height, setHeight] = useState(180)
  const [weight, setWeight] = useState(80)
  const [activity, setActivity] = useState('matig')
  const [goal, setGoal] = useState<Goal>('afvallen')
  const [days, setDays] = useState('4')
  const [experience, setExperience] = useState<Experience>('gemiddeld')
  const [militaryWeek, setMilitaryWeek] = useState(1)
  const [copied, setCopied] = useState(false)

  const bmi = weight / ((height / 100) * (height / 100))
  const bmiI = bmiInfo(bmi)
  const bmr = calcBMR(gender, weight, height, age)
  const tdee = bmr * ACTIVITY_MULT[activity]
  const calories = calcCalories(tdee, goal)

  const proteinG = Math.round(proteinPerKg(goal) * weight)
  const proteinKcal = proteinG * 4
  const fatKcal = Math.round(calories * 0.25)
  const fatG = Math.round(fatKcal / 9)
  const carbsKcal = Math.max(0, calories - proteinKcal - fatKcal)
  const carbsG = Math.round(carbsKcal / 4)

  const macros = [
    { key: 'protein', label: 'Eiwit', color: 'bg-primary', g: proteinG, kcal: proteinKcal },
    { key: 'fat', label: 'Vet', color: 'bg-yellow-500', g: fatG, kcal: fatKcal },
    { key: 'carbs', label: 'Koolhydraten', color: 'bg-blue-500', g: carbsG, kcal: carbsKcal },
  ]

  const adj = setAdjust(experience)
  const isMilitary = goal === 'militair'

  const strengthSchedule = useMemo(() => SCHEDULES[days].map((focus, i) => ({ name: DAY_NAMES[i], focus })), [days])
  const militarySchedule = useMemo(() => militaryWeekSchedule(militaryWeek, gender, experience), [militaryWeek, gender, experience])
  const militaryFinal = MILITARY_NORMS[gender]
  const weekMealPlan = useMemo(() => buildWeekMealPlan(calories), [calories])

  const caloriesLabel = isMilitary
    ? 'Onderhoud (brandstof voor trainingsopbouw)'
    : goal === 'afvallen' ? 'Caloriebeperking (-20%)'
    : goal === 'opbouw' ? 'Calorieoverschot (+12%)'
    : 'Onderhoud'

  function copySummary() {
    const lines = [
      'Sport & Spier Schema',
      '',
      `Geslacht: ${gender === 'man' ? 'Man' : 'Vrouw'}`,
      `Leeftijd: ${age} jaar`,
      `Lengte: ${height} cm`,
      `Gewicht: ${weight} kg`,
      `BMI: ${bmi.toFixed(1)} (${bmiI.label})`,
      '',
      `BMR: ${Math.round(bmr)} kcal`,
      `TDEE: ${Math.round(tdee)} kcal`,
      `Calorieendoel: ${calories} kcal`,
      '',
      'Macros per dag:',
      `  Eiwit: ${proteinG} g`,
      `  Vet: ${fatG} g`,
      `  Koolhydraten: ${carbsG} g`,
      '',
      'Voedingsschema (week):',
      ...weekMealPlan.flatMap(d => [
        `  ${d.day}:`,
        ...d.meals.flatMap(m => [
          `    ${m.meal} (${m.subtotal.kcal} kcal):`,
          ...m.items.map(it => `      - ${it.label}: ${it.grams}g (${it.kcal} kcal)`),
        ]),
      ]),
      '',
    ]

    if (isMilitary) {
      lines.push(`12-weken programma naar militaire fitheid (week ${militaryWeek}/${MILITARY_WEEKS}):`)
      lines.push(`  Doel (DCP, t/m 30 jaar): ${militaryFinal.run}m in 12 min, ${militaryFinal.pushups} push-ups, ${militaryFinal.situps} sit-ups`)
      militarySchedule.forEach(d => lines.push(`  ${d.name} - ${d.type}: ${d.detail}`))
    } else {
      lines.push(`Trainingsschema (${days}x per week):`)
      strengthSchedule.forEach(({ name, focus }) => {
        if (!focus) { lines.push(`  ${name}: Rustdag`); return }
        lines.push(`  ${name} - ${FOCUS_LABELS[focus]}:`)
        EXERCISES[focus].forEach(([n, sets, reps]) => lines.push(`    - ${n}: ${Math.max(2, sets + adj)} x ${reps}`))
        CORE_FINISHER.forEach(([n, sets, reps]) => lines.push(`    - ${n}: ${sets} x ${reps}`))
      })
    }

    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

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
            <select value={gender} onChange={e => setGender(e.target.value as Gender)} className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors">
              <option value="man">Man</option>
              <option value="vrouw">Vrouw</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Leeftijd</label>
            <input type="number" min={14} max={90} value={age} onChange={e => setAge(parseInt(e.target.value) || 14)} className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Lengte (cm)</label>
            <input type="number" min={120} max={230} value={height} onChange={e => setHeight(parseInt(e.target.value) || 120)} className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Gewicht (kg)</label>
            <input type="number" min={35} max={250} step={0.5} value={weight} onChange={e => setWeight(parseFloat(e.target.value) || 35)} className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Activiteitsniveau</label>
            <select value={activity} onChange={e => setActivity(e.target.value)} className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors">
              <option value="zitten">Zittend werk, weinig beweging</option>
              <option value="licht">Licht actief (1-3x/week sport)</option>
              <option value="matig">Matig actief (3-5x/week sport)</option>
              <option value="actief">Zeer actief (6-7x/week sport)</option>
              <option value="extreem">Extreem actief (zwaar fysiek werk + sport)</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Doel</label>
            <select value={goal} onChange={e => setGoal(e.target.value as Goal)} className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors">
              <option value="afvallen">Afvallen / vet verliezen</option>
              <option value="behoud">Gewicht behouden</option>
              <option value="opbouw">Spieropbouw / bulken</option>
              <option value="militair">Van 0 naar militaire fitheid (DCP)</option>
            </select>
          </div>
          {!isMilitary && (
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Trainingsdagen per week</label>
              <select value={days} onChange={e => setDays(e.target.value)} className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors">
                <option value="3">3 dagen</option>
                <option value="4">4 dagen</option>
                <option value="5">5 dagen</option>
                <option value="6">6 dagen</option>
              </select>
            </div>
          )}
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Trainingservaring</label>
            <select value={experience} onChange={e => setExperience(e.target.value as Experience)} className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors">
              <option value="beginner">Beginner (&lt;1 jaar)</option>
              <option value="gemiddeld">Gemiddeld (1-3 jaar)</option>
              <option value="gevorderd">Gevorderd (3+ jaar)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-1 border-b border-border">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${tab === t.id ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'overzicht' && (
      <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-2xl font-black">{bmi.toFixed(1)}</div>
          <div className="text-xs text-muted-foreground mt-0.5">BMI</div>
          <div className={`text-xs mt-0.5 ${bmiI.cls}`}>{bmiI.label}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-2xl font-black">{Math.round(bmr)} kcal</div>
          <div className="text-xs text-muted-foreground mt-0.5">Rustmetabolisme (BMR)</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-2xl font-black">{Math.round(tdee)} kcal</div>
          <div className="text-xs text-muted-foreground mt-0.5">Totaal verbruik (TDEE)</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-2xl font-black text-primary">{calories} kcal</div>
          <div className="text-xs text-muted-foreground mt-0.5">{caloriesLabel}</div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4">
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground font-medium">Wanneer zie je een sixpack?</span> Vooral een laag vetpercentage maakt buikspieren zichtbaar: bij mannen vanaf ~10-12% (duidelijke six-pack bij 6-9%), bij vrouwen vanaf ~16-19%. Dat bereik je met een consistent calorietekort — dit schema voegt daarom standaard een core-afsluiter toe aan elke trainingsdag voor spierdefinitie onder dat lagere vetpercentage.
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <h2 className="font-semibold">Macro-verdeling per dag</h2>
        {macros.map(m => {
          const pct = calories > 0 ? Math.round((m.kcal / calories) * 100) : 0
          return (
            <div key={m.key}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-muted-foreground">{m.label}</span>
                <span className="font-medium">{m.g}g · {m.kcal} kcal · {pct}%</span>
              </div>
              <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${m.color}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          )
        })}
      </div>
      </>
      )}

      {tab === 'voeding' && (
        <div className="space-y-3">
          <h2 className="font-semibold text-lg">Voedingsschema — hele week</h2>
          <p className="text-sm text-muted-foreground">Voorbeeld weekmenu, elke dag geschaald naar jouw calorieëndoel van {calories} kcal. Vervang gerust producten door iets met vergelijkbare macro's.</p>
          <div className="space-y-3">
            {weekMealPlan.map(d => (
              <div key={d.day} className="bg-card border border-border rounded-xl p-4">
                <div className="font-semibold mb-2">{d.day}</div>
                <div className="space-y-1.5">
                  {d.meals.map(m => (
                    <div key={m.meal}>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{m.meal}</span>
                        <span className="text-xs text-muted-foreground">{m.subtotal.kcal} kcal</span>
                      </div>
                      <div className="text-xs text-muted-foreground/70">
                        {m.items.map(it => `${it.label} ${it.grams}g`).join(' · ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'schema' && (
      <>
      {isMilitary ? (
        <div className="space-y-3">
          <h2 className="font-semibold text-lg">12-weken programma: van 0 naar militaire fitheid</h2>
          <div className="bg-card border border-border rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">
                Doelnorm Defensie Conditieproef (t/m 30 jaar, {gender === 'man' ? 'man' : 'vrouw'}): <span className="text-foreground font-medium">{militaryFinal.run}m in 12 min · {militaryFinal.pushups} push-ups · {militaryFinal.situps} sit-ups</span>
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Testvolgorde: push-ups, sit-ups, 12-minuten hardlopen — alles binnen 2 uur afgerond. Oudere leeftijdscategorieën hebben verruimde normen.
            </p>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">
                Week: <span className="text-foreground font-medium">{militaryWeek} / {MILITARY_WEEKS}</span>
              </label>
              <input type="range" min={1} max={MILITARY_WEEKS} value={militaryWeek} onChange={e => setMilitaryWeek(+e.target.value)} className="w-full accent-primary" />
            </div>
          </div>
          <div className="space-y-3">
            {militarySchedule.map(d => (
              <div key={d.name} className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold">{d.name}</span>
                  <span className={`text-xs uppercase tracking-wide ${d.type === 'Rust' ? 'text-muted-foreground' : 'text-primary'}`}>{d.type}</span>
                </div>
                <p className="text-sm text-muted-foreground">{d.detail}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <h2 className="font-semibold text-lg">Trainingsschema</h2>
          <div className="space-y-3">
            {strengthSchedule.map(({ name, focus }) => (
              <div key={name} className="bg-card border border-border rounded-xl p-4">
                {!focus ? (
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{name}</span>
                    <span className="text-sm text-muted-foreground">Rustdag — herstel</span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{name}</span>
                      <span className="text-xs uppercase tracking-wide text-primary">{FOCUS_LABELS[focus]}</span>
                    </div>
                    {EXERCISES[focus].map(([n, sets, reps]) => (
                      <div key={n} className="flex items-center justify-between text-sm py-1 border-b border-border/50 last:border-0">
                        <span>{n}</span>
                        <span className="text-muted-foreground">{Math.max(2, sets + adj)} x {reps}</span>
                      </div>
                    ))}
                    <div className="text-xs uppercase tracking-wide text-muted-foreground/60 pt-2 pb-1">Core afsluiter</div>
                    {CORE_FINISHER.map(([n, sets, reps]) => (
                      <div key={n} className="flex items-center justify-between text-sm py-1 border-b border-border/50 last:border-0">
                        <span>{n}</span>
                        <span className="text-muted-foreground">{sets} x {reps}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      </>
      )}

      <button onClick={copySummary} className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all">
        {copied ? '✓ Gekopieerd!' : 'Kopieer volledig schema'}
      </button>

      <p className="text-xs text-muted-foreground text-center">
        Berekend met de Mifflin-St Jeor formule, ACSM-richtlijnen voor krachttraining (elke spiergroep ≥2x per week, effort-to-failure) en de ISSN position stand over eiwitinname (1.4–2.0 g/kg, hoger tijdens een dieet). Het militaire programma is gebaseerd op de Defensie Conditieproef-eisen en algemene progressieve opbouw richting fitheidstesten. Indicatief advies — geen vervanging voor medisch of sportief advies.
      </p>
    </div>
  )
}
