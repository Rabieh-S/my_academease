import React from "react";
import Dashboard from "../components/Dashboard";
import Cours from "../components/Cours";
import Navbar from "../components/Navbar";
import AllUsers from "../components/AllUsers";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Dashboard />
      <Cours />
    </div>
  );
};

export default Home;
