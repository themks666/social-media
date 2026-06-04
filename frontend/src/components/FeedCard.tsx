import React, { useState } from "react"; // FIX 1: Imported useState
import { usePostStore } from "../store/post.store";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { PostAuthor } from "../types/types";

interface FeedCardProps {
  _id: string;
  tags: string[];
  image: string;
  caption: string;
  author: PostAuthor;
  likes: string[];
  comments: any[]; 
  createdAt: string;
}

dayjs.extend(relativeTime);

const FeedCard = ({
  _id,
  author,
  tags,
  image,
  caption,
  likes,
  comments = [],
  createdAt,
}: FeedCardProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-900 border border-gray-800/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full border border-gray-800 bg-gray-950 overflow-hidden shrink-0 flex items-center justify-center">
              <div className="w-full h-full bg-emerald-600/15 text-emerald-400 font-bold text-sm flex items-center justify-center uppercase">
                {author?.username?.charAt(0).toUpperCase() || "U"}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-white hover:text-emerald-400 transition-colors cursor-pointer">
                  {author?.username || "anonymous"}
                </h4>
                <span className="text-emerald-400 bg-emerald-500/10 rounded-full p-0.5">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.167 13.777C1.835 12.57 2.005 11.285 2.628 10.2c.623-1.085.623-2.43 0-3.515a4.025 4.025 0 01-.461-3.578c.312-1.132 1.154-2.005 2.272-2.34a4.019 4.019 0 013.528.075c1.121.57 2.454.57 3.575 0a4.019 4.019 0 013.529-.076c1.117.335 1.96 1.208 2.271 2.34a4.025 4.025 0 01-.46 3.579c-.623 1.085-.623 2.43 0 3.514a4.022 4.022 0 01.46 3.579c-.311 1.132-1.154 2.005-2.271 2.34a4.017 4.017 0 01-3.529-.076c-1.121-.57-2.454-.57-3.575 0a4.017 4.017 0 01-3.529.076c-1.117-.335-1.96-1.208-2.272-2.34zM11.707 8.707a1 1 0 00-1-1H7.586L6.293 6.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
              <p className="text-[10px] text-gray-500">
                {dayjs(createdAt).fromNow()}
              </p>
            </div>
          </div>
          <button className="text-gray-500 hover:text-white transition-colors p-1.5 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M12 12h.01M12 5h.01M12 19h.01" />
            </svg>
          </button>
        </div>
        <div className="px-5 pb-3">
          <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
            {caption}{" "}
            <span>
              {tags?.map((tag, idx) => (
                <span key={idx} className="text-emerald-400 font-medium">
                  {" "}#{tag}
                </span>
              ))}
            </span>
          </p>
        </div>
        {image && (
          <div className="border-y border-gray-800/60 max-h-120 overflow-hidden bg-gray-950">
            <img
              src={image}
              alt="post image"
              className="w-full h-full object-cover select-none"
            />
          </div>
        )}
        <div className="px-5 py-3.5 bg-gray-900/40 border-b border-gray-800/40 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-6">
            <button className="flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95">
              <svg className="w-5 h-5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{likes?.length || 0}</span>
            </button>

            <button className="flex items-center gap-1.5 transition-colors hover:text-emerald-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{comments?.length || 0} comments</span>
            </button>
          </div>
          <button className="flex items-center gap-1.5 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 10.742l4.606-2.404m0 0a3 3 0 10-.224-4.03l-4.606 2.404m1.152 4.44a3 3 0 11-4.508 2.871l-4.508-2.529m11.168 2.193a3 3 0 114.508 2.871l-4.508 2.53" />
            </svg>
            <span>Share</span>
          </button>
        </div>
        <CommentSection postId={_id} comments={comments} />
      </div>
    </div>
  );
};
interface CommentSectionProps {
  postId: string;
  comments: any[];
}

const CommentSection = ({ postId, comments = [] }: CommentSectionProps) => {
  const [commentText, setCommentText] = useState("");
  const addComment = usePostStore((state) => state.addComment);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    await addComment(postId, commentText);
    setCommentText("");
  };
  return (
    <div className="border-t border-gray-800/60 bg-gray-900/20 px-5 py-4 space-y-4">
      {comments.length > 0 && (
        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
          {comments.map((comment) => (
            <div key={comment._id} className="flex gap-3 text-xs items-start">
              <div className="w-7 h-7 rounded-full bg-emerald-600/10 border border-emerald-500/25 flex items-center justify-center font-bold text-emerald-400 uppercase shrink-0 mt-0.5">
                {comment.author?.username?.charAt(0) || "U"}
              </div>
              <div className="bg-gray-950/40 border border-gray-800/40 rounded-xl px-3 py-2 flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white">
                    @{comment.author?.username || "anonymous"}
                  </span>
                  <span className="text-[9px] text-gray-500">
                    {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : "Just now"}
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed break-words">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex gap-3 items-center pt-2">
        <div className="w-8 h-8 rounded-full bg-emerald-600/15 border border-emerald-500/20 flex items-center justify-center font-bold text-emerald-400 uppercase text-xs shrink-0">
          M
        </div>
        <div className="flex-1 flex gap-2 items-center bg-gray-950 px-3 py-1.5 rounded-xl border border-gray-800 focus-within:border-emerald-500/40 transition-all">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a response..."
            className="w-full bg-transparent border-0 text-xs focus:ring-0 focus:outline-none text-white placeholder:text-gray-600"
          />
          <button
            type="submit"
            className="text-emerald-400 hover:text-emerald-300 font-bold text-xs px-2 py-1 transition-colors cursor-pointer"
          >
            Reply
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedCard;