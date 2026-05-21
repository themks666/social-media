import { create } from "zustand";
import type { AuthState } from "../types/types";
import { axiosInstance } from "../libs/axiosInstance";
export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  isAuthenticated: false,
  isLoading: false,
  setAuthUser: (user) => {
    set({ authUser: user });
    set({isAuthenticated:!!user})
    console.log("this i  logged-in user data",user);
  },
  verify:async ()=>{
    await axiosInstance.post("")
  },
  logout: () => set({ authUser: null, isAuthenticated: false }),
}));
