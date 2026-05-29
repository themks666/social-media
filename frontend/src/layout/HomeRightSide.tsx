import { useAuthStore } from "../store/auth.store";
import { Link } from "react-router-dom";

const HomeRightSide = () => {
  const authUser  = useAuthStore((state)=>(state.authUser))
  return         <div className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-gray-900 border border-gray-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-16 bg-linear-to-r from-emerald-500/20 to-teal-500/20" />
            
            <div className="relative flex flex-col items-center text-center mt-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-950 bg-gray-900 shadow-md flex items-center justify-center mb-3">
                <div className="w-full h-full bg-emerald-600/10 text-emerald-400 font-bold text-lg flex items-center justify-center uppercase">
                  M
                </div>
              </div>

              <h3 className="font-bold text-base hover:text-emerald-400 transition-colors cursor-pointer">
                @{authUser?.username}
              </h3>
              <p className="text-xs text-gray-500">{authUser?.email}</p>

              <div className="grid grid-cols-3 gap-4 w-full border-t border-gray-800/80 mt-6 pt-4">
                <div className="text-center">
                  <span className="block text-sm font-bold text-white">0</span>
                  <span className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">Posts</span>
                </div>
                <div className="text-center border-x border-gray-800/40">
                  <span className="block text-sm font-bold text-white">{authUser?.followers.length}</span>
                  <span className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">Followers</span>
                </div>
                <div className="text-center">
                  <span className="block text-sm font-bold text-white">{authUser?.following.length}</span>
                  <span className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">Following</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800/80 rounded-2xl p-4 shadow-xl">
            <nav className="space-y-1">
              <Link to="/" className="flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl bg-emerald-500/10 text-emerald-400 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
                Feed
              </Link>
              <Link to="/explore" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/40 rounded-xl transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                Explore
              </Link>
              <Link to="/notification" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/40 rounded-xl transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                </svg>
                Notifications
              </Link>
              <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/40 rounded-xl transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                My Profile
              </Link>
            </nav>
          </div>
        </div>;
};

export default HomeRightSide;
