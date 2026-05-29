import { useState,type ChangeEvent, type SubmitEvent } from "react";
import { axiosInstance } from "../../libs/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response  = await axiosInstance.post("/auth/register", formData);
      console.log(response)
      navigate("/")
    } catch (error) {
      console.error("Frontend Submission Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white lowercase">
            babal<span className="text-green-500">.</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2">Create your account to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label htmlFor="username" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Username
            </label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              value={formData.username}
              onChange={handleChange}
              placeholder="johndoe" 
              required
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 transition-colors duration-200 text-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com" 
              required
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 transition-colors duration-200 text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Password
            </label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••" 
              required
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 transition-colors duration-200 text-sm"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-500 disabled:bg-green-800 disabled:text-gray-400 text-white font-medium rounded-lg py-3 mt-2 transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Already have an account? 
            <a href="/sign-in" className="text-green-400 hover:text-green-300 font-medium transition-colors duration-200 ml-1">
              Log in
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}