import React, { useState, useEffect } from "react";

function StudentTable() {
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
    const storedStudents = localStorage.getItem("students");
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const handleInputChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

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

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-2xl font-bold mb-4">Liste des étudiants</h2>
      <div className="shadow-lg rounded-md overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-2 px-4 text-center">Nom prénom</th>
              <th className="py-2 px-4 text-center">Email</th>
              <th className="py-2 px-4 text-center">Cursus</th>
              <th className="py-2 px-4 text-center">Téléphone</th>
              <th className="py-2 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="py-2 px-4 text-center">{`${student.nom} ${student.prenom}`}</td>
                <td className="py-2 px-4 text-center">{student.email}</td>
                <td className="py-2 px-4 text-center">{student.cursus}</td>
                <td className="py-2 px-4 text-center">{student.telephone}</td>
                <td className="py-2 px-4 text-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded-md"
                    onClick={() => handleEditStudent(index)}
                  >
                    Éditer
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                    onClick={() => handleDeleteStudent(index)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default StudentTable;
