import { Route, Routes } from "react-router-dom";
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

const App = () => {
  const authUser = useAuthStore((state) => state.authUser);
  const verifyUser = useAuthStore((state) => state.verifyUser);
  useEffect(() => {
    console.log("verifying the user ");
    verifyUser();
  }, [verifyUser]);
  return (
    <div className="bg-gray-900 flex flex-col text-white h-screen overflow-auto">
      <Header></Header>
      <div className="grow">
        <Routes>
          <Route
            path="/"
            element={<>{authUser ? <HomeWithAuth /> : <Home />}</>}
          ></Route>
          <Route path="/sign-up" element={<Register></Register>}></Route>
          <Route path="/sign-in" element={<Login></Login>}></Route>
          <Route path="/feed" element={<Feed></Feed>}></Route>
          <Route path="/explore" element={<Explore></Explore>}></Route>
          <Route
            path="/create-post"
            element={<CreatePost></CreatePost>}
          ></Route>
          <Route path="/settings/profile" element={<Profile></Profile>}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
