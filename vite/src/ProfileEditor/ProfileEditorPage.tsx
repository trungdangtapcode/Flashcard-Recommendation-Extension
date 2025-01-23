import { Link, useNavigate } from 'react-router-dom';
import './App.css'
import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { verifyToken, LogoutHandler } from '../utils/auth';

const ProfileEditorPage = () => {
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    occupation: "",
    hobbies: "",
    interests: "",
    gender: ""
  });
  const [token, setToken] = useState(localStorage.getItem("token"));
  
  const navigate = useNavigate();
  useEffect(() => {
    verifyToken((data)=>{
      const updatedProfile = {...profile};
      updatedProfile.age = data.age;
      updatedProfile.gender = data.gender;
      updatedProfile.hobbies = data.hobbies;
      updatedProfile.interests = data.interests;
      updatedProfile.name = data.name;
      updatedProfile.occupation = data.occupation;
      setProfile(updatedProfile);
    }, navigate)
    setToken(token);
  }, [token, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = import.meta.env.VITE_BACKEND_URL;
      const token = localStorage.getItem("token");
      if (!token) {
        LogoutHandler(navigate)
        return;
      }
      const {name, ...rest} = profile;
      const response = await fetch(url + "/auth/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({name: name, bio: {...rest}}),
      });
      
      const data = await response.json();
      if (response.ok) {
        toast.success('Update successful');
      } else {
        console.log(data.message);
        if (response.status === 401) {
          LogoutHandler(navigate);
        }
      }
    } catch (err) {
      toast.error('An error occurred');
      console.log(`An error occurred ${err}`);
    }
  };

  return (
    <div className='w-screen'>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Profile Editor</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={profile.age}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your age"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Occupation</label>
            <input
              type="text"
              name="occupation"
              value={profile.occupation}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your occupation"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Hobbies</label>
            <input
              type="text"
              name="hobbies"
              value={profile.hobbies}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your hobbies"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Interests</label>
            <input
              type="text"
              name="interests"
              value={profile.interests}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your interests"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Gender</label>
            <input
              type="text"
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save Profile
          </button>
          <div className='flex w-full justify-center'>
            <Link to="/card"
              className="text-black"
            >
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
    <ToastContainer />
    </div>
  );
};

export default ProfileEditorPage;
