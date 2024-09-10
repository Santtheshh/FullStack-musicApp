import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { url } from '../App';
import { toast } from 'react-toastify';

const ListSong = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetching();
  }, []);

  const fetching = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      if (response.data.success) {
        setData(response.data.songs);
      } else {
        toast.error("Failed to fetch songs.");
      }
    } catch (error) {
      toast.error(`Error fetching data: ${error.message}`);
    }
  };

  const removeSong = async (id) => {
    try {
      const response = await axios.post(`${url}/api/song/remove`, { id });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetching();
      } else {
        toast.error("Failed to remove song.");
      }
    } catch (error) {
      toast.error(`Error removing song: ${error.message}`);
    }
  };

  return (
    <section>
      <p>List of Songs</p>
      <br />
      <div>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border-gray-300 text-sm mr-5 bg-gray-100'>
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
        <div>
          {data.map((item) => (
            <div key={item._id} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
              <img className='w-12' src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.album}</p>
              <p>{item.duration}</p>
              <p onClick={() => removeSong(item._id)} className='cursor-pointer text-red-600'>x</p>
            </div>
          ))}
        </div> 
      </div>
    </section>
  );
};

export default ListSong;
