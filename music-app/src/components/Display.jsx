import React, { useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import DisplayHome from './DisplayHome';
import DisplayAlbum from './DisplayAlbum';
import { useContext } from 'react';
import { PlayerContext } from '../contests/PlayerContext';

const Display = () => {
  const { albumsData } = useContext(PlayerContext);
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes('album');
  const albumId = isAlbum ? location.pathname.split('/').pop() : "";
  
  // Ensure we have a valid album before accessing properties
  const album = isAlbum ? albumsData.find((x) => x._id == albumId) : null;
  const bgColor = album ? album.bgColor : "#121212";

  useEffect(() => {
    if (displayRef.current) {
      if (isAlbum && album) {
        displayRef.current.style.backgroundImage = `linear-gradient(${bgColor}, #121212)`;
      } else {
        displayRef.current.style.backgroundImage = "none";
        displayRef.current.style.backgroundColor = "#121212";
      }
    }
  }, [isAlbum, albumId, album]);

  return (
    <div
      ref={displayRef}
      className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'
    >
      <Routes>
        <Route path='/' element={<DisplayHome />} />
        <Route path='/album/:id' element={<DisplayAlbum album={albumsData.find((x)=>(x._id==albumId
))} />} />
      </Routes>
    </div>
  );
};

export default Display;
