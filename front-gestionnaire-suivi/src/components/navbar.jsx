import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isTop, setIsTop] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const top = window.scrollY < 100;
      if (top !== isTop) {
        setIsTop(top);
      }
    });
  }, [isTop]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`w-full transition-all duration-500 ${
        isTop ? "bg-transparent py-8" : "bg-white py-4 shadow-lg sticky"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="hidden lg:block h-8 w-auto"
                src="assets/graduation-home.svg"
                alt="Logo fdfdf"
              />
            </Link>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              <ul className="flex space-x-4">
                <li>
                  <Link
                    to="/"
                    className="text-gray-500 hover:text-purple-600 border-b-2 border-transparent hover:border-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cursus"
                    className="text-gray-500 hover:text-purple-600 border-b-2 border-transparent hover:border-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Cursus
                  </Link>
                </li>
                <li>
                  <Link
                    to="/programme"
                    className="text-gray-500 hover:text-purple-600 border-b-2 border-transparent hover:border-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Programme
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pdf"
                    className="text-gray-500 hover:text-purple-600 border-b-2 border-transparent hover:border-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    PDF
                  </Link>
                </li>
              </ul>
            </div>
            <div className="md:hidden ml-2">
              <button
                onClick={toggleMenu}
                className="flex items-center text-gray-500 hover:text-purple-600 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-2">
            <ul className="flex flex-col space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-500 hover:text-purple-600 border-b-2 border-transparent hover:border-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/cursus"
                  className="text-gray-500 hover:text-purple-600 border-b-2 border-transparent hover:border-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Cursus
                </Link>
              </li>
              <li>
                <Link
                  to="/programme"
                  className="text-gray-500 hover:text-purple-600 border-b-2 border-transparent hover:border-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Programme
                </Link>
              </li>
              <li>
                <Link
                  to="/pdf"
                  className="text-gray-500 hover:text-purple-600 border-b-2 border-transparent hover:border-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  PDF
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
