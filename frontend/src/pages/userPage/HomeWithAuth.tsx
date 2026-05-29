
import HomeRightSide from "../../layout/HomeRightSide";
import HomeLeftSide from "../../layout/HomeLeftSide";
import CenterHome from "../../layout/CenterHome";

export default function HomeWithAuth() {
  return (
    <div className="h-full bg-gray-950 text-gray-100 flex justify-center selection:bg-emerald-500/30 selection:text-emerald-300">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 md:px-8 pt-4 pb-12">
        <HomeRightSide></HomeRightSide>
        <CenterHome></CenterHome>
        <HomeLeftSide></HomeLeftSide>
      </div>
    </div>
  );
}
