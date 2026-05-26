import { Quote } from "lucide-react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="mx-auto h-full container max-w-6xl relative">
      <div className="flex justify-center flex-col gap-4 h-full">
        <div className="relative bg-gray-800 px-30 h-full rounded-xl my-5 text-white flex flex-col justify-center items-center overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
          <h1 className="text-5xl md:text-6xl font-extrabold text-center tracking-tight max-w-3xl leading-tight bg-gradient-to-b from-white via-gray-100 to-gray-500 bg-clip-text text-transparent">
            Share Your Thought <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              With the World
            </span>
          </h1>
          <div className="flex">
            <span className="text-4xl h-full rotate-180 flex items-end text-green-500">
              <Quote fill="springgreen"></Quote>
            </span>
            <p className="text-2xl my-10 font-medium text-center px-10">
              "Whether you're looking to create a core network or meet up with
              friends, our simple, powerful social media application gives you
              everything you need to connect cleanly, with zero hassle."
            </p>
            <span className="text-4xl  flex items-end  text-green-500">
              <Quote fill="springgreen"></Quote>
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 z-10">
            <Link to="/sign-in">
              <button className="w-full sm:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(16,185,129,0.2)] active:translate-y-0">
                Get Started
              </button>
            </Link>
            <button className="w-full sm:w-auto px-8 py-3.5 bg-gray-900/80 hover:bg-gray-900 text-gray-300 font-semibold rounded-xl border border-gray-800 hover:border-gray-700 transition-all duration-200 backdrop-blur-sm">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
