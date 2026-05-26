import React, { useState, useRef } from "react";
interface AuthUser {
  username: string;
  email: string;
  profilePic: string;
  followers: string[];
  following: string[];
}

interface Author {
  username: string;
  profilePic: string;
  isVerified?: boolean;
}

interface Comment {
  id: string;
  author: string;
  text: string;
}

interface Post {
  id: string;
  author: Author;
  caption: string;
  image: string | null;
  likes: number;
  hasLiked: boolean;
  comments: Comment[];
  createdAt: string;
}

interface SuggestedUser {
  id: string;
  username: string;
  followersCount: number;
  profilePic: string;
  isFollowing: boolean;
}

interface CommentTextsState {
  [postId: string]: string;
}

const MOCK_AUTH_USER: AuthUser = {
  username: "manish",
  email: "manish@babal.com",
  profilePic: "",
  followers: ["user1", "user2", "user3"],
  following: ["user4", "user5"],
};

const INITIAL_POSTS: Post[] = [
  {
    id: "post-1",
    author: {
      username: "sarah_codes",
      profilePic:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      isVerified: true,
    },
    caption:
      "Just deployed the new websocket server for real-time notifications on babal.! The latency is down to 14ms. Absolutely loving this dark theme 🚀💻",
    image: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=800",
    likes: 42,
    hasLiked: false,
    comments: [
      {
        id: "c1",
        author: "dev_alex",
        text: "Incredible latency numbers! Is that running on Go or Node?",
      },
      {
        id: "c2",
        author: "sarah_codes",
        text: "@dev_alex Pure Node with cluster clustering on my Linux server!",
      },
    ],
    createdAt: "2 hours ago",
  },
  {
    id: "post-2",
    author: {
      username: "mountain_explorer",
      profilePic:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      isVerified: false,
    },
    caption:
      "Woke up early to catch the sunrise over Gokarna hills today. There's a certain magic in the quiet hours of the morning. 🏔️🌤️",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    likes: 128,
    hasLiked: true,
    comments: [],
    createdAt: "5 hours ago",
  },
  {
    id: "post-3",
    author: {
      username: "minimalist_design",
      profilePic: "",
      isVerified: false,
    },
    caption:
      "Remember: good design is as little design as possible. Keep your elements intentional, your spacing spacious, and your visual hierarchy absolute.",
    image: null,
    likes: 19,
    hasLiked: false,
    comments: [
      {
        id: "c3",
        author: "manish",
        text: "This is exactly what we kept in mind while coding the new babal. landing page cards!",
      },
    ],
    createdAt: "1 day ago",
  },
];

const SUGGESTED_USERS: SuggestedUser[] = [
  {
    id: "s1",
    username: "aurora_sky",
    followersCount: 1240,
    profilePic:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    isFollowing: false,
  },
  {
    id: "s2",
    username: "node_master",
    followersCount: 890,
    profilePic: "",
    isFollowing: false,
  },
  {
    id: "s3",
    username: "pixel_craft",
    followersCount: 4320,
    profilePic:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100",
    isFollowing: false,
  },
];

export default function HomeWithAuth() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [suggested, setSuggested] = useState<SuggestedUser[]>(SUGGESTED_USERS);
  const [newCaption, setNewCaption] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [activeCommentsDrawer, setActiveCommentsDrawer] = useState<
    string | null
  >(null);
  const [newCommentTexts, setNewCommentTexts] = useState<CommentTextsState>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const triggerFileSelect = (): void => {
    fileInputRef.current?.click();
  };

  const removeSelectedImage = (): void => {
    setSelectedFile(null);
    setImagePreview(null);
  };

  const handleCreatePost = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!newCaption.trim() && !imagePreview) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: {
        username: MOCK_AUTH_USER.username,
        profilePic: MOCK_AUTH_USER.profilePic,
        isVerified: true,
      },
      caption: newCaption,
      image: imagePreview,
      likes: 0,
      hasLiked: false,
      comments: [],
      createdAt: "Just now",
    };

    setPosts([newPost, ...posts]);
    setNewCaption("");
    setSelectedFile(null);
    setImagePreview(null);
  };

  const toggleLike = (postId: string): void => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.hasLiked ? post.likes - 1 : post.likes + 1,
            hasLiked: !post.hasLiked,
          };
        }
        return post;
      }),
    );
  };

  const handleAddComment = (
    e: React.SubmitEvent<HTMLFormElement>,
    postId: string,
  ): void => {
    e.preventDefault();
    const commentText = newCommentTexts[postId];
    if (!commentText || !commentText.trim()) return;

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                id: `comment-${Date.now()}`,
                author: MOCK_AUTH_USER.username,
                text: commentText.trim(),
              },
            ],
          };
        }
        return post;
      }),
    );

    setNewCommentTexts({
      ...newCommentTexts,
      [postId]: "",
    });
  };

  const handleFollowSuggested = (userId: string): void => {
    setSuggested(
      suggested.map((user) => {
        if (user.id === userId) {
          return { ...user, isFollowing: !user.isFollowing };
        }
        return user;
      }),
    );
  };

  return (
    <div className="h-full bg-gray-950 text-gray-100 flex justify-center selection:bg-emerald-500/30 selection:text-emerald-300">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 md:px-8 pt-5 pb-12">
        <div className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-gray-900 border border-gray-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-emerald-500/20 to-teal-500/20" />

            <div className="relative flex flex-col items-center text-center mt-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-950 bg-gray-900 shadow-md flex items-center justify-center mb-3">
                {MOCK_AUTH_USER.profilePic ? (
                  <img
                    src={MOCK_AUTH_USER.profilePic}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-emerald-600/10 text-emerald-400 font-bold text-lg flex items-center justify-center uppercase">
                    {MOCK_AUTH_USER.username.charAt(0)}
                  </div>
                )}
              </div>

              <h3 className="font-bold text-base hover:text-emerald-400 transition-colors cursor-pointer">
                @{MOCK_AUTH_USER.username}
              </h3>
              <p className="text-xs text-gray-500">{MOCK_AUTH_USER.email}</p>

              <div className="grid grid-cols-3 gap-4 w-full border-t border-gray-800/80 mt-6 pt-4">
                <div className="text-center">
                  <span className="block text-sm font-bold text-white">
                    {
                      posts.filter(
                        (p) => p.author.username === MOCK_AUTH_USER.username,
                      ).length
                    }
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">
                    Posts
                  </span>
                </div>
                <div className="text-center border-x border-gray-800/40">
                  <span className="block text-sm font-bold text-white">
                    {MOCK_AUTH_USER.followers.length}
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">
                    Followers
                  </span>
                </div>
                <div className="text-center">
                  <span className="block text-sm font-bold text-white">
                    {MOCK_AUTH_USER.following.length}
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">
                    Following
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800/80 rounded-2xl p-4 shadow-xl">
            <nav className="space-y-1">
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl bg-emerald-500/10 text-emerald-400 transition-all"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Feed
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/40 rounded-xl transition-all"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Explore
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/40 rounded-xl transition-all"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                Notifications
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/40 rounded-xl transition-all"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                My Profile
              </a>
            </nav>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-6 space-y-6">
          <div className="bg-gray-900 border border-gray-800/80 rounded-2xl p-5 shadow-xl">
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center uppercase shrink-0">
                  {MOCK_AUTH_USER.username.charAt(0)}
                </div>

                <div className="flex-1">
                  <textarea
                    rows={2}
                    value={newCaption}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setNewCaption(e.target.value)
                    }
                    placeholder={`What's on your mind, ${MOCK_AUTH_USER.username}?`}
                    className="w-full bg-transparent border-0 resize-none text-sm placeholder:text-gray-500 focus:ring-0 focus:outline-none text-white py-1.5"
                  />

                  {imagePreview && (
                    <div className="relative mt-3 rounded-xl overflow-hidden max-h-72 border border-gray-800">
                      <img
                        src={imagePreview}
                        alt="upload preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeSelectedImage}
                        className="absolute top-2 right-2 bg-gray-950/80 hover:bg-red-500/20 hover:text-red-400 text-gray-400 rounded-full p-1.5 backdrop-blur-md border border-gray-800 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-800/80 pt-4">
                <button
                  type="button"
                  onClick={triggerFileSelect}
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

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />

                <button
                  type="submit"
                  disabled={!newCaption.trim() && !imagePreview}
                  className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-800 disabled:text-gray-400 disabled:opacity-40 hover:scale-[1.02] active:scale-[0.98] transition-all text-gray-950 font-bold text-xs px-5 py-2 rounded-xl cursor-pointer"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-900 border border-gray-800/80 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:border-gray-800"
              >
                <div className="p-5 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full border border-gray-800 bg-gray-950 overflow-hidden shrink-0 flex items-center justify-center">
                      {post.author.profilePic ? (
                        <img
                          src={post.author.profilePic}
                          alt="author"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-emerald-600/15 text-emerald-400 font-bold text-sm flex items-center justify-center uppercase">
                          {post.author.username.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-white hover:text-emerald-400 transition-colors cursor-pointer">
                          {post.author.username}
                        </h4>
                        {post.author.isVerified && (
                          <span
                            className="text-emerald-400 bg-emerald-500/10 rounded-full p-0.5"
                            title="Verified Creator"
                          >
                            <svg
                              className="w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M2.167 13.777C1.835 12.57 2.005 11.285 2.628 10.2c.623-1.085.623-2.43 0-3.515a4.025 4.025 0 01-.461-3.578c.312-1.132 1.154-2.005 2.272-2.34a4.019 4.019 0 013.528.075c1.121.57 2.454.57 3.575 0a4.019 4.019 0 013.529-.076c1.117.335 1.96 1.208 2.271 2.34a4.025 4.025 0 01-.46 3.579c-.623 1.085-.623 2.43 0 3.514a4.022 4.022 0 01.46 3.579c-.311 1.132-1.154 2.005-2.271 2.34a4.017 4.017 0 01-3.529-.076c-1.121-.57-2.454-.57-3.575 0a4.017 4.017 0 01-3.529.076c-1.117-.335-1.96-1.208-2.272-2.34zM11.707 8.707a1 1 0 00-1-1H7.586L6.293 6.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 000-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-500">
                        {post.createdAt}
                      </p>
                    </div>
                  </div>

                  <button className="text-gray-500 hover:text-white transition-colors p-1.5 rounded-lg">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h.01M12 12h.01M19 12h.01M12 12h.01M12 5h.01M12 19h.01"
                      />
                    </svg>
                  </button>
                </div>

                <div className="px-5 pb-3">
                  <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
                    {post.caption}
                  </p>
                </div>

                {post.image && (
                  <div className="border-y border-gray-800/60 max-h-[480px] overflow-hidden bg-gray-950">
                    <img
                      src={post.image}
                      alt="post asset"
                      className="w-full h-full object-cover select-none"
                    />
                  </div>
                )}

                <div className="px-5 py-3.5 bg-gray-900/40 border-t border-gray-800/40 flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 ${post.hasLiked ? "text-red-500 font-semibold" : "hover:text-red-500"}`}
                    >
                      <svg
                        className={`w-5 h-5 ${post.hasLiked ? "fill-current text-red-500" : ""}`}
                        stroke="currentColor"
                        fill={post.hasLiked ? "currentColor" : "none"}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span>{post.likes}</span>
                    </button>

                    <button
                      onClick={() =>
                        setActiveCommentsDrawer(
                          activeCommentsDrawer === post.id ? null : post.id,
                        )
                      }
                      className={`flex items-center gap-1.5 transition-colors hover:text-emerald-400 ${activeCommentsDrawer === post.id ? "text-emerald-400 font-semibold" : ""}`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <span>{post.comments.length} Comments</span>
                    </button>
                  </div>

                  <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8.684 10.742l4.606-2.404m0 0a3 3 0 10-.224-4.03l-4.606 2.404m1.152 4.44a3 3 0 11-4.508 2.871l-4.508-2.529m11.168 2.193a3 3 0 114.508 2.871l-4.508 2.53"
                      />
                    </svg>
                    <span>Share</span>
                  </button>
                </div>

                {activeCommentsDrawer === post.id && (
                  <div className="border-t border-gray-800/80 bg-gray-950/40 p-4 space-y-4">
                    {post.comments.length > 0 ? (
                      <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                        {post.comments.map((comment) => (
                          <div
                            key={comment.id}
                            className="text-xs flex items-start gap-2.5 bg-gray-900/50 p-2.5 rounded-xl border border-gray-900"
                          >
                            <span className="font-bold text-emerald-400 shrink-0">
                              @{comment.author}:
                            </span>
                            <span className="text-gray-300 leading-normal">
                              {comment.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-gray-600 italic">
                        No comments shared yet. Be the first to join the
                        dialogue!
                      </p>
                    )}

                    <form
                      onSubmit={(e: React.SubmitEvent<HTMLFormElement>) =>
                        handleAddComment(e, post.id)
                      }
                      className="flex items-center gap-3 border-t border-gray-800/40 pt-3"
                    >
                      <input
                        type="text"
                        value={newCommentTexts[post.id] || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setNewCommentTexts({
                            ...newCommentTexts,
                            [post.id]: e.target.value,
                          })
                        }
                        placeholder="Type your comment..."
                        className="flex-1 bg-gray-900 border border-gray-800/80 rounded-xl px-3 py-2 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                      <button
                        type="submit"
                        disabled={!(newCommentTexts[post.id] || "").trim()}
                        className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 disabled:opacity-20 hover:bg-emerald-500 hover:text-gray-950 text-[10px] font-bold px-3 py-2 rounded-lg transition-all"
                      >
                        Send
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-gray-900 border border-gray-800/80 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Suggested For You
            </h3>

            <div className="space-y-4">
              {suggested.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-800 bg-gray-950 flex items-center justify-center shrink-0">
                      {user.profilePic ? (
                        <img
                          src={user.profilePic}
                          alt="avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-emerald-600/15 text-emerald-400 font-bold flex items-center justify-center uppercase">
                          {user.username.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-bold text-white hover:text-emerald-400 cursor-pointer">
                        {user.username}
                      </h4>
                      <p className="text-[9px] text-gray-500">
                        {(user.followersCount / 1000).toFixed(1)}k followers
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleFollowSuggested(user.id)}
                    className={`font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${user.isFollowing ? "bg-gray-800 text-gray-400 hover:bg-gray-700" : "bg-emerald-500 text-gray-950 hover:bg-emerald-400"}`}
                  >
                    {user.isFollowing ? "Following" : "Follow"}
                  </button>
                </div>
              ))}
            </div>
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
      </div>
    </div>
  );
}
