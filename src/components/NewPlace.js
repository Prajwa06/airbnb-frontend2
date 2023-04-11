import React, { useEffect, useState } from "react";
import Perks from "./Perks";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { selectplace } from "../features/placeSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";

export default function NewPlace() {
  const classh2 = "text-xl ml-2 mt-4 font-bold font-serif";
  const classInput = "my-1 w-full border rounded-full p-2 outline-none";

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const[prices,setPrices]=useState('');
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const id = useSelector(selectplace);
  const storage = getStorage();


  const addPhotoByLink = async (e) => {
    e.preventDefault();
    //----------------------------------
    setAddedPhotos((prev) => {
      return [...prev, photoLink];
    });
    //----------------------
   
    
    setPhotoLink("");
  };



    

  

  useEffect(() => {
    if (!id ) {
      return;
    }
    else{
    const getCurrPlace = async () => {
      const res = await axios.get("/places/" + id);
      const { data } = res;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrices(data.prices);
    };
    getCurrPlace();
  }
  }, [id]);

  const savePlace = async (e) => {
    e.preventDefault();
    const placeData = {
      email: user.email,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      prices,
    };
    if (id) {
      // update
      const { data } = await axios.put("/places/" + id, { ...placeData });

      if (data.success) {
        navigate("/account/places");
      } else {
        alert(data.err.message);
      }
    } else {
      //add

      const { data } = await axios.post("/places", placeData);

      if (data.success) {
        navigate("/account/places");
      } else {
        alert(data.err.message);
      }
    }
  };

  const deletePic = (e, filename) => {
    e.preventDefault();
    setAddedPhotos([...addedPhotos.filter((photo) => photo !== filename)]);
  };

  const setAsMain = (e, filename) => {
    e.preventDefault();
    const notselectedPhotos=addedPhotos.filter((photo) => photo !== filename);
    const newAddedPhotos=[filename, ...notselectedPhotos];
    setAddedPhotos(newAddedPhotos);
  };
  return (
    <>
      <div className="sm:m-5 sm:p-2  md:m-20 border shadow-sm my-20 rounded-lg md:p-5">
        <form action="" className="p-2 ">
          {/* title */}
          <h2 className={classh2}>Title</h2>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            placeholder="title, For example : My house"
            className={classInput}
          />
          {/* Address */}
          <h2 className={classh2}>Address</h2>
          <input
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            className={classInput}
            type="text"
            placeholder="Address to your place"
          />

          {/* Upload Photos */}
          <h2 className={classh2}>Photos</h2>
          {/* using Link */}
          <div className="flex">
            <input
              value={photoLink}
              onChange={(e) => {
                setPhotoLink(e.target.value);
              }}
              type="text"
              className={classInput}
              placeholder="Add Using link... ? "
            />
            <button className="button" onClick={addPhotoByLink}>
              Add Photo
            </button>
          </div>
          <div className="mt-2 grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {addedPhotos.length > 0 &&
              addedPhotos.map((link) => (
                <div className="relative">
                  <img
                    className="rounded-2xl object-cover h-48 w-96"
                    key={link}
                    src={link}
                    alt="imageb"
                  />
                  <button
                    onClick={(e) => deletePic(e, link)}
                    className="bg-black p-1 rounded-full bg-opacity-75 absolute z-50 top-1 text-gray-100 cursor-pointer border-opacity-50 hover:text-primary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5  "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => setAsMain(e, link)}
                    className="bg-black p-1 rounded-full bg-opacity-75 absolute z-50 top-1 left-8 text-gray-100 cursor-pointer border-opacity-50 hover:text-primary"
                  >
                    {link === addedPhotos[0] ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              ))}
          
          </div>
          <div className="m-2 ">
            {/* description */}
            <h2 className={classh2}>Description</h2>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className="outline-none p-1 border w-full rounded-lg"
              id=""
              cols="15"
              rows="5"
            />
            {/* Perks */}
            <Perks selected={perks} setPerks={setPerks} />
          </div>
          {/* extraInfo */}
          <h2 className={classh2}>Extra Info</h2>
          <p className="text-gray-500 ml-2">House rules, extras</p>
          <textarea
            value={extraInfo}
            onChange={(e) => {
              setExtraInfo(e.target.value);
            }}
            className="outline-none p-1 border w-full rounded-lg"
            id=""
            cols="15"
            rows="2"
          />

          {/* Check In CKeck Out */}
          <h2 className={classh2}>CheckIn And CheckOut times & Maxguests</h2>
          <p className="text-gray-500 ml-2">
            add Check in check in and check out times , Remembar to have some
            time window for Cleaning and Maintainance{" "}
          </p>

          <div className="grid sm:grid-cols-1  md:grid-cols-3 lg:grid-cols-4 first:">
            <div className="">
              <h3 className="mt-2 -mb-1 ">Check In time</h3>
              <input
                value={checkIn}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                }}
                className="input -ml-1"
                type="text"
                placeholder="14:00"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1 ">Check out time</h3>
              <input
                value={checkOut}
                onChange={(e) => {
                  setCheckOut(e.target.value);
                }}
                className="input -ml-1"
                type="text"
                placeholder="12:00"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1 ">Max no of guests</h3>
              <input
                value={maxGuests}
                onChange={(e) => {
                  setMaxGuests(e.target.value);
                }}
                className="input -ml-1"
                type="text"
                placeholder="--"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1 ">Prices</h3>
              <input
                value={prices}
                onChange={(e) => {
                  setPrices(e.target.value);
                }}
                className="input -ml-1"
                type="text"
                placeholder="charges/night"
              />
            </div>
          </div>

          {/* submit */}
          <button
            onClick={savePlace}
            className="text-center button w-full mt-4"
          >
            <p className="mx-auto">Save</p>
          </button>
        </form>
      </div>
    </>
  );
}
