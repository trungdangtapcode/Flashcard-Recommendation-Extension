import { useState, useEffect } from "react";
import "./App.css";
// import axios from "axios";
import Question from "./Question.tsx";
import { useNavigate } from "react-router-dom";

// import {useChromeStorageLocal} from 'use-chrome-storage';

// const FlashcardPagetmp = () => {
//   const [flashcards, setFlashcards] = useState([]);
//   const [categories, setCategories] = useState<ICategories[]>([]);

//   const categoryEl = useRef<HTMLSelectElement | null>(null);
//   const amountEl = useRef<HTMLInputElement | null>(null);

//   const verifyToken = async () => {
//     try {
//       const url = import.meta.env.VITE_BACKEND_URL;
//       const token = localStorage.getItem("token");
//       const response = await fetch(url + "/auth/status", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await response.json();
//       if (response.ok) {
//         console.log(data);
//       } else {
//         console.log(data.message);
//       }
//     } catch (err) {
//       console.log(`An error occurred ${err}`);
//     }
//   };

//   useEffect(() => {
//     axios.get("https://opentdb.com/api_category.php").then((res) => {
//       setCategories(res.data.trivia_categories);
//     });
//   }, []);

//   useEffect(() => {
//     verifyToken();
//   }, []);

//   function decodeString(str: string) {
//     const textArea = document.createElement("textarea");
//     textArea.innerHTML = str;
//     return textArea.value;
//   }

//   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     axios
//       .get("https://opentdb.com/api.php", {
//         params: {
//           amount: amountEl.current?.value,
//           category: categoryEl.current?.value,
//         },
//       })

//       .then((res) => {
//         setFlashcards(
//           res.data.results.map(
//             (questionItem: IFlashcardItem, index: number) => {
//               const answer = decodeString(questionItem.correct_answer);
//               const options = [
//                 ...questionItem.incorrect_answers.map((a) => decodeString(a)),
//                 answer,
//               ];
//               return {
//                 id: `${index}-${Date.now()}`,
//                 question: decodeString(questionItem.question),
//                 answer: answer,
//                 options: options.sort(() => Math.random() - 0.5),
//               };
//             }
//           )
//         );
//       });
//   }

//   return (
//     <>
//       <button onClick={logoutHandler}>LOG OUT</button>
//       <form className="header" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="category">Category</label>
//           <select id="category" ref={categoryEl}>
//             {categories.map((category) => {
//               return (
//                 <option value={category.id} key={category.id}>
//                   {category.name}
//                 </option>
//               );
//             })}
//           </select>
//         </div>
//         <div className="form-group">
//           <label htmlFor="amount">Number of Questions</label>
//           <input
//             type="number"
//             id="amount"
//             min="1"
//             step="1"
//             defaultValue={10}
//             ref={amountEl}
//           />
//         </div>
//         <div className="form-group">
//           <button className="btn">Generate</button>
//         </div>
//       </form>
//       <div className="container">
//         <FlashcardList flashcards={flashcards} />
//       </div>
//     </>
//   );
// };

const FlashcardPage = () => {
const [questions, setQuestions] = useState<IQuestion[]>([]);
const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
const [isLoading, setIsLoading] = useState<boolean>(false);
const dataUrl = import.meta.env.VITE_BACKEND_URL + "/questions";

const fetchQuestions = async () => {
try {
	setIsLoading(true);
	const response = await fetch(dataUrl);
	const data = await response.json();
	setQuestions((prev) => [...prev, ...data]);
} catch (error) {
	console.error("Error fetching questions:", error);
} finally {
	setIsLoading(false);
}
};

const navigate = useNavigate();
const logoutHandler = () => {
	localStorage.removeItem("token");
	navigate("/login");
};
const profileHandler = () => {
	navigate("/profile");
}

const verifyToken = async () => {
	try {
		const url = import.meta.env.VITE_BACKEND_URL;
		const token = localStorage.getItem("token");
		const response = await fetch(url + "/auth/status", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		});
		const data = await response.json();
		if (response.ok) {
		console.log(data);
		} else {
			console.log(data.message);
			if (response.status === 401) {
				logoutHandler();
			}
		}
	} catch (err) {
		console.log(`An error occurred ${err}`);
	}
};
// const [value] = useChromeStorageLocal('savedEnglishHistoryUrl', 1);

useEffect(() => {
	verifyToken();
	// chrome.storage.local.get("savedEnglishHistoryUrl", function(data) {
	// 	console.log(data.savedEnglishHistoryUrl);
	// });
	console.log(localStorage.getItem("savedEnglishHistoryUrl"));
}, []);

useEffect(() => {
if (questions.length === 0) {
	fetchQuestions();
}
}, [questions]);

const handleNextQuestion = () => {
if (currentQuestionIndex + 1 >= questions.length) {
	fetchQuestions();
}
setCurrentQuestionIndex((prev) => prev + 1);
};

const currentQuestion = questions[currentQuestionIndex];

return (
	<div className="w-screen">
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
    	<div className="w-full max-w-md ">
			<button onClick={profileHandler}
				className="text-black px-2 rounded-none
				hover:bg-blue-500 hover:text-white">EDIT</button>
			<button onClick={logoutHandler}
				className="text-black px-2 rounded-none
				hover:bg-red-600 hover:text-white">LOG OUT</button>
		</div>
		{isLoading && <p>Loading questions...</p>}
		{currentQuestion ? (
			<Question
			question={currentQuestion.question}
			answers={currentQuestion.answers}
			correctId={currentQuestion.correct_id}
			onNext={handleNextQuestion}
			/>
		) : (
			!isLoading && <p>No questions available.</p>
		)}
    </div>
	</div>
  );
};

export default FlashcardPage;
