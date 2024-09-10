import React, { useContext } from 'react'
import { PlayerContext } from '../contests/PlayerContext'

const Songitem = ({name,image,desc,id}) => {

    const {playWithID}=useContext(PlayerContext)
    
  return (
    <div onClick={()=>playWithID(id)} className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
        <img  className ='rounded' src={image} alt=''></img>
        <p className='font-bold mt-2 mb-1'>{name}</p>
        <p className='text-slate-200 text-sm'>{desc}</p>
      
    </div>
  )
}

export default Songitem
