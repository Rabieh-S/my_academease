import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt from "jwt-decode";

function Profile() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleUser = (e) => {
    const token = localStorage.getItem("token");
    const userToken = jwt(token);
    if (userToken) {
      const userId = userToken.sub;
      return userId;
    }
    try {
      const response = axios.get(`http://localhost:3002/user/${userId}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const userToken = jwt(token);
    try {
      const response = axios.post(
        `http://localhost:3002/user/${userToken.sub}/profile`,
        {
          firstname: firstName,
          lastname: lastName,
          phone: phone,
          address: address,
          postal_code: postalCode,
          city: city,
        }
      );
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
    // Validation des données et traitement du formulaire ici
    console.log("Formulaire soumis");
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Status:", status);
    console.log("Phone:", phone);
    console.log("Address:", address);
    console.log("Postal Code:", postalCode);
    console.log("City:", city);
  };

  const handleDeleteAccount = () => {
    // Mettez ici votre logique pour supprimer le compte de l'utilisateur
    console.log("Supprimer le compte");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Modifier le profil</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName">Prénom</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label htmlFor="lastName">Nom</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label htmlFor="phone">Téléphone</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label htmlFor="address">Adresse</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label htmlFor="postalCode">Code Postal</label>
              <input
                type="text"
                id="postalCode"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label htmlFor="city">Ville</label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              />
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
            >
              Sauvegarder
            </button>
            <button
              onClick={() => setShowDeleteConfirmation(true)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Supprimer mon compte
            </button>
          </div>
        </form>
        {showDeleteConfirmation && (
          <div className="mt-4 bg-red-100 text-red-900 p-4 rounded">
            <p>Êtes-vous sûr de vouloir supprimer votre compte ?</p>
            <div className="flex justify-end mt-2">
              <button
                onClick={handleDeleteAccount}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Oui
              </button>
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded ml-2"
              >
                Non
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
