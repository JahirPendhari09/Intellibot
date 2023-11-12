import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from '../components/Home'
import Interviews from '../components/Interviews'
import Dashboard from '../components/Dashboard'
import About from '../components/About'
import { AudioToText } from '../components/AudioToText'
import { VideoRecorder } from "../components/VideoRecorder";
import { Login } from "../components/Login";
import { Signup } from "../components/Signup";


const Allroutes = () => {
  return (
    <Routes>
    <Route path='/' element={<Home />}></Route>
    <Route path='/dashboard' element={<Dashboard />}></Route>
    <Route path='/interviews' element={<Interviews />}></Route>
    <Route path='/about' element={<About />}></Route>
      <Route path="/dashboard/start_interview" element={<AudioToText/>} />
      <Route path="/video" element={<VideoRecorder />} />
        <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
    </Routes>
  );
};

export default Allroutes;
