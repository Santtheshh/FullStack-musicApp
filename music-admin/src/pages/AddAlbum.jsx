import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { url } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddAlbum = () => {
  const [image, setImage] = useState(null); // Start with null
  const [color, setColor] = useState('#121212');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null); // To hold the object URL

  // Create an object URL for the selected image
  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url); // Clean up object URL on unmount or when image changes
    } else {
      setImageUrl(null);
    }
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('desc', desc);
      if (image) formData.append('image', image);
      formData.append('bgColor', color);

      const response = await axios.post(`${url}/api/album/add`, formData);
      if (response.data.success) {
        toast.success("Album added successfully");
        setDesc("");
        setImage(null);
        setColor('#121212');
        setName('');
      } else {
        toast.error("Failed to add album");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    loading ? (
      <div className="grid place-items-center min-h-[80vh]">
        <div className="w-16 h-16 border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
      </div>
    ) : (
      <form onSubmit={handleSubmit} className='flex flex-col items-start gap-8 text-gray-800'>
        <div className='flex flex-col gap-4'>
          <p>Upload Image</p>
          <input
            type="file"
            id='image'
            accept='image/*'
            className='hidden'
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label htmlFor="image" className='flex items-center cursor-pointer'>
            <img
              className='w-24 h-24 object-cover border-2 border-gray-300 rounded-lg'
              src={imageUrl || assets.upload_area}
              alt='Upload Area'
            />
          </label>
        </div>

        <div className='flex flex-col gap-2.5'>
          <p>Album Name</p>
          <input
            className='bg-transparent outline-none border border-gray-400 rounded p-2.5 w-[max(40vw,250px)] focus:outline-green-600'
            type="text"
            placeholder='Enter Album Name'
            onChange={(e) => setName(e.target.value)} value={name}
          />
        </div>

        <div className='flex flex-col gap-2.5'>
          <p>Album Description</p>
          <input
            className='bg-transparent outline-none border border-gray-400 rounded p-2.5 w-[max(40vw,250px)] focus:outline-green-600'
            type="text"
            placeholder='Enter Album Description'
            onChange={(e) => setDesc(e.target.value)} value={desc}
          />
        </div>

        <div className='flex flex-col gap-2.5'>
          <p>Background Color</p>
          <input
            type='color'
            className='w-16 h-8 p-0 border-none cursor-pointer'
            onChange={(e) => setColor(e.target.value)} value={color}
          />
        </div>

        <button
          type='submit'
          className='text-base text-white bg-black py-2.5 px-6 cursor-pointer rounded'
        >
          ADD
        </button>
      </form>
    )
  );
}

export default AddAlbum;
