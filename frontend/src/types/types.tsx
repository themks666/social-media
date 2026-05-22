interface AuthUser {
  _id: string;
  username: string;
  email: string;
  following: string[];
  followers: string[];
  createdAt: string;
  updatedAt: string;
}
interface AuthState {
  authUser: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuthUser: (user: AuthUser | null) => void;
  logout: () => void;
  verifyUser: () => void;
}
export type { AuthUser, AuthState };
