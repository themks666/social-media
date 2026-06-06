import { Heart } from "lucide-react";

interface Post {
  _id: string;
  image: string;
  caption: string;
  likes: string[];
}

interface PublishedContentProps {
  posts: Post[];
}

export default function UserPosts({ posts = [] }: PublishedContentProps) {
  return (
    <div className="space-y-6 w-full">
      <div className="border-b border-gray-800/80 pb-3 flex items-center justify-between">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Published Content ({posts.length})
        </h3>
      </div>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {posts.map((post) => (
            <div 
              key={post._id} 
              className="group bg-gray-900 border border-gray-800/70 rounded-xl overflow-hidden shadow-md flex flex-col w-full transition-all duration-300 hover:border-gray-700/60 hover:shadow-lg"
            >
              <div className="aspect-square w-full bg-gray-950 overflow-hidden relative">
                <img
                  src={post.image || "https://picsum.photos/400"}
                  alt={post.caption || "Post asset"}
                  className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-102"
                />
              </div>
              <div className="p-4 flex flex-col justify-between flex-1 space-y-4">
                <p className="text-sm text-gray-200 line-clamp-2 leading-relaxed font-medium">
                  {post.caption || <span className="text-gray-600 italic">No caption provided.</span>}
                </p>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 pt-2 border-t border-gray-800/50 group-hover:text-rose-400 transition-colors">
                  <Heart className="w-3.5 h-3.5 fill-transparent stroke-current transition-colors group-hover:fill-rose-500/10" />
                  <span>{post.likes?.length || 0} likes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      ) : (
        <div className="text-center py-16 bg-gray-900/20 border border-dashed border-gray-800/80 rounded-2xl max-w-sm mx-auto w-full">
          <p className="text-sm text-gray-500">No publications shared yet.</p>
        </div>
      )}
    </div>
  );
}