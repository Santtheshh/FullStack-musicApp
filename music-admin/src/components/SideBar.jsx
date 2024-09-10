import React from "react";

import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="bg-[#120720] min-h-screen pl-[4vw]">
      <img
        src={assets.logo1}
        className="mt-5 w-[max(10vw,100px)] hidden sm:block "
        alt=""
      />
      <img
        src={assets.logo_small}
        className="mt-5 w-[max(5vw,40px)] mr-5  sm:hidden block"
        alt=""
      />

      <div className="flex flex-col gap-5 mt-10">
        <NavLink to='/add-song ' className="flex item-center gap-2.5 text-gray-800 bg-white border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#b48de7] text-sm font-meduim ">
          <img src={assets.add_song} className="w-5" alt="" />
          <p className="hidden sm:block">Add song </p>
        </NavLink>
        <NavLink to='/list-song' className="flex item-center gap-2.5 text-gray-800 bg-white border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#b48de7] text-sm font-meduim ">
          <img src={assets.song_icon} className="w-5" alt="" />
          <p className="hidden sm:block">List song </p>
        </NavLink>

        <NavLink to='add-album' className="flex item-center gap-2.5 text-gray-800 bg-white border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#b48de7] text-sm font-meduim ">
          <img src={assets.add_album} className="w-5" alt="" />
          <p className="hidden sm:block">Add Album </p>
        </NavLink>

        <NavLink to='list-album' className="flex item-center gap-2.5 text-gray-800 bg-white border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#b48de7] text-sm font-meduim ">
          <img src={assets.album_icon} className="w-5" alt="" />
          <p className="hidden sm:block">List Album </p>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
