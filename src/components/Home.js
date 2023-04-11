import axios from "axios";
import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPlace } from "../features/placeSlice";

export default function Home() {
  const [places, setPlaces] = useState([]);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  useEffect(() => {
    const getPlaces = async () => {
      const res = await axios.get("/places");
      setPlaces([...res.data]);
    };
    getPlaces();
  }, []);

  const toSinglePlace =async (id)=>{
    dispatch(addPlace(id));
    navigate('/places/'+id);
  }
  return (
    <div className="">
    <Banner/>
    <div  className="mt-8 gap-x-6 gap-y-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  px-8 py-4">
      {places.length > 0 &&
        places.map((place) => {
          return (
            <div onClick={()=>toSinglePlace(place._id)}>
              <div className="mb-4">
                {place.photos?.[0] && (
                  <img
                    className="rounded-2xl aspect-square object-cover "
                    src={place.photos[0]}
                    alt=""
                  />
                )}
              </div>
              <h2 className="text-sm truncate leading-3">{place.title}</h2>
              <h3 className="font-bold mt-2 leading-3">{place.address}</h3>
              <div className="mt-2">
              <span className="font-bold">₹{place.prices} </span>per/Night
              </div>
            </div>
          );
        })}
    </div>
    </div>
  );
}
