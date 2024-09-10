import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {


  const navigate=useNavigate();

  return (
    <div  className="w-[25%] h-full p-2 flex-col gap-2 text-white hiddem lg:flex">
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        <div  onClick={()=>navigate("/")} className="flex item-center gap-3 pl-8 cursor-pointer">
          <img  className="w-6" src={assets.home_icon} alt="" />
          <p className="form-bold">Home</p>
        </div>
        {/* <div className="flex item-center gap-3 pl-8 cursor-pointer">
          <img className="w-6" src={assets.search_icon} alt="" />
          <p className="form-bold">Search</p>
        </div> */}
      </div>

          


      <div className="bg-[#121212] h-[85%] rounded">
        <div className="p-4 flex item-center justify-between">
          <div className="flex item-center gap-3">
            {/* <img className="w-7" src={assets.stack_icon}></img> */}
            {/* <p className="font-semibold">Your library</p> */}
          </div>

          <div className="flex item-center gap-3">
            {/* <img className="w-5" src={assets.arrow_icon} alt=""></img> */}
            {/* <img className="w-5" src={assets.plus_icon} alt=""></img> */}
          </div>
        </div>
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start  justify-start gap-1 pl">
          <h1>create your first playlist</h1>
          <p className="font-light"> dont worry we will help you</p>
          <button className="px-5 py-1.5 bg-white text-black rounded-full hover:bg-[#242424] hover:text-white">
            create playlist
          </button>
        </div>
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start margin-top justify-start gap-1 pl">
          <h1>Lets find some podcasts to you</h1>
          <p className="font-light"> we will keep update your podcast</p>
          <button className="px-5 py-1.5 bg-white text-black rounded-full hover:bg-[#242424] hover:text-white">
            browse podcasts 
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
