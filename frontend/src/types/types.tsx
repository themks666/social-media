interface AuthUser {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
  following: string[];
  followers: string[];
  createdAt: string;
  updatedAt: string;
}
interface AllUser {
  _id: string;
  username: string;
  isVerified: boolean;
  followers: string[];
}

interface PostAuthor {
  _id: string;
  username: string;
  profilePic: string;
  isVerified: boolean;
}

interface Post {
  _id: string;
  tags: string[];
  image: string;
  caption: string;
  author: PostAuthor;
  likes: string[];
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
  getAllUser: () => void;
  allUsers: AllUser[] | null;
}

interface PostState {
  posts: Post[];
  isFetchingPosts: boolean;
  getPost: () => Promise<void>; // Updated from () => void to handle async/await signatures safely
}

export type { AuthUser, AuthState, PostState, Post, PostAuthor };
