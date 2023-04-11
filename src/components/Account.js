import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { removePage, selectPage, setPage } from "../features/pageSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Logout from "./Logout";
import Places from "./Places";
import Bookings from "./Bookings";

export default function Account() {
  const user = useSelector(selectUser);
  const page = useSelector(selectPage);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toBookings = () => {
    dispatch(setPage("bookings"));
  };
  const toPlaces = () => {
    dispatch(setPage("places"));
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    signOut(auth);
  };
  return (
    <div className="">
      {user ? (
        <>
          <div className=" md:flex md:justify-center mt-8">
            <Link
              onClick={() => {
                dispatch(removePage());
              }}
              className={!page ? "active" : "inactive"}
              to={"/account"}
            >
              {" "}
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
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>{" "}
              My Profile
            </Link>
            
            <Link
              onClick={toBookings}
              className={page === "bookings" ? "active mx-2" : "inactive mx-2"}
              to={"/account/bookings"}
            >
              {" "}
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
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              My Bookings
            </Link>
            <Link
              onClick={toPlaces}
              className={page === "places" ? "active" : "inactive"}
              to={"/account/places"}
            >
              {" "}
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              My Accomodations
            </Link>
          </div>

          {!page && (
            <div className="text-center flex flex-col justify-center mx-auto max-w-lg">
              Logged in as {user.displayName}
              <button className="button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}

          {page === "bookings" && <div><Bookings/></div>}
          {page === "places" && <Places />}
        </>
      ) : (
        <div>
          <Logout />
        </div>
      )}
    </div>
  );
}
