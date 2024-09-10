import React, { useContext } from 'react'
import {  assets } from "../assets/assets";
import { PlayerContext } from '../contests/PlayerContext';

const Player = () => {

const {track,seekBar,seekBg,playerStatus,play,pause,time,previous,next,seekSong,setVolumeLevel, volume }=useContext(PlayerContext);


  return track? (
    <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
      <div className='hidden lg:flex items-center gap-4'>
        <img className='w-12' src={track.image} alt=''></img>
        <div>
          <p>{track.name}</p>
          <p>{track.desc.slice(0,12)}</p>
        </div>
      </div>
      <div className='flex flex-col items-center gap-1 m-auto'>
        <div className='flex gap-4'>
          {/* <img className='w-4 cursor-pointer' src={assets.shuffle_icon} alt=""></img> */}
          <img onClick={previous} className='w-4 cursor-pointer' src={assets.prev_icon} alt=""></img>

          {
            playerStatus?
            <img onClick={pause} className='w-4 cursor-pointer' src={assets.pause_icon} alt=""></img>
            :
            <img onClick={play} className='w-4 cursor-pointer' src={assets.play_icon} alt=""></img>
            
          }
          <img onClick={next} className='w-4 cursor-pointer' src={assets.next_icon} alt=""></img>
          {/* <img className='w-4 cursor-pointer' src={assets.loop_icon} alt=""></img> */}
        </div>
        <div className='flex items-center gap-5'>
          <p>{time.currentTime.minute}:{time.currentTime.second}</p>
          <div ref={seekBg} onClick={seekSong} className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
            <hr  ref={seekBar} className='h-1 border-none w-0 bg-green-800 rounded-full'></hr>
          </div>
          <p>{time.totalTime.minute}:{time.totalTime.second}</p>
        </div>
      </div>
      <div className='hidden lg:flex items-center gap-2 opacity-75'>
        {/* <img className='w-4' src={assets.play_icon} alt=''></img>
        <img className='w-4' src={assets.mic_icon} alt=''></img>
        <img className='w-4' src={assets.queue_icon} alt=''></img>
        <img className='w-4' src={assets.speaker_icon} alt=''></img> */}
        <img className='w-4' src={assets.volume_icon} alt=''></img>
        <input 
          type='range' 
          min='0' 
          max='100' 
          value={volume * 100} 
          onChange={setVolumeLevel} 
          className='w-20 bg-slate-50 h-1 rounded cursor-pointer'
        />
        {/* <div className='w-20 bg-slate-50 h-1 rounded'>
        </div> */}
      

      </div>
    </div>
  ):null
}

export default Player
