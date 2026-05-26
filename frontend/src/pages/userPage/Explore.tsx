import React, { useState } from "react";

// Mock Trending Topics
const TRENDING_TAGS = [
  { name: "all", count: null },
  { name: "mernstack", count: "12.4k" },
  { name: "photography", count: "8.2k" },
  { name: "uidesign", count: "5.1k" },
  { name: "webdevelopment", count: "15.9k" },
  { name: "mountainviews", count: "3.4k" },
  { name: "minimalism", count: "2.8k" }
];
const GLOBAL_EXPLORE_POSTS = [
  {
    id: "exp-1",
    tag: "webdevelopment",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    author: { username: "syntax_error", profilePic: "" },
    caption: "Wrote a custom middleware engine today to optimize asset delivery pipelines. The code is looking beautiful! 💻🔥",
    likes: 342,
    commentsCount: 24,
    aspect: "aspect-video"
  },
  {
    id: "exp-2",
    tag: "photography",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800",
    author: { username: "lens_craft", profilePic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100" },
    caption: "Chasing foggy mornings in the deep forests. Nature never fails to inspire. 🌲🌫️",
    likes: 512,
    commentsCount: 45,
    aspect: "aspect-square"
  },
  {
    id: "exp-3",
    tag: "uidesign",
    image: null, // Text-only post card to test layouts
    author: { username: "figma_sensei", profilePic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" },
    caption: "UI Tip: Never use pure black (#000000) for dark interfaces. Use very dark slate or navy grays (like #090d16) to give the layout visual depth and reduce eye fatigue. babal. nailed this perfectly! 🙌",
    likes: 189,
    commentsCount: 12,
    aspect: "aspect-auto"
  },
  {
    id: "exp-4",
    tag: "mernstack",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    author: { username: "fullstack_manish", profilePic: "" },
    caption: "Direct frontend uploads with unsigned presets straight to Cloudinary bypasses the server perfectly. Highly recommend this stack setup! 🌐⚡",
    likes: 298,
    commentsCount: 19,
    aspect: "aspect-square"
  },
  {
    id: "exp-5",
    tag: "mountainviews",
    image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800",
    author: { username: "everest_summit", profilePic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" },
    caption: "The majesty of the Himalayas. Looking straight up at the roof of the world from base camp. 🏔️✨",
    likes: 724,
    commentsCount: 56,
    aspect: "aspect-video"
  },
  {
    id: "exp-6",
    tag: "minimalism",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800",
    author: { username: "spatial_studies", profilePic: "" },
    caption: "Structured negative space is just as informative as active elements.",
    likes: 143,
    commentsCount: 8,
    aspect: "aspect-square"
  }
];

// Recommended Creators for discovery shelf
const DISCOVER_CREATORS = [
  { id: "c-1", username: "alex_designs", bio: "UI Architect & Figma Wizard", profilePic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100", isFollowing: false },
  { id: "c-2", username: "backend_beast", bio: "Express/MongoDB Optimization nerd", profilePic: "", isFollowing: false },
  { id: "c-3", username: "pixel_pioneer", bio: "Visual storyteller & travel photographer", profilePic: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100", isFollowing: false }
];

export default function Explore() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [creators, setCreators] = useState(DISCOVER_CREATORS);
  const [posts, setPosts] = useState(GLOBAL_EXPLORE_POSTS);
  const filteredPosts = posts.filter(post => {
    const matchesTab = activeTab === "all" || post.tag === activeTab;
    const matchesSearch = 
      post.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleFollow = (id:string) => {
    setCreators(creators.map(c => c.id === id ? { ...c, isFollowing: !c.isFollowing } : c));
  };

  return (
    <div className=" h-full bg-gray-950 text-gray-100 pt-10 pb-12 px-4 md:px-8 selection:bg-emerald-500/30 selection:text-emerald-300">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-500 bg-clip-text text-transparent">
            Explore Community
          </h1>
          <p className="text-xs text-gray-400">Discover trending topics, viral captions, and new creators across babal.</p>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-emerald-400 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts, tags, or creators..."
              className="w-full bg-gray-900/80 border border-gray-800/80 focus:border-emerald-500/50 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3)] placeholder:text-gray-600"
            />
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-1">Trending Topics</h3>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
            {TRENDING_TAGS.map((tag) => (
              <button
                key={tag.name}
                onClick={() => setActiveTab(tag.name)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  activeTab === tag.name 
                    ? "bg-emerald-500 text-gray-950 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]" 
                    : "bg-gray-900/40 text-gray-400 border-gray-800 hover:border-gray-700 hover:text-white"
                }`}
              >
                <span>#{tag.name}</span>
                {tag.count && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-md ${
                    activeTab === tag.name ? "bg-emerald-600/30 text-emerald-950" : "bg-gray-800 text-gray-500"
                  }`}>
                    {tag.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        {searchQuery === "" && (
          <div className="bg-gray-900 border border-gray-800/80 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Suggested Creators</h3>
              <span className="text-[10px] text-emerald-400 font-semibold cursor-pointer hover:underline">See all</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {creators.map((user) => (
                <div key={user.id} className="bg-gray-950/50 border border-gray-800/50 hover:border-gray-800 rounded-xl p-4 flex items-center justify-between transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full border border-gray-800 bg-gray-900 flex items-center justify-center overflow-hidden shrink-0">
                      {user.profilePic ? (
                        <img src={user.profilePic} alt="creator avatar" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-emerald-600/10 text-emerald-400 font-bold text-sm flex items-center justify-center uppercase">
                          {user.username.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-white hover:text-emerald-400 transition-colors cursor-pointer">@{user.username}</h4>
                      <p className="text-[10px] text-gray-500 truncate max-w-[150px]">{user.bio}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleFollow(user.id)}
                    className={`text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors ${
                      user.isFollowing 
                        ? "bg-gray-800 text-gray-400 hover:bg-gray-700" 
                        : "bg-emerald-500 text-gray-950 hover:bg-emerald-400"
                    }`}
                  >
                    {user.isFollowing ? "Following" : "Follow"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="space-y-4">
          <div className="flex items-center justify-between pl-1">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Discover Content</h3>
            <span className="text-xs text-gray-500">{filteredPosts.length} results</span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-gray-900/40 border border-dashed border-gray-800 rounded-2xl text-gray-500">
              <svg className="w-8 h-8 mx-auto mb-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              No matching explore cards found. Try another search query!
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
              {filteredPosts.map((post) => (
                <div 
                  key={post.id} 
                  className="break-inside-avoid bg-gray-900 border border-gray-800/80 rounded-2xl overflow-hidden shadow-lg hover:border-gray-800 transition-all group cursor-pointer relative"
                >
                  {post.image ? (
                    <div className="relative overflow-hidden bg-gray-950 max-h-80">
                      <img 
                        src={post.image} 
                        alt="explore asset" 
                        className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 bg-gray-950/75 backdrop-blur-md text-[9px] font-bold text-emerald-400 px-2 py-1 rounded-md border border-gray-800">
                        #{post.tag}
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 bg-gradient-to-br from-gray-900 to-gray-950 border-b border-gray-800/50">
                      <div className="inline-block bg-emerald-500/10 text-[9px] font-bold text-emerald-400 px-2 py-1 rounded-md border border-emerald-500/10 mb-3">
                        #{post.tag}
                      </div>
                      <p className="text-sm text-gray-300 italic leading-relaxed">"{post.caption}"</p>
                    </div>
                  )}
                  <div className="p-4 bg-gray-900 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full border border-gray-800 bg-gray-950 overflow-hidden flex items-center justify-center shrink-0">
                        {post.author.profilePic ? (
                          <img src={post.author.profilePic} alt="author" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-emerald-600/10 text-emerald-400 font-bold text-[9px] flex items-center justify-center uppercase">
                            {post.author.username.charAt(0)}
                          </div>
                        )}
                      </div>
                      <span className="font-bold text-gray-300 hover:text-white">@{post.author.username}</span>
                    </div>

                    <div className="flex items-center space-x-3 text-gray-500 text-[10px]">
                      <span className="flex items-center gap-1 hover:text-red-400 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                        {post.commentsCount}
                      </span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}