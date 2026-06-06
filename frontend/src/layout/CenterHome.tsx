import FeedCard from "../components/FeedCard";
import { usePostStore } from "../store/post.store";
import type { Post } from "../types/types";

const CenterHome = () => {
  const posts: Post[] = usePostStore((state) => state.posts);
  const isFetchingData = usePostStore((state) => state.isFetchingPosts);
  if (isFetchingData) {
    return "Fetching data...";
  }
  return (
    <div className="col-span-1 lg:col-span-6 space-y-6">
      <div className="bg-gray-900 border border-gray-800/80 rounded-2xl p-5 shadow-xl">
        <form className="space-y-4">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center uppercase shrink-0">
              M
            </div>

            <div className="flex-1">
              <textarea
                rows={2}
                placeholder="What's on your mind?"
                className="w-full bg-transparent border-0 resize-none text-sm placeholder:text-gray-500 focus:ring-0 focus:outline-none text-white py-1.5"
              />
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-gray-800/80 pt-4">
            <button
              type="button"
              className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-emerald-400 transition-all bg-gray-950/40 hover:bg-emerald-500/5 px-3 py-2 rounded-xl border border-gray-800 hover:border-emerald-500/20"
            >
              <svg
                className="w-4 h-4 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Attach Image
            </button>

            <input type="file" accept="image/*" className="hidden" />

            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-xs px-5 py-2 rounded-xl cursor-pointer transition-all"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
      {posts?.map((post) => {

        return (
          <FeedCard
            key={post._id}
            _id={post._id}
            tags={post.tags}
            image={post.image}
            caption={post.caption}
            comments={post.comment}
            author={post.author}
            likes={post.likes}
            createdAt={post.createdAt}
          />
        );
      })}
    </div>
  );
};

export default CenterHome;
