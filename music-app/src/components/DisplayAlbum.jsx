import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { PlayerContext } from "../contests/PlayerContext";
import { useEffect } from "react";

const DisplayAlbum = ({album}) => {
  const { id } = useParams();
  const[albumData,setAlbumData]=useState("");

  const {playWithID,albumsData,songsData}=useContext(PlayerContext);

  useEffect(()=>{
     albumsData.map((item)=>{
      if(item._id===id)
      {
        setAlbumData(item);
      }
     })

  },[])


  return albumData ?(
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img className="w-48 rounded" src={albumData.image} alt={albumData.name}></img>
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">{albumData.name}</h1>
          <p>{albumData.desc}</p>
          <div className="flex items-center mt-1">
            {/* <img className="inline-block w-5 mr-2" src={assets.logo1} alt="Spotify logo"></img> */}
            <b>TuneVista</b>
            <p className="ml-2">🤍 1,321,222 likes · <b>50 songs</b> · about 2hr 30min</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 pl-2 text-[#a7a7a7]">
        <p className="mr-4">
          # <b>Title</b>
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="Clock icon"></img>
      </div>
      <hr />
      {songsData.filter((item)=>item.album===album.name).map((item, index) => (
        <div
          key={index}
          onClick={()=>playWithID(item._id)}
          className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
        >
          <p className="text-white">
            <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
            <img src={item.image} className="inline w-10 mr-5" alt={item.name}></img>
            {item.name}
          </p>
          <p className="text-[15px]">{albumData.name}</p>
          <p className="text-[15px] hidden sm:block">5 days ago</p>
          <p className="text-[15px]">{item.duration}</p>
        </div>
      ))}
    </>
  ):null
};

export default DisplayAlbum;
