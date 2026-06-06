import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/auth.store";
import { axiosInstance } from "../../libs/axiosInstance";
import { Link } from "react-router-dom";
import { usePostStore } from "../../store/post.store";
import UserPosts from "../../layout/UserPost";

interface ProfileData {
  user: {
    _id: string;
    username: string;
    email: string;
    profilePic: string;
    followers: string[];
    following: string[];
  };
  posts: any[];
}

export default function Profile() {
  const authUser = useAuthStore((state) => state.authUser);
  const fetchPost = usePostStore((state) => state.getUserPosts);
  const userPosts = usePostStore((state) => state.userPosts);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        const response = await axiosInstance.get(
          `/auth/profile/${authUser?.username}`,
        );
        fetchPost();
        setProfileData(response.data);
      } catch (err: any) {
        setErrorMsg(err.response?.data?.message || "Could not find profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [authUser]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <div className="w-8 h-8 border-4 border-emerald-500 border-b-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (errorMsg || !profileData) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-red-400">
        <p>{errorMsg || "Profile not found."}</p>
      </div>
    );
  }

  const { user, posts } = profileData;
  const isOwnProfile = authUser?._id === user._id;

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-5 px-4 pb-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-8 shadow-xl">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-gray-800 bg-gray-950 shrink-0 flex items-center justify-center">
            {user.profilePic ? (
              <img
                src={user.profilePic}
                alt={user.username}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-emerald-600/10 flex items-center justify-center text-emerald-400 text-3xl font-bold uppercase">
                {user.username.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <h1 className="text-2xl font-bold tracking-tight">{user.username}</h1>
              {isOwnProfile ? (
                <Link
                  to={`/settings/profile/${authUser?.username}`}
                  className="bg-gray-800 hover:bg-gray-700 text-xs font-semibold px-4 py-2 rounded-xl border border-gray-700 transition-colors"
                >
                  Edit Profile
                </Link>
              ) : (
                <button className="bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold px-4 py-2 rounded-xl transition-colors">
                  Follow
                </button>
              )}
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-6 text-sm text-gray-300">
              <div>
                <span className="font-bold text-white">{posts?.length}</span> posts
              </div>
              <div className="cursor-pointer hover:text-white">
                <span className="font-bold text-white">{user.followers?.length || 0}</span> followers
              </div>
              <div className="cursor-pointer hover:text-white">
                <span className="font-bold text-white">{user.following?.length || 0}</span> following
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-900 mb-8" />
        {userPosts?.length === 0 ? (
          <div className="text-center py-16 bg-gray-900/50 border border-dashed border-gray-800 rounded-2xl text-gray-500">
            No posts shared yet.
          </div>
        ) : (
          <div className="w-full">
            <UserPosts posts={userPosts} />
          </div>
        )}
      </div>
    </div>
  );
}