// import React from 'react'
import Flashcard from './Flashcard';

interface FlashcardListProps {
  flashcards: IFlashcardItem[];
}

export default function FlashcardList({ flashcards }: FlashcardListProps) {
  return (
    <div className="card-grid">
      {flashcards.map(flashcard => {
        return <Flashcard flashcard={flashcard} key={flashcard.id} />
      })}
    </div>
  )
}