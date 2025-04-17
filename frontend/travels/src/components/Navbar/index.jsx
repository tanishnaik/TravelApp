import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = ({ setsearch, search, isDarkMode, toggleDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const [isListening, setIsListening] = useState(false); // To track whether voice search is active
  const navigate = useNavigate();

  // Set username from localStorage if available
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.name) {
      setUsername(storedUser.name);
    }
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    localStorage.removeItem("user"); // Remove user data
    setUsername(null); // Clear the username in the state
    navigate("/"); // Redirect to home page
    window.location.reload(); // Optional: reload page to re-render the navbar
  };

  // Initialize SpeechRecognition
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  // Handle speech input
  const handleVoiceSearch = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  recognition.onresult = (event) => {
    let transcript = event.results[0][0].transcript;

    // Remove any trailing period (full stop)
    transcript = transcript.replace(/\.$/, '').trim();

    setsearch(transcript.toLowerCase()); // Update the search value with the cleaned voice input
    setIsListening(false); // Turn off listening state once voice input is done
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error", event.error);
    setIsListening(false); // Turn off listening state if an error occurs
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full shadow-lg z-50 transition-all duration-300 ${
        isDarkMode
          ? "bg-gray-900 bg-opacity-90 backdrop-blur-lg"
          : "bg-white shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Brand */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          {/* Microphone logo for voice search */}
          <img className="w-13 h-13" src="https://cdn-icons-png.flaticon.com/128/1983/1983854.png"/>
          <h1
            className={`text-2xl font-extrabold select-none ${
              isDarkMode ? "text-white" : "text-blue-600"
            }`}
          >
            Holidaysadda
          </h1>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md mx-6 hidden sm:block">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search for destinations..."
              onChange={(e) => setsearch(e.target.value.toLowerCase())}
              value={search}
              className={`w-full rounded-full py-2 pl-4 pr-4 ${
                isDarkMode
                  ? "text-gray-100 placeholder-gray-400 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  : "text-gray-800 placeholder-gray-400 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              }`}
            />
            <button
              className="p-2 bg-gray-300 rounded-full hover:bg-gray-400"
              onClick={handleVoiceSearch}
              aria-label="Voice Search"
            >
              {isListening ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-blue-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 18v-6m0 0V6m0 12a6 6 0 1 0-6-6h6z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                  className="w-6 h-6 text-blue-600"
                >
                  <path d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Buttons */}
        <nav
          className={`hidden md:flex items-center gap-6 font-semibold select-none ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/about")}>About</button>
          <button onClick={() => navigate("/contact")}>Contact</button>

          {username ? (
            <>
              <span className="font-bold text-black">
                {username.length > 12
                  ? username.slice(0, 12) + "..."
                  : username}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/signup")}>Sign Up</button>
              <button
                className="p-2 rounded-full hover:bg-blue-400"
                onClick={() => navigate("/login")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  width="24"
                  fill="currentcolor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </button>
            </>
          )}

          {/* Dark mode */}
          <button
            aria-label="Toggle theme"
            onClick={toggleDarkMode}
            className={`ml-3 p-2 rounded-full ${
              isDarkMode ? "bg-indigo-600" : "bg-blue-400"
            }`}
          >
            {isDarkMode ? "🌙" : "☀"}
          </button>
        </nav>
      </div>
    </header>
  );
};
