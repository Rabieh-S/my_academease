import React, { useEffect, useState } from "react";
import axios from "axios";

function Cours() {
  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    nom: "",
    prenom: "",
    email: "",
    cursus: "",
    telephone: "",
  });
  const [formError, setFormError] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3002/user");
        setUsers(response.data); // Stocke les utilisateurs dans l'état local
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleEditUser = async (id) => {
    try {
      await axios.patch(`http://localhost:3002/user/${id}`);
      console.log(`Utilisateur avec ID ${id} édité avec succès.`);
    } catch (error) {
      console.error(
        `Erreur lors de l'édition de l'utilisateur avec ID ${id}`,
        error
      );
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/user/${id}`);
      console.log(`Utilisateur avec ID ${id} supprimé avec succès.`);
    } catch (error) {
      console.error(
        `Erreur lors de l'édition de l'utilisateur avec ID ${id}`,
        error
      );
    }
  };

  const colors = [
    "bg-purple-600",
    "bg-blue-200",
    "bg-white",
    "bg-blue-200",
    "bg-purple-600",
    "bg-blue-200",
    "bg-white",
    "bg-blue-200",
  ];

  const handleAddStudent = () => {
    if (
      newStudent.nom === "" ||
      newStudent.prenom === "" ||
      newStudent.email === "" ||
      newStudent.cursus === "" ||
      newStudent.telephone === ""
    ) {
      setFormError(true);
      return;
    }

    setStudents([...students, newStudent]);
    setNewStudent({
      nom: "",
      prenom: "",
      email: "",
      cursus: "",
      telephone: "",
    });
    setFormError(false);
  };

  const handleEditStudent = (index) => {
    const editedStudent = students[index];
    setNewStudent({
      nom: editedStudent.nom,
      prenom: editedStudent.prenom,
      email: editedStudent.email,
      cursus: editedStudent.cursus,
      telephone: editedStudent.telephone,
    });
    setStudents(students.filter((_, i) => i !== index));
  };

  const handleDeleteStudent = (index) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto py-4">
      <div className="text-center">
        <div className="text-left mb-4">
          <h2 className="text-2xl font-bold">Prochain cours :</h2>
        </div>
        <div className="mb-6 rounded-lg shadow-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="py-3 px-6">Email utilisateur</th>
                <th className="py-3 px-6">Roles</th>
                <th className="py-3 px-6">Editer</th>
                <th className="py-3 px-6">Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">{user.roles}</td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => handleEditUser(user.id)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md"
                    >
                      Editer
                    </button>
                  </td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Ajouter un élève</h3>
        <div className="flex justify-center">
          <div className="flex">
            <input
              type="text"
              name="nom"
              value={newStudent.nom}
              onChange={handleInputChange}
              placeholder="Nom"
              className="border border-gray-400 rounded-md px-3 py-2 mr-2 w-full"
            />
            <input
              type="text"
              name="prenom"
              value={newStudent.prenom}
              onChange={handleInputChange}
              placeholder="Prénom"
              className="border border-gray-400 rounded-md px-3 py-2 mr-2 w-full"
            />
            <input
              type="email"
              name="email"
              value={newStudent.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="border border-gray-400 rounded-md px-3 py-2 mr-2 w-full"
            />
            <input
              type="text"
              name="cursus"
              value={newStudent.cursus}
              onChange={handleInputChange}
              placeholder="Cursus"
              className="border border-gray-400 rounded-md px-3 py-2 mr-2 w-full"
            />
            <input
              type="text"
              name="telephone"
              value={newStudent.telephone}
              onChange={handleInputChange}
              placeholder="Téléphone"
              className="border border-gray-400 rounded-md px-3 py-2 mr-2 w-full"
            />
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
              onClick={handleAddStudent}
            >
              Ajouter un élève
            </button>
          </div>
        </div>
        {formError && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
            Le formulaire est vide.
          </div>
        )}
      </div>
    </div>
  );
}

export default Cours;
