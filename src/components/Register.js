import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useDispatch} from "react-redux";
import { login } from "../features/userSlice";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch=useDispatch();

  // register using google
  const signUp = async(e) => {
    // avoid reload 
    e.preventDefault();

    // google sign up
    signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user;
      try {
        // registering user in database
       let res = await axios.post("/register", {
          name:user.displayName,
          email:user.email,
          password:"google",
          logintype:"Google",
        });
        
        res=res.data;
        // if user created succesfully
        if(res.success){
          // changing redux state to login
          dispatch(login({
            displayName: user.displayName,
            email:user.email,
            photoUrl:user.photoURL,
           }));
           // proceed to login with alert
           alert("Login Succesful.");
           navigate('/');  
        }
      } catch
      (error) {
        console.log(error);
        alert("Email already exist registration failed");
      }
    }).catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
    });

    
  };


  // register using email password
  const registerUser = async (e) => {
     // avoid page reload
     e.preventDefault();

     // registering user in mongo db database using local server
     try {
      let res = await axios.post("/register", {
        name,
        email,
        password,
        logintype:"email",
      });
      res=res.data;

      if(res.success){
      
          // ensure there is no empty name
    if (!name) {
      return alert("Please enter a full name");
    }

   // adding user to firebase to have persistance in redux state 
    const userAuth = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userAuth.user, {
      displayName:name, 
    });

   // changing redux state
    dispatch(login(
      {
        email: userAuth.user.email,
        uid: userAuth.user.uid,
        displayName: name,
      }
    ))

        navigate("/");
        alert("User registered succesfully ");




      }
    } catch(err) {
      console.log(err);
      alert("Email already exist registration failed");
    }
    
   
  

    //----------------------
   
  };
  return (
    <>
     
      <div className="max-w-lg mx-auto py-5 items-center justify-around">
        <div className="border shadow-md m-5 py-10  rounded-lg ">
          <h1 className="text-4xl font-bold text-center my-5">Sign Up</h1>
          <form action="" className=" flex flex-col m-auto max-w-md">
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="input"
              type="text"
              placeholder="Name"
            />
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
            <button className="button" onClick={registerUser}>
              Sign Up
            </button>
            <button
              onClick={signUp}
              className="m-2 p-1 rounded-full font-bold text-blue-500 border border-blue-500 hover:text-white hover:bg-blue-500"
            >
              Sign Up with Google
            </button>
          </form>
          <div className="text-center m-2">
            <p className="text-gray-500">
              Already a membar?{" "}
              <span
                className="text-blue-500   hover:text-gray-300 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                to login page.
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
