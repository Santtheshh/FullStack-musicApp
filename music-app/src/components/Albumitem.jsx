import React from 'react'
import { useNavigate } from 'react-router-dom'

const Albumitem = ({image,name,desc,id}) => {

    const navigate=useNavigate()
  return (
    <div onClick={()=>navigate(`/album/${id}`)} className='min-w-[180px] px-3  w-40 rounded cursor-pointer hover:hover:bg-[#ffffff26]'>
        <img className=' w-40 h-40 rounded' src={image} alt=""></img>
        <p className='font-bold mt-2 mb-1'>{name}</p>
        <p className='text-slate-200 text-sm'>{desc}</p>
      
    </div>
  )
}

export default Albumitem
