import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  return (
    <section className="w-full bg-gray-100">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-4">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Modules</h1>
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-1 px-2 rounded-lg flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-award h-5 w-5"
            >
              <circle cx="12" cy="8" r="7" />
              <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" />
            </svg>
            <span className="text-base">Cursus DWWM - P2</span>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Eleve</h2>
          <p className="text-gray-600">Apprenant</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Enseignant
          </h2>
          <p className="text-gray-600">Formateur</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Module</h2>
          <p className="text-gray-600">Contenu</p>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
