import { Route, Routes, useLocation } from "react-router-dom"; // 1. Import useLocation
import Header from "./components/Header";
import Register from "./pages/userPage/Register";
import Login from "./pages/userPage/Login";
import Feed from "./pages/userPage/Feed";
import Explore from "./pages/userPage/Explore";
import { useAuthStore } from "./store/auth.store";
import { useEffect } from "react";
import Profile from "./pages/userPage/Profile";
import Home from "./pages/userPage/Home";
import CreatePost from "./pages/postPages/CreatePost";
import HomeWithAuth from "./pages/userPage/HomeWithAuth";
import { usePostStore } from "./store/post.store";

const App = () => {
  const authUser = useAuthStore((state) => state.authUser);
  const getAllUser = useAuthStore((state) => state.getAllUser);
  const getAllposts = usePostStore((state) => state.getPost);
  const verifyUser = useAuthStore((state) => state.verifyUser);
  
  const location = useLocation(); 

  useEffect(() => {
    const publicAuthPaths = ["/sign-up", "/sign-in"];
    if (!publicAuthPaths.includes(location.pathname)) {
      verifyUser();
      getAllposts();
      getAllUser()
    }
  }, [verifyUser, getAllposts, location.pathname]); 
  return (
    <div className="bg-gray-900 flex flex-col text-white h-screen overflow-auto">
      <Header />
      <div className="grow">
        <Routes>
          <Route path="/" element={authUser ? <HomeWithAuth /> : <Home />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/settings/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;