import { useState } from "react";
import { useAuthStore } from "./../store/auth.store"; 
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-extrabold tracking-tight text-white lowercase">
            babal<span className="text-emerald-500">.</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/feed" className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200">
            Feed
          </Link>
          <Link to="/explore" className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200">
            Explore
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center space-x-6">
              <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors duration-200">
                + Create Post
              </button>
              
              <button 
                onClick={logout} 
                className="text-xs font-medium text-gray-400 hover:text-red-400 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4 border-l border-gray-800 pl-6">
              <Link 
                to="/sign-in" 
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200"
              >
                Login
              </Link>
              <Link 
                to="/sign-up" 
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors duration-200 shadow-md"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            type="button" 
            className="text-gray-400 hover:text-white focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {isOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-gray-800 space-y-3 flex flex-col">
          <Link to="/feed" className="text-sm font-medium text-gray-400 hover:text-white py-1">Feed</Link>
          <Link to="/explore" className="text-sm font-medium text-gray-400 hover:text-white py-1">Explore</Link>
          
          {/* Mobile Auth Sync */}
          {isAuthenticated ? (
            <>
              <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors duration-200">
                + Create Post
              </button>
              <button onClick={logout} className="text-left text-sm font-medium text-gray-400 hover:text-red-400 py-1">
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-800/50">
              <Link to="/sign-in" className="text-center text-sm font-medium text-gray-400 hover:text-white py-2.5 rounded-lg border border-gray-800 bg-gray-950/50">
                Login
              </Link>
              <Link to="/sign-up" className="text-center bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold py-2.5 rounded-lg">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}