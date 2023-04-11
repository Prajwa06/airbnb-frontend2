import React, { useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import axios from 'axios';
import Header from './components/Header';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useDispatch, useSelector, } from 'react-redux';
import { login, logout, } from './features/userSlice';
import Account from './components/Account';
import NewPlace from './components/NewPlace';
import { selectplace } from './features/placeSlice';
import SinglePlace from './components/SinglePlace';
function App() {
  
  const dispatch=useDispatch();
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login({
          displayName: user.displayName,
          email:user.email,
          photoUrl:user.photoURL,
        }));
        // ...
      } else {
        dispatch(logout());
      }
    });

    
  },[dispatch]);

  const id=useSelector(selectplace);
  console.log(id);
  

  // axios.defaults.baseURL="https://airbnb-backend-iota.vercel.app";
  axios.defaults.baseURL="https://backend-airbnb.vercel.app";
  return (
    <div className="App">
    <Header/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/account" element={<Account/>}/>
      <Route path="/account/bookings" element={<Account/>}/>
      <Route path="/account/places" element={<Account/>}/>
      <Route path="account/places/new" element={<NewPlace/>}/>
      <Route path={"account/places/"+id } element={<NewPlace/>} />
      <Route path={"/places/"+id } element={<SinglePlace/>} />
     </Routes>
    </div>
  );
}

export default App;
