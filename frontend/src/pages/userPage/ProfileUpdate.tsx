import React, { useState } from "react";
import { axiosInstance } from "../../libs/axiosInstance";
import { useAuthStore } from "../../store/auth.store";

export default function Profile() {
  const [imagePreview, setImagePreview] = useState<string | null>("");
  const [bio, setBio] = useState("");
  const authUser = useAuthStore((state)=>(state.authUser))
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePreview(reader.result as string);
      console.log(reader.result);
    };
  };
  const handleBioChange = (e : React.ChangeEvent<HTMLTextAreaElement>)=>{
    const {value}=e.target
    setBio(value)
  }
  const handleSubmit = async (e : React.ChangeEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try{
      await axiosInstance.put("/auth/update-profile", {imagePreview, bio})
    }catch(e){

    }
  }
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-emerald-500/30 selection:text-emerald-300">
      <div className="max-w-xl w-full bg-gray-900 border border-gray-800/80 rounded-2xl shadow-xl overflow-hidden p-6 md:p-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Account Settings
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Update your profile info, avatar image, and public bio details.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center sm:flex-row gap-5 bg-gray-950/40 p-4 rounded-xl border border-gray-800/60">
            <div className="relative w-20 h-20 rounded-full border-2 border-gray-800 bg-gray-950 flex items-center justify-center overflow-hidden shrink-0">
              {imagePreview ? (
                <img src={imagePreview} alt="profile picture" className="h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-emerald-600/15 text-emerald-400 font-bold text-2xl flex items-center justify-center uppercase">
                  {authUser?.username.charAt(0)}
                </div>
              )}
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <label className="text-xs font-bold text-gray-400 block">
                Profile Picture
              </label>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                id="avatar-upload-input"
              />

              <label
                htmlFor="avatar-upload-input"
                className="inline-block bg-gray-800 hover:bg-gray-700 border border-gray-700/60 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer"
              >
                Choose New Image
              </label>

              <p className="text-[10px] text-gray-600 block">
                JPG, PNG, or GIF. Max size 2MB.
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 block">
              Bio
            </label>
            <textarea
              rows={4}
              name="bio"
              className="w-full bg-gray-950 border border-gray-800 focus:border-emerald-500/40 px-4 py-2.5 rounded-xl text-sm focus:ring-0 focus:outline-none text-white transition-all resize-none placeholder:text-gray-700"
              value={bio}
              onChange={handleBioChange}
              placeholder="Tell us a little about yourself, your tech stack, or projects..."
            />
          </div>
          <div className="flex justify-end gap-3 border-t border-gray-800/80 pt-5">
            <button
              type="button"
              className="bg-transparent hover:bg-gray-800 text-gray-400 hover:text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer border border-transparent"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-xs px-6 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
