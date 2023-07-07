import React, { useState } from "react";
import { HiOutlineCloudUpload } from "react-icons/hi";
import { FiUpload } from "react-icons/fi";

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    setSelectedFile(event.dataTransfer.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleBrowseClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen bg-gray-200 transition-opacity ${
        isDragging ? "opacity-75" : "opacity-100"
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <label
        htmlFor="fileInput"
        className="relative flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer bg-white text-gray-800 hover:bg-purple-100"
      >
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="text-purple-500 text-6xl">
          <HiOutlineCloudUpload />
        </div>
        <p className="text-3xl font-bold mb-2">
          {isDragging ? "Relâchez pour déposer le document" : "Glissez le document ici"}
        </p>
        <p className="text-lg">ou</p>
        <button
          className="flex items-center justify-center px-4 py-2 mt-4 text-white bg-purple-500 rounded-md hover:bg-purple-600"
          onClick={handleBrowseClick}
        >
          <FiUpload className="mr-2" />
          Parcourir
        </button>
      </label>

      {selectedFile && (
        <div className="mt-8 text-gray-800">
          <h3 className="text-xl font-bold mb-2">Fichier sélectionné :</h3>
          <p>Nom : {selectedFile.name}</p>
          <p>Taille : {selectedFile.size} octets</p>
          <p>Type : {selectedFile.type}</p>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
