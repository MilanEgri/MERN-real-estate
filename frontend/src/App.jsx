import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import React, { useState } from "react";

export const Context = React.createContext();
function App() {
  const[user,setUser] = useState(null)
  return (
    <BrowserRouter>
    <Context.Provider value={[user,setUser]}>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
      </Context.Provider>
    </BrowserRouter>
  );
}

export default App;
