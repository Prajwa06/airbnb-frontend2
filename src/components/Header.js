
import { SearchIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
import { Avatar } from "@mui/material";
import { auth } from "../firebase";
import {  signOut } from "firebase/auth";

export default function Header() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  
 
  
  const dispatch = useDispatch();
  const toLogin = () => {
    if (user) {
      dispatch(logout());
      signOut(auth);
    }
    navigate("/login");
  };
  const toAccount = () => {
    if (user) {
      navigate("/account");
      
    } else {
      navigate("/login");
    }
    
  };
  return (
    <div className="flex space-x-2 items-center py-5 justify-between w-screen border-b-2 shadow-gray-400 z-50 sticky bg-white top-0">
      {/* logo two diff according to screen size */}
      <img
        onClick={()=>navigate('/')}
        className="h-10 w-10  pr-1 md:hidden cursor-pointer"
        src="https://companieslogo.com/img/orig/ABNB-4aaade0f.png?t=1633511992"
        alt=""
      />
      <img
        onClick={()=>navigate('/')}
        className="h-16  hidden md:inline -mt-2 cursor-pointer"
        src="https://1000logos.net/wp-content/uploads/2017/08/Airbnb-logo.jpg"
        alt=""
      />

      {/* Search bar */}
      <div className=" hidden  md:flex cursor-pointer items-center border - border-gray-300 rounded-l-full rounded-r-full shadow-sm shadow-gray-300">
        <div className="py-3 px-1  m-1 hover:text-bold hover:text-gray-400">
          Anywhere
        </div>
        <div className="py-3 px-1 m-1 border-l-2  border-gray-300  hover:text-gray-400">
          Any Week
        </div>
        <div className="flex border-l-2   m-1 border-gray-300  py-3 px-1  items-center  hover:text-gray-400">
          <p>Add guests</p>
        </div>
        <div className="flex p-3 items-center  hover:text-gray-400">
          <SearchIcon className="text-white  bg-primary rounded-full p-1 -ml-3 h-8 hover:text-primary hover:bg-white border" />
        </div>
      </div>

      {/* sm search bar */}
      <div className="md:hidden flex relative">
        <input className="input w-full m-1" type="text" />
        <div className="flex p-3  absolute right-1 items-center  hover:text-gray-400">
          <SearchIcon className="text-white  bg-primary rounded-full p-1 -ml-3 h-8 hover:text-primary hover:bg-white border" />
        </div>
      </div>

      {/* menu and user icon */}
      <div className="flex relative cursor-pointer items-center border p-1  border-gray-300 rounded-l-full rounded-r-full shadow-sm shadow-gray-300">
      <Avatar className="h- m-1 cursor-pointer" onClick={toAccount} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 -ml-1 mr-1 cursor-pointer hover:text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          npm
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>

        
        {user && (
          <div onClick={toLogin}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 font-normal hover:text-gray-400 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
