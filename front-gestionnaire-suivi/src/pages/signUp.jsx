import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3002/auth/register", {
        email,
        password,
      });
      const user = response.data;
      console.log(user);
      // Récupérer l'ID de l'utilisateur à partir de la réponse
      const userId = user.access_token;

      // Stocker l'ID dans le localStorage
      localStorage.setItem("userId", userId);

      if (user) {
        console.log("Signup success!");
        // Rediriger l'utilisateur vers la page de connexion ou une autre page
        navigate("/login");
      } else {
        setError("Error during signup");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred during signup");
    }
  };

  const handleValidation = () => {
    if (email.trim() === "" || password.trim() === "") {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-white flex flex-col items-center justify-center">
        <div className="max-w-sm w-full px-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Signup</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleValidation}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handleValidation}
              />
            </div>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <p>{error}</p>
              </div>
            )}
            <button
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={!isFormValid}
            >
              Signup
            </button>
          </form>
          <div className="mt-4">
            <p>
              Already have an account?{" "}
              <Link
                className="font-bold text-blue-500 hover:text-blue-700"
                to="/login"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('https://picsum.photos/1600/900')" }}
      ></div>
    </div>
  );
}

export default Signup;
