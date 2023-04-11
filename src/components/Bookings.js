import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";

export default function Bookings() {
  const user = useSelector(selectUser);
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const getBookings = async () => {
      const res = await axios.get("/bookings/" + user.email);
      if (res.data.success) {
        setBookings(res.data.bookings);
      }
    };
    getBookings();
  }, []);

  if(bookings.length <=0){
      return (
        <div className="text-4xl underline text-primary my-5 font-serif font-bold text-center ">
          No Bookings yet...! 
        </div>
      )
  }
  return (
    <div>
      {bookings.length > 0 &&
        bookings.map((booking) => (
          <div
            key={booking._id}
            className=" bg-gray-100 max-w-6xl mx-auto my-5 rounded-xl md:flex"
          >
            {booking.place.photos[0] && (
              <img
                className="max-w-screen  md:max-w-xl  rounded-2xl"
                src={booking.place.photos[0]}
                alt=""
              />
            )}
            <div className="p-5 my-auto">
              <p className="border-b py-2 text-xl font-bold font-serif border-gray-300">
                {booking.place.title}
              </p>
              <p className="font-semibold py-2 inline-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {format(new Date(booking.checkIn), "dd-mm-yyyy")}{" "}
                <span className="mx-3">--></span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>{" "}
                {format(new Date(booking.checkOut), "dd-mm-yyyy")}
              </p>
              <div className="flex py-2">
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
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
                <p className="font-semibold  border-r border-gray-500 pr-3">
                  {" "}
                  Number of nights:-{"  "}{" "}
                  {differenceInCalendarDays(
                    new Date(booking.checkOut),
                    new Date(booking.checkIn)
                  )}
                </p>
                <p className="font-semibold  pl-3 inline-flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  Total Price:
                  <span className="font-bold">{'  '}₹{booking.price}/-</span>
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
