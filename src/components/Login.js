import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { signInWithPopup ,  signInWithEmailAndPassword} from "firebase/auth";
import { auth, provider } from "../firebase";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  // sign in with email password
  const handlelogin = async (e) => {
    e.preventDefault();
   try {
    const response = await axios.post("/login", { email, password });
    alert(response.data.message);
    const user = response.data.currUser;
    if(user){
      dispatch(login(user));
      
    signInWithEmailAndPassword(auth, email, password)
    .then((userAuth) => {
      dispatch(
        login({
          email: userAuth.user.email,
          uid: userAuth.user.uid,
          displayName: userAuth.user.displayName,
          
        })
      );
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
      navigate("/");
    }
   } catch (error) {
    console.log(error);
   }
  };

  // sign in with google
  const googleSignIn = async (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const response = await axios.post("/login", {
          email: user.email,
          password: "google",
        });
        console.log(response.data.currUser);
        if (response.data.currUser) {
         
          dispatch(
            login({
              displayName: user.displayName,
              email: user.email,
              photoUrl: user.photoURL,
            })
          );
          navigate("/");
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
    
  };
  return (
    <>
      <div className="max-w-lg mx-auto py-10 items-center justify-around">
        <div className="border shadow-md m-5 py-10  rounded-lg ">
          <h1 className="text-4xl font-bold text-center my-5">Login</h1>
          <form action="" className=" flex flex-col m-auto max-w-md">
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="input"
              type="email"
              placeholder="You@email.com"
            />
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="input"
              type="password"
              placeholder="password"
            />
            <button className="button" onClick={handlelogin}>
              Login
            </button>
            <button
              onClick={googleSignIn}
              className="m-2 p-1 rounded-full font-bold text-blue-500 border border-blue-500 hover:text-white hover:bg-blue-500"
            >
              Login with Google
            </button>
          </form>
          <div className="text-center m-2">
            <p className="text-gray-500">
              Dont have account yet..?{" "}
              <span
                className="text-blue-500   hover:text-gray-300 cursor-pointer"
                onClick={() => navigate("/register")}
              >
                register here.
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
