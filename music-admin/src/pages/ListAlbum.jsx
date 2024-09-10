import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { url } from '../App';
import { toast } from 'react-toastify';

const ListAlbum = () => {
  const [data, setData] = useState([]);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`); // Updated endpoint URL
      if (response.data.success) {
        setData(response.data.albums);
      } else {
        toast.error('Failed to fetch albums.');
      }
    } catch (error) {
      toast.error(`Error occurred: ${error.message}`);
    }
  };
  
  const removeAlbum = async (id) => {

    try {
      const response = await axios.post(`${url}/api/album/remove/`,{id});
      if (response.data.success) {
        toast.success("Album removed successfully");
        await fetchAlbums();
      } else {
        toast.error("Failed to remove album");
      }
    } catch (error) {
      toast.error(`Failed to remove album`);
    }

  }

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div>
      <p className="text-lg font-bold">All Albums List</p>
      <br />
      <div>
      <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100 ">
       <b>Image</b>
       <b>Nmae</b>
       <b>Description</b>
       <b>album name</b>
       <b> Action</b>
      </div>
      {data.map((item,index)=>{
        return(
          <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
            <img src={item.image} alt='' className='w-12' />
            <p>{item.name}</p>
            <p>{item.desc}</p>
            <p>{item.bgColor}</p>
         
            <p onClick={() => removeAlbum(item._id)} className='cursor-pointer'> X</p>

            </div>
        )
      }
    )}
    </div>
    </div>
  );
};

export default ListAlbum;
