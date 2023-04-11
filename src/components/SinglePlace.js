import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectplace } from "../features/placeSlice";
import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../features/userSlice";

export default function SinglePlace() {
  const user=useSelector(selectUser);
  const id = useSelector(selectplace);
  const [place, setPlace] = useState(null);
  const [showallPhotos, setShowAllPhotos] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuests] = useState("");
  const[name,setName]=useState('');
  const[mobile,setMobile]=useState('');
  const navigate=useNavigate();
  
  let noOfDays=0;
  if(checkIn && checkOut ){
    noOfDays= differenceInCalendarDays(new Date(checkOut),new Date(checkIn));
  }
  useEffect(() => {
    if (!id) {
      return;
    }
    const getplace = async () => {
      const res = await axios.get("/places/" + id);
      setPlace(res.data);
    };
    getplace();
  },[]);

  const bookNow=async()=>{
    const data={
      email:user.email,
        name,
        checkIn,
        checkOut,
        noOfGuests:maxGuest,
        mobile,
        place:place._id,
        price:noOfDays*place.prices,

    }
    const res=await axios.post('/bookings',data);
     
    const bookingId =res.data.id;
    if(res.data.status){
    navigate('/account/bookings');
    }
    else{
        alert("Internal Server Error Please Try Again");
    }
  }

  if (!place) return "";
  if (showallPhotos)
    return (
      <div className=" bg-gray-100  max-w-7xl mx-auto ">
        <button
          onClick={() => setShowAllPhotos(false)}
          className=" absolute right-0 mt-3 top-24 z-50 bg-gray-100 hover:bg-white shadow-gray-500 rounded-2xl p-1 cursor-pointer shadow-sm inline-flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <p className=" ">Close</p>{" "}
        </button>
        {place?.photos?.length > 0 &&
          place.photos.map((pic) => (
            <div>
              <img
                className=" w-screen object-cover rounded-lg overflow-hidden px-10 py-5 mt-10"
                src={ pic}
                alt=""
              />
            </div>
          ))}
      </div>
    );
  return (
    <div className="bg-gray-100 ">
      <div className="mt-8  mx-auto  px-8 py-4  max-w-6xl">
        <h1 className="text-2xl  font-serif mx-2">{place.title}</h1>
        <p className=" font-semibold underline mx-2 inline-flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>{" "}
          {place.address}{" "}
        </p>
        <div className=" relative grid gap-2 grid-cols-1 rounded-3xl overflow-hidden md:grid-cols-[2fr_1fr] ">
          <div className="">
            {place.photos?.[0] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                className="aspect-square object-cover "
                src={place.photos[0]}
                alt=""
              />
            )}
          </div>
          <div className="grid gap-y-1 ">
            {place.photos?.[1] && (
              <div className="aspect-square object-cover">
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className=" aspect-square object-cover"
                  src={place.photos[1]}
                  alt=""
                />
              </div>
            )}

            {place.photos?.[2] && (
              <div className="aspect-square object-cover">
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square object-cover"
                  src={place.photos[2]}
                  alt=""
                />
              </div>
            )}
          </div>
          <button
            onClick={() => setShowAllPhotos(true)}
            className="absolute bottom-1 right-2  bg-gray-200 hover:bg-white shadow-gray-500 rounded-2xl p-1 cursor-pointer shadow-sm inline-flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className=" "> Show more</p>{" "}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr] mt-8 ">
          <div>
            <div className="my-4 ">
              <h2 className="text-xl font-bold">Description</h2>
              <p className=" line line-clamp-4">{place.description}</p>
            </div>
            <div className=" my-2 flex space-x-2 justify-between border rounded-xl p-2 bg-gray-200 border-gray-300 ">
              <p className="">Check-in: {place.checkIn}</p>

              <p className="">Check-out: {place.checkOut}</p>
              <p>Max-guests: {place.maxGuests}</p>
            </div>
            <div className="my-1">
              <h2 className="text-xl font-bold">Extra Info</h2>
              {place.extraInfo}
            </div>
          </div>
          <div>
            <div className="py-8 px-4 shadow rounded-2xl mt-5 ">
              <h2 className="text-2xl font-bold">
                ₹ Price: {place.prices} /per Night.
              </h2>
              <div className="  border  border-gray-300 rounded-xl  my-2">
                <div className="flex">
                  <div className="  rounded-2xl py-2 px-1">
                    <label className=" font-semibold" htmlFor="">
                      CheckIn:{" "}
                    </label>
                    <input
                      className="bg-gray-100 outline-none"
                      onChange={(e) => setCheckIn(e.target.value)}
                      value={checkIn}
                      type="date"
                    />
                  </div>
                  <div className="border-l  border-gray-300 py-2 px-1">
                    <label className=" font-semibold" htmlFor="">
                      CheckOut:{" "}
                    </label>
                    <input
                      className=" bg-gray-100 outline-none"
                      onChange={(e) => setCheckOut(e.target.value)}
                      value={checkOut}
                      type="date"
                    />
                  </div>
                </div>
                <div className="border-t border-gray-300 px-2 py-2">
                  <label className=" font-semibold" htmlFor="">
                    Max Guests :{" "}
                  </label>
                  <input
                    onChange={(e) => setMaxGuests(e.target.value)}
                    value={maxGuest}
                    placeholder="1"
                    className="border rounded-2xl border-gray-300 p-1 outline-none bg-gray-100"
                    type="number"
                  />
                </div>
              </div>
              {noOfDays>0 && (
                <>
                <div className="border rounded-xl border-gray-300 px-2 mb-2 py-2">
                  <label className=" font-semibold" htmlFor="">
                    Name {" "}
                  </label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Your Name..!"
                    className=" border-gray-300 p-1 outline-none bg-gray-100"
                    type="text"
                  />
                </div>
                <div className="border rounded-xl border-gray-300 px-2 py-2">
                  <label className=" font-semibold" htmlFor="">
                    Contact {" "}
                  </label>
                  <input
                    onChange={(e) => setMobile(e.target.value)}
                    value={mobile}
                    placeholder="Mobile"
                    className=" border-gray-300 p-1 outline-none bg-gray-100"
                    type="text"
                  />
                </div>
                </>
              )}

              <button onClick={bookNow}className="button w-full -ml-1">
              <span className="mr-2">Book Now</span>
              {noOfDays>0 && (
                
                <>

                    <span className="">
                    ₹ {noOfDays*place.prices}/-
                    </span>
                </>
              )}
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
