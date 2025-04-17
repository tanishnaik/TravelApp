import React from "react";
import { Routes, Route } from "react-router-dom";
import { HotelPage } from "./pages/HotelPage";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { HotelDescripion } from "./components/HotelDescription";
import HotelBookingForm from "./components/HotelBooking";
import { ConfirmBooking } from "./pages/ConfirmBooking";
import SignUpForm from "./pages/SignUpForm";
import LoginForm from "./pages/LoginForm";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HotelPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/book/:id"
        element={
          <PrivateRoute>
            <HotelDescripion />
          </PrivateRoute>
        }
      />
      <Route
        path="/hotelbookingform"
        element={
          <PrivateRoute>
            <HotelBookingForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/confirmBooking"
        element={
          <PrivateRoute>
            <ConfirmBooking />
          </PrivateRoute>
        }
      />

      {/* Public Routes */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
}

export default App;
