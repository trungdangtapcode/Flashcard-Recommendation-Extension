import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { verifyToken } from "../utils/auth";

const DeckCreatePage = () => {
	const [deckName, setDeckName] = useState<string>("");
	const [deckDescription, setDeckDescription] = useState<string>("");
	
	const navigate = useNavigate();
	useEffect(() => {
		verifyToken(()=>{},navigate)
	}, []);
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const url = import.meta.env.VITE_BACKEND_URL;
			const token = localStorage.getItem("token");
			if (!token) {
				navigate("/login");
				return;
			}
			const response = await fetch(url + "/account/createDeck", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ name: deckName, description: deckDescription }),
			});
			
			if (response.ok) {
				toast.success("Deck created successfully");
				setTimeout(()=>{navigate("/deckhome");}, 2000);
			}
		} catch (err) {
			toast.error(`An error occurred ${err}`);
		}
	}

	return (
	<div className="w-screen">
	<div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Create Deck</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="deckName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Deck Name
            </label>
            <input
              type="text"
              id="deckName"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
              placeholder="Enter deck name"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={deckDescription}
              onChange={(e) => setDeckDescription(e.target.value)}
              placeholder="Enter deck description"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Create Deck
          </button>
        </form>
      </div>
    </div>
	<ToastContainer/>
	</div>
	)
}

export default DeckCreatePage;