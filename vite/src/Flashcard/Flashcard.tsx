import { useState, useEffect, useRef } from 'react'

export default function Flashcard({ flashcard }: { flashcard: IFlashcardItem }) {
  const [flip, setFlip] = useState(false)
  const [height, setHeight] = useState<number | string>('initial')

  const frontEl = useRef<HTMLDivElement>(null)
  const backEl = useRef<HTMLDivElement>(null)

  function setMaxHeight() {
    const frontHeight = frontEl.current ? (frontEl.current as HTMLElement).getBoundingClientRect().height : undefined;
    const backHeight = backEl.current ? (backEl.current as HTMLElement).getBoundingClientRect().height : 0;
    setHeight(Math.max(frontHeight || 0, backHeight || 0, 100))
  }
  useEffect(setMaxHeight, [flashcard.question, flashcard.answer, flashcard.options])
  useEffect(() => {
    window.addEventListener('resize', setMaxHeight)
    return () => window.removeEventListener('resize', setMaxHeight)
  }, [])

  return (
    <div
      className={`card ${flip ? 'flip' : ''}`}
      style={{ height: height }}
      onClick={() => setFlip(!flip)}
    >
      <div className="front" ref={frontEl}>
        {flashcard.question}
        <div className="flashcard-options">
          {flashcard.options.map(option => {
            return <div className="flashcard-option" key={option}>{option}</div>
          })}
        </div>
      </div>
      <div className="back" ref={backEl}>{flashcard.answer}</div>
    </div>
  )
}