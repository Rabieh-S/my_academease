import React, { useState } from "react";

function StudentTable() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    nom: "",
    prenom: "",
    email: "",
    cursus: "",
  });

  const handleInputChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleAddStudent = () => {
    setStudents([...students, newStudent]);
    setNewStudent({
      nom: "",
      prenom: "",
      email: "",
      cursus: "",
    });
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
              <th className="py-2 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="py-2 px-4 text-center">{`${student.nom} ${student.prenom}`}</td>
                <td className="py-2 px-4 text-center">{student.email}</td>
                <td className="py-2 px-4 text-center">{student.cursus}</td>
                <td className="py-2 px-4 text-center">-</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentTable;
