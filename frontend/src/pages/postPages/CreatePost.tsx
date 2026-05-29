import React, { useState, useRef} from "react";
import { axiosInstance } from "../../libs/axiosInstance";
import { useNavigate } from "react-router-dom";
interface PostPayload {
  caption: string;
  image: string;
  tags: string[];
}

export default function CreatePost() {
  const Navigate = useNavigate()
  const [captionText, setCaptionText] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedPost, setSubmittedPost] = useState<PostPayload | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const applyExample = (text: string): void => {
    setCaptionText(text);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setCaptionText(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const getHashtags = (text: string): string[] => {
    const regex = /#(\w+)/g;
    const matches = text.match(regex);
    return matches ? matches.map(tag => tag.toLowerCase()) : [];
  };

  const triggerFileSelect = (): void => {
    fileInputRef.current?.click();
  };

  const clearImage = (): void => {
    setSelectedImage(null);
    setImagePreview(null);
  };
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!captionText.trim() && !imagePreview) return;

    setIsSubmitting(true);
    const response = await axiosInstance.post("/post/create-post/", {captionText , imagePreview})
    console.log(response)
    setIsSubmitting(false);
    Navigate('/')
  };

  return (
    <div className="h-full  bg-gray-950 text-white p-4 md:p-8 flex flex-col items-center justify-center font-sans selection:bg-emerald-500/20 selection:text-emerald-400">
      <div className="w-full flex grid-cols-1 gap-8 items-center justify-center">
        <div className="bg-gray-900 border border-gray-800/80 rounded-2xl p-6 shadow-xl w-full md:w-1/2 space-y-6">
          <div>
            <h2 className="text-xl font-bold">Write a Post</h2>
            <p className="text-xs text-gray-500 mt-1">Share your thoughts, developer updates, or photos.</p>
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Click an example to auto-fill:</span>
            <div className="flex flex-wrap gap-2">
              <button 
                type="button"
                onClick={() => applyExample("Woke up early to catch the sunrise over Gokarna hills today. There's a certain magic in the quiet hours of the morning. 🏔️🌤️ #nature #explore")}
                className="text-xs bg-gray-950/50 hover:bg-gray-950 text-gray-400 border border-gray-800 px-3 py-1.5 rounded-lg transition-colors text-left max-w-xs truncate"
              >
                Mountain view caption
              </button>
              <button 
                type="button"
                onClick={() => applyExample("Just deployed the new websocket server for real-time notifications on babal.! The latency is down to 14ms. Absolutely loving this dark theme 🚀💻 #mernstack #webdev")}
                className="text-xs bg-gray-950/50 hover:bg-gray-950 text-gray-400 border border-gray-800 px-3 py-1.5 rounded-lg transition-colors text-left max-w-xs truncate"
              >
                Web development caption
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Your Caption / Description</label>
              <div className="relative bg-gray-950 border border-gray-800 focus-within:border-emerald-500/50 rounded-xl p-3 transition-all">
                <textarea
                  rows={5}
                  value={captionText}
                  onChange={handleTextChange}
                  placeholder="What's on your mind? Type a short tweet or a long description..."
                  className="w-full bg-transparent border-none text-sm focus:outline-none text-white resize-none placeholder:text-gray-600 leading-relaxed"
                />
                <div className="flex items-center justify-between text-[10px] text-gray-500 border-t border-gray-900/80 pt-2 mt-2">
                  <span>{captionText.length} characters</span>
                  <span className="text-emerald-400">{getHashtags(captionText).length} hashtags parsed</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Add Photo Attachment</label>
              
              {imagePreview ? (
                <div className="relative rounded-xl overflow-hidden border border-gray-800 max-h-48 bg-gray-950">
                  <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                  <button 
                    type="button" 
                    onClick={clearImage}
                    className="absolute top-2 right-2 bg-gray-950/80 hover:bg-red-500/10 hover:text-red-400 text-gray-400 p-1.5 rounded-full border border-gray-800 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                </div>
              ) : (
                <div 
                  onClick={triggerFileSelect}
                  className="border border-dashed border-gray-800 hover:border-emerald-500/30 bg-gray-950/30 hover:bg-emerald-500/5 cursor-pointer rounded-xl p-6 text-center transition-all group"
                >
                  <svg className="w-6 h-6 mx-auto text-gray-500 group-hover:text-emerald-400 transition-colors mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  <span className="text-xs font-semibold text-gray-400 group-hover:text-emerald-400 transition-colors">Select an image file</span>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageChange} 
                    accept="image/*" 
                    className="hidden" 
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting || (!captionText.trim() && !imagePreview)}
              className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-800 disabled:opacity-30 disabled:cursor-not-allowed text-gray-950 font-bold py-3 rounded-xl transition-all"
            >
              {isSubmitting ? "Uploading assets..." : "Publish Post"}
            </button>
          </form>
        </div>
      
      </div>
    </div>
  );
}