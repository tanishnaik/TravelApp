import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginApi } from "../../api/loginApi";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await LoginApi({ email, password });

    if (res?.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      navigate("/");
    } else {
      alert("Login failed. Redirecting to Sign Up...");
      navigate("/signup");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center">
        {/* Image Section - Styled */}
        <div className="hidden md:flex md:w-1/2 h-full relative">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGUFJzNIaWcWl0TIG6nRpKRcNpxfx0sMsy9g&s"
            alt="Login Visual"
            className="w-full h-full object-cover rounded-l-2xl shadow-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black opacity-30"></div>
        </div>

        {/* Login Form Section */}
        <div className="flex items-center justify-center md:w-1/2 w-full px-6 py-10 bg-gradient-to-br from-white via-gray-50 to-blue-100">
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
            <div className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <button
                onClick={handleLogin}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Login
              </button>
              <p className="mt-4 text-center">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/signup")}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Sign Up
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginForm;
