import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { axiosInstance } from "../../libs/axiosInstance";
import { useAuthStore } from "../../store/auth.store";
import { Navigate, useNavigate } from "react-router-dom";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const setAuthUser = useAuthStore((state) => (state.setAuthUser));
  const isAuthenticated = useAuthStore((state) => (state.isAuthenticated));
  const navigate = useNavigate()
  const [formData, setFormData] = useState<LoginFormData>({
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
  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("auth/login", formData);
      setAuthUser(response.data.userWithoutPassword);
      navigate("/")
    } catch (error) {
      console.error("Login Submission Error:", error);
    } finally {
      setLoading(false);
    }
  };
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white lowercase">
            babal<span className="text-emerald-500">.</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Welcome back! Please sign in
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2"
            >
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
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors duration-200 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2"
            >
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
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors duration-200 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-emerald-500 disabled:bg-emerald-800 disabled:text-gray-400 text-white font-medium rounded-lg py-3 mt-2 transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Don't have an account?
            <a
              href="/sign-up"
              className="text-green-600 hover:text-emerald-300 font-medium transition-colors duration-200 ml-1"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
