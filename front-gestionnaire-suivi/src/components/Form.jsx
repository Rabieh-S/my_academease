import React, { useState } from "react";

function Form() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [region, setRegion] = useState("");
  const [cursus, setCursus] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation des données et traitement du formulaire ici
    console.log("Formulaire soumis");
    console.log("Nom:", nom);
    console.log("Prénom:", prenom);
    console.log("Région:", region);
    console.log("Cursus:", cursus);
    console.log("Téléphone:", telephone);
    console.log("Email:", email);
  };

  return (
    <div className="max-w-3xl mx-auto flex items-center justify-center">
      <div className="bg-gray-200 rounded-md shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Ajouter un élève</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="nom">Nom</label>
              <input
                type="text"
                id="nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label htmlFor="prenom">Prénom</label>
              <input
                type="text"
                id="prenom"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label htmlFor="region">Région</label>
              <select
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              >
                <option value="">Sélectionnez une région</option>
                <option value="region1">Région 1</option>
                <option value="region2">Région 2</option>
                <option value="region3">Région 3</option>
              </select>
            </div>
            <div>
              <label htmlFor="cursus">Cursus</label>
              <select
                id="cursus"
                value={cursus}
                onChange={(e) => setCursus(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              >
                <option value="">Sélectionnez un cursus</option>
                <option value="dwwm">DWWM</option>
                <option value="cda">CDA</option>
                <option value="tssr">TSSR</option>
              </select>
            </div>
            <div>
              <label htmlFor="telephone">Téléphone</label>
              <input
                type="tel"
                id="telephone"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Soumettre
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
