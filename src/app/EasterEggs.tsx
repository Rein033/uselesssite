'use client'
import { useEffect, useState } from 'react'

const IT_CROWD_QUOTES = [
  'HELLO, IT. HAVE YOU TRIED TURNING IT OFF AND ON AGAIN?',
  'I\'M SORRY, ARE YOU FROM THE PAST?',
  'THE INTERNET IS NOT SOMETHING YOU JUST DUMP SOMETHING ON. IT\'S NOT A BIG TRUCK.',
  'MOSS: I\'VE GOT A DEGREE. ROY: IN WHAT? MOSS: TECHNICALLY... A DOCTORATE.',
  'DID YOU SEE THAT LUDICROUS DISPLAY LAST NIGHT?',
  'GOODBYE EMAIL, GOODBYE!',
  'REYNHOLM INDUSTRIES — TOMORROW\'S SOLUTIONS... YESTERDAY.',
  'I\'M THE BOSS. COULD YOU MAKE THE INTERNET?',
  '> SSH REIN@REYNHOLM-INDUSTRIES.COM',
  '> CONNECTED. WELCOME, MOSS.',
]

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

export default function EasterEggs() {
  const [showModal, setShowModal] = useState(false)
  const [seq, setSeq]             = useState<string[]>([])

  useEffect(() => {
    console.log(
      '%c HELLO, IT. ',
      'background:#000;color:#4ade80;font-size:22px;font-family:"Courier New",monospace;padding:10px 20px;border:2px solid #4ade80;letter-spacing:4px;'
    )
    IT_CROWD_QUOTES.forEach(q =>
      console.log(`%c > ${q}`, 'color:#4ade80;font-family:"Courier New",monospace;font-size:11px;')
    )
    console.log(
      '%c NOODNUMMER: 0118 999 881 999 119 725 3 ',
      'background:#000;color:#facc15;font-family:"Courier New",monospace;font-size:11px;border:1px solid #facc15;padding:4px 8px;'
    )
    console.log('%c (Vond je dit? Je bent een echte IT-er. Of Moss.) ', 'color:#166534;font-family:"Courier New",monospace;font-size:10px;')

    const handleKey = (e: KeyboardEvent) => {
      setSeq(prev => {
        const next = [...prev, e.key].slice(-KONAMI.length)
        if (next.join(',') === KONAMI.join(',')) {
          setShowModal(true)
        }
        return next
      })
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  if (!showModal) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 font-mono"
      onClick={() => setShowModal(false)}
    >
      <div className="border-2 border-green-400 bg-black p-8 max-w-md mx-4 text-center space-y-5 retro-screen">
        <div className="text-red-400 text-2xl font-bold tracking-widest animate-pulse">
          !! ALARM !!
        </div>
        <div className="border border-red-900 p-4 space-y-2 text-sm">
          <p className="text-green-300 font-bold">BRANDMELDING — REYNHOLM INDUSTRIES</p>
          <p className="text-green-600">Verdieping 4: Serverruimte</p>
          <p className="text-green-600 text-xs mt-2">
            "Moss had een kaars aangestoken om de sfeer te bevorderen."
          </p>
        </div>
        <div>
          <p className="text-yellow-400 font-bold text-lg tracking-widest">
            0118 999 881 999 119 725 3
          </p>
          <p className="text-green-700 text-xs mt-1">Bel dit nummer bij noodgevallen</p>
        </div>
        <button
          className="text-xs text-green-700 hover:text-green-400 border border-green-900 hover:border-green-600 px-4 py-2 transition-colors w-full"
          onClick={() => setShowModal(false)}
        >
          [ SLUITEN ] — "Have you tried turning it off and on again?"
        </button>
      </div>
    </div>
  )
}
