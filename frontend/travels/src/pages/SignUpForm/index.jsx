import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { SignUpApi } from "../../api/SignUpApi";
import { SignUpApi } from "../../api/signupApi";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    if (formData.password !== formData.confirmpassword) {
      alert("Passwords do not match!");
      return;
    }

    const res = await SignUpApi(formData);

    if (res?.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      navigate("/");
    } else {
      alert("Sign up failed.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-gradient-x -z-10"></div>

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full z-10">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create an Account</h2>
          {["name", "email", "password", "confirmpassword"].map((field) => (
            <div key={field} className="mb-4">
              <label htmlFor={field} className="block text-sm font-semibold text-gray-700">
                {field === "confirmpassword" ? "Confirm Password" : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                id={field}
                name={field}
                type={field.includes("password") ? "password" : "text"}
                placeholder={`Enter ${field}`}
                onChange={handleChange}
                value={formData[field]}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
          ))}
          <button
            onClick={handleSignup}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md"
          >
            Sign Up
          </button>
          <div className="mt-4 text-center text-gray-700 text-sm">
            Already have an account?{" "}
            <button onClick={() => navigate("/login")} className="text-purple-600 hover:underline font-semibold">
              Log In
            </button>
          </div>
        </div>
      </div>

      <Footer />

      <style>
        {`
          @keyframes gradient-x {
            0%, 100% {
              background-position: 0% center;
            }
            50% {
              background-position: 100% center;
            }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 15s ease infinite;
          }
        `}
      </style>
    </>
  );
};

export default SignUpForm;
