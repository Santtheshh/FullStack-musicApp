import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import axios from 'axios';
import { url } from "../App";
import { toast } from "react-toastify";


const AddSong = () => {
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [song, setSong] = useState(false);
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("");
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState([]);

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    setLoading(true);
    // Add your form submission logic here

    try {
      const formData=new FormData();
      formData.append('name', name);
      formData.append('desc', desc); 
      formData.append('image', image);
      formData.append('audio', song);
      formData.append('album', album);

      const response= await axios.post(`${url}/api/song/add`,formData);
      if(response.data.success) {
        toast.success("song added successfully");
        setName("");
        setDesc("");
        setAlbum("none");
        setImage(false);
        setSong(false);

      }
      else{
        toast.error("something went wrong");
        
      }
      
    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
      
    }
    setLoading(false);
  };
  const loadAlbumData=async() => {

    try {

      const response = await axios.get(`${url}/api/album/list`);

      if (response.data.success) {


      setAlbumData(response.data.albums);
      }
      else {
        toast.error("something went wrong");
      }
      
    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
      
    }

  };
  useEffect(()=>{
    loadAlbumData();
  },[])

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-start gap-8 text-gray-600">
      <div className="flex gap-8">
        <div className="flex flex-col gap-4">
          <p>Upload Song</p>
          <input
            onChange={(e) => setSong(e.target.files[0])}
            type="file"
            id="song"
            accept="audio/*"
            hidden
          />
          <label htmlFor="song">
            <img
              src={song ? assets.upload_added : assets.upload_song}
              className="w-24 cursor-pointer"
              alt="Upload Song"
            />
          </label>
        </div>

        <div className="flex flex-col gap-4">
          <p>Upload Image</p>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            accept="image/*"
            hidden
          />
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              className="w-24 cursor-pointer"
              alt="Upload Image"
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Song Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-2 hover:border-green-400 border-gray-300 p-2 w-full"
          placeholder="Song Name"
          required
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Song Description</p>
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="border-2 hover:border-green-400 border-gray-300 p-2 w-full"
          placeholder="Song Description"
          required
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Album</p>
        <select
          defaultValue={album}
          onChange={(e) => setAlbum(e.target.value)}
          className="border-2 hover:border-green-400 border-gray-300 p-2 w-full"
        >
          {albumData.map((item,index)=>( <option key={index} value={item.name}>{item.name}</option>))}
         
          {/* You can map through albumData here if available */}
        </select>
      </div>

      <button
        type="submit"
        className="text-white cursor-pointer bg-black px-2 py-5 w-[20vh]"
      >
        ADD
      </button>

      
    </form>
  );
};

export default AddSong;
