import { create } from "zustand";
import type { AuthState } from "../types/types";
import { axiosInstance } from "../libs/axiosInstance";
export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  allUsers:null,
  isAuthenticated: false,
  isLoading: false,
  setAuthUser: (user) => {
    set({ authUser: user });
    set({isAuthenticated:!!user})
  },
verifyUser: async () => {
  set({ isLoading: true });
  try {
    const response = await axiosInstance.get("/auth/verify");
    set({ 
      authUser: response.data.user, 
      isAuthenticated: true 
    });
  } catch (error) {
    console.error("Verification failed (User likely logged out):", error);
    set({ authUser: null, isAuthenticated: false });
  } finally {
    set({ isLoading: false });
  }
},
  logout: () => set({ authUser: null, isAuthenticated: false }),
  getAllUser:async ()=>{
    const response = await axiosInstance.get("/auth/users")
    console.log("this all user", response)
    set({allUsers: response.data.users})
  }
}));
