import React from 'react'

export default function Banner() {
  return (
    <div className='relative'>
      <img className=' w-screen object-contain' src="https://links.papareact.com/0fm" alt="" />
      <div className='absolute top-1/2 w-full text-center'>
        <p className='text-lg font-bold'>Not sure where to go? Perfect.</p>
        <button className='text-purple-500 bg-white px-10 py-4 shadow-md rounded-full my-2 hover:shadow-xl active:scale-90 transition duration-150'><p className='font-bold'>Explore..!</p> </button>
      </div>
    </div>
  )
}
