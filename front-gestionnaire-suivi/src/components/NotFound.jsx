import React from "react";

function NotFound() {
  return (
    <div className="bg-gray-100 h-screen flex flex-col items-center justify-center">
      {/* <img src="" alt="Erreur 404" className="h-48 w-auto mb-8" /> */}
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Oups !</h1>
      <p className="text-gray-600 text-lg mb-4">La page que vous recherchez est introuvable.</p>
      <a href="/" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-lg">
        Retourner à l'accueil
      </a>
    </div>
  );
}

export default NotFound;
