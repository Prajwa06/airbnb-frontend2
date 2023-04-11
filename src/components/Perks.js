import React from 'react'

export default function Perks(props) {
  const{selected,setPerks}=props;
  
  const handleCheckClick=(e)=>{
    const{checked,name}=e.target;
    if(checked){
      setPerks([...selected,name]);
    }
    else{
      setPerks([...selected.filter(selectedName => selectedName !== name)]);
    }
   
  }
  return (
    <div>
      <p className='text-xl ml-2 mt-4 font-bold font-serif '>Select Perks</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                <label className="flex space-x-2 border rounded-md m-1 p-2 cursor-pointer hover:shadow-lg ">
                     
                    <input type="checkbox" checked={selected.includes('parking')} name="parking" onChange={handleCheckClick} />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
</svg>
                    <span>Free Parking</span>
                </label>
                <label className="flex space-x-2 border rounded-md m-1 p-2 cursor-pointer hover:shadow-lg">
                    <input type="checkbox" checked={selected.includes('wifi')} name="wifi" onChange={handleCheckClick}/>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
</svg>
                    <span>Free Wifi</span>
                </label>
                <label className="flex space-x-2 border rounded-md m-1 p-2 cursor-pointer hover:shadow-lg">
                    <input type="checkbox" checked={selected.includes('pets')} name='pets' onChange={handleCheckClick}/>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
                    <span>Pets</span>
                </label>
                <label className="flex space-x-2 border rounded-md m-1 p-2 cursor-pointer hover:shadow-lg">
                    <input type="checkbox" checked={selected.includes('tv')} name='tv' onChange={handleCheckClick}/>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
</svg>
                    <span>TV</span>
                </label>
                <label className="flex space-x-2  border rounded-md m-1 p-2 cursor-pointer hover:shadow-lg">
                    <input type="checkbox" checked={selected.includes('privateEntrance')} name='privateEntrance' onChange={handleCheckClick} />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
</svg> 
                    <span>Private Entrance</span>
                </label>
            </div>
    </div>
  )
}
