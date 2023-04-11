import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectUser } from "../features/userSlice";
import { addPlace, removePlace } from "../features/placeSlice";



export default function Places() {

  const [places,setPlaces]=useState([]);
  const dispatch=useDispatch();
  const user=useSelector(selectUser);
  const navigate=useNavigate();
  useEffect(()=>{
    const getPlaces =async()=>{
      const response=await axios.post('/getplaces',
      {email:user.email});
      setPlaces(response.data.places);
    }
    getPlaces();
      },[]);

    const toDetails =(id)=>{
      dispatch(addPlace(id));
      navigate("/account/places/"+id);
    }
    const toForm=()=>{
      dispatch(removePlace());
    }

 
      
    
  return (
    <div className="">
    
      <div className="text-center my-4">
        <Link onClick={toForm} className=" w-80 md:w-36 inline-flex button my-4" to="/account/places/new">
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add New Place
        </Link>
      </div>
      
      {/* all listed places */}
      <div className="mt-5">
          {places.length >0 && places.map((place)=>(
            <div key={place._id} onClick={ ()=>{toDetails(place._id)} } className=" flex  cursor-pointer gap-4 bg-gray-100 p-4 mx-2 rounded-2xl ">
            
              <div  className="flex w-32 h-32 grow shrink-0">
                {place.photos.length >0 && (
                  <img className=" object-cover" src={place.photos[0]} alt="" />
                )}
              </div>
              <div className="grow-0 shrink ">
              <h1 className="font-bold font-sans text-xl">{place.title}</h1>
              <p className="mt-2 text-sm ">{place.description}</p>
              </div>
            </div>
            
          ))}
      </div>
     
    </div>
  );
}
