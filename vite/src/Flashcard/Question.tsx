// Question.jsx
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const Question = ({ question, answers, correctId, onNext }: IQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number|null>(null);
  const [showCorrect, setShowCorrect] = useState(false);

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
    setShowCorrect(true);
  };

  const handleNextClick = () => {
    setSelectedAnswer(null);
    setShowCorrect(false);
    onNext();
  };

  return (
    <div className="w-full max-w-md bg-white p-6 shadow-md rounded-md text-black">
      <h2 className="text-lg font-semibold mb-4">{question}</h2>
      <ul className="space-y-2">
        {answers.map((answer, index) => (
          <li
            key={index}
            className={`p-2 rounded-md cursor-pointer border ${
              showCorrect
                ? index === correctId
                  ? 'bg-green-200'
                  : index === selectedAnswer
                  ? 'bg-red-200'
                  : ''
                : 'hover:bg-gray-100'
            }`}
            onClick={() => !showCorrect && handleAnswerClick(index)}
          >
            {answer}
          </li>
        ))}
      </ul>
      
      {showCorrect && (
        <div className="mt-4">
            <p className="text-sm mb-2">Rate your confident</p>
            {/* an array of button value 1 to 5 is score of question */}
            <div className='flex justify-between'>
            {[1, 2, 3, 4, 5].map((score) =>{
                const bg_color = ['bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-indigo-500']
                return (
                <button
                    key={score}
                    className={
                        twMerge(
                        `px-2 mx-1 py-2 text-white rounded-md 
                        border-dashed border-2 border-white
                        hover:shadow-md hover:border-transparent
                        flex-grow
                        `,
                        bg_color[score - 1]
                    )}
                    onClick={handleNextClick}
                >
                    {score}
                </button>
                )
            })}
            </div>
        </div>
      )}
    </div>
  );
};

export default Question;
