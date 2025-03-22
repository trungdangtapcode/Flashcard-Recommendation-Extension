import { useState, useEffect } from "react";
import "./App.css";
// import axios from "axios";
import Question from "./Question.tsx";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { toast, ToastContainer } from 'react-toastify';
import { LogoutHandler, ProfileHandler, verifyToken } from "../utils/auth.tsx";



const FlashcardPage = () => {
const [questions, setQuestions] = useState<IQuestion[]>([]);
const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
const [isLoading, setIsLoading] = useState<boolean>(false);
const dataUrl = import.meta.env.VITE_BACKEND_URL + "/query/question";

interface IBody {
	historyUrls?: string[],
	corpus?: string
}

const fetchQuestions = async () => {
try {
	const fetchFromBody = async (body:IBody ) => {
		const token = localStorage.getItem("token");
		const bodyString: string = JSON.stringify(body);
		setIsLoading(true);

		const response = await fetch(dataUrl, {
			method: 'POST',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			  'Authorization': `Bearer ${token}`,
			  "ngrok-skip-browser-warning": "2705",
			},
			body: bodyString
		});
		
		const data = await response.json();
		if (!response.ok) {
			toast.error("Failed to fetch BODY");
			console.error("Failed to fetch BODY: ", data);
			return;
		}

		setQuestions((prev) => [...prev, ...data]);
	}

	const getDataChromeStorage = () : Promise<IBody> => {
	  	return new Promise((resolve, reject) => {
			const body: IBody  =  {};
			if (chrome!==undefined && chrome.storage!==undefined) {
				chrome.storage.local.get(["savedEnglishHistoryUrl", "savedEnglishTexts"], (data)=>{
					const urls = data.savedEnglishHistoryUrl;
					if (chrome.runtime.lastError) {
						reject(chrome.runtime.lastError);
					}
					if (urls)
						body.historyUrls = urls.map((item: {url: string}) => item.url);

					const texts = data.savedEnglishTexts;
					if (texts){
						const combinedText = texts.join(" ");
						body.corpus = combinedText;
					}
					resolve(body);
				});
			} else {
				resolve(body); //empty
			}
	  	});
	}
	const body = await getDataChromeStorage();
	await fetchFromBody(body)
} catch (error) {
	toast.error("Failed to fetch questions");
	console.error("Error fetching questions:", error);
} finally {
	setIsLoading(false);
}
};

const navigate = useNavigate();
// const [value] = useChromeStorageLocal('savedEnglishHistoryUrl', 1);

useEffect(() => {
	verifyToken(()=>{},navigate);
}, []);
const logoutHandler = () => {
	LogoutHandler(navigate);	
}
const profileHandler = () => {
	ProfileHandler(navigate);
}
const deckEditorHandler = () => {
	navigate("/deckhome");
}


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
				hover:bg-blue-500 hover:text-white">PROFILE</button>
			<button onClick={deckEditorHandler}
				className="text-black px-2 rounded-none
				hover:bg-teal-400 hover:text-white">DECKS
				</button>
			<button onClick={logoutHandler}
				className="text-black px-2 rounded-none
				hover:bg-red-600 hover:text-white">LOG OUT</button>
		</div>
		{isLoading && <ColorRing
			visible={true}
			height="80"
			width="80"
			ariaLabel="color-ring-loading"
			wrapperStyle={{}}
			wrapperClass="color-ring-wrapper"
			colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
		/>}
		{currentQuestion ? (
			<Question
			word_id={ currentQuestion.word_id}
			question={currentQuestion.question}
			answers={currentQuestion.answers}
			correctId={currentQuestion.correct_id}
			onNext={handleNextQuestion}
			/>
		) : (
			!isLoading && <p>No questions available.</p>
		)}
    </div>
	<ToastContainer/>
	</div>
  );
};

export default FlashcardPage;
