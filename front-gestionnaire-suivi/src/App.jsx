import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/signUp";
import Login from './components/Login';
import Dashboard from "./components/Dashboard";
import NotFound from './components/NotFound'
import Home from './components/home'
import Navbar from './components/navbar'
import Form from './components/Form';
import AllUsers from './components/AllUsers'
import Files from './components/Files'
import Student from './components/AllUsersStudent'
import EditUser from './components/EditUser'
import Profile from './components/Profile'

function App() {
  return (
    <div>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/form" element={<Form />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/files" element={<Files />} />
          <Route path="/student" element={<Student />} />
          <Route path="/edit" element={<EditUser />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
  ) 
}

export default App;
