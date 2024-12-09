
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import './style.css'

function App() {
  const [count, setCount] = useState(0)

  const increment = (e)=>{
    e.preventDefault();
    console.log(count,import.meta.env.VITE_SOME_KEY)
    setCount((count) => count + 1)
  }


  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 w-screen">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Login</h2>
        <form onSubmit={increment}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value="a@gmail.com"
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value="a@gmail.com"
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="button"
            onClick={increment}
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="#"
            className="text-blue-500 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
    </>
  )
}

export default App
