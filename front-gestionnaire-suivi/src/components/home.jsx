import React from "react";
import Dashboard from "./Dashboard";
import Cours from "./Cours";
import Navbar from "./navbar";
import AllUsers from "./AllUsers";

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
