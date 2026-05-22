import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Explore from "./pages/Explore";
import { useAuthStore } from "./store/auth.store";
import { useEffect } from "react";

const App = () => {
  const authUser = useAuthStore((state)=> state.authUser)
  const verifyUser = useAuthStore((state)=> state.verifyUser)
  useEffect(()=>{
    verifyUser()
  }, [verifyUser])
  return (
    <div className="bg-gray-900 flex flex-col text-white h-screen overflow-auto">
      <Header></Header>
      <div className="grow">
        <Routes>
          <Route path="/" element={<>{authUser?authUser.username:"homepage"}</>}></Route>
          <Route path="/sign-up" element={<Register></Register>}></Route>
          <Route path="/sign-in" element={<Login></Login>}></Route>
          <Route path="/feed" element={<Feed></Feed>}></Route>
          <Route path="/explore" element={<Explore></Explore>}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
