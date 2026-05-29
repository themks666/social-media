import { axiosInstance } from "../libs/axiosInstance";
import { useAuthStore } from "../store/auth.store";

const HomeLeftSide = () => {
  const AllUsers = useAuthStore((state) => state.allUsers);
  const handleFollowRequest = async (id: string) => {
    const response = await axiosInstance.put(`/auth/follow/${id}`);
    console.log(response);
    
  };
  return (
    <div className="hidden lg:block lg:col-span-3 space-y-6">
      <div className="bg-gray-900 border border-gray-800/80 rounded-2xl p-5 shadow-xl space-y-4">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Suggested For You
        </h3>

        {AllUsers?.map((user) => {
          return (
            <div className="space-y-4" key={user._id}>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-800 bg-gray-950 flex items-center justify-center shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h4 className="font-bold text-white hover:text-emerald-400 cursor-pointer">
                      {user.username}
                    </h4>
                    <p className="text-[9px] text-gray-500">
                      {user.followers.length} followers
                    </p>
                  </div>
                </div>

                <button
                  className="font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer bg-emerald-500 text-gray-950 hover:bg-emerald-400"
                  onClick={()=>handleFollowRequest(user._id)}
                >
                  Follow
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-4 text-[10px] text-gray-600 space-y-1.5">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <a href="#" className="hover:text-gray-400 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-400 transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-gray-400 transition-colors">
            Cookie Policy
          </a>
        </div>
        <p>© 2026 babal Inc. Crafted dynamically.</p>
      </div>
    </div>
  );
};

export default HomeLeftSide;
