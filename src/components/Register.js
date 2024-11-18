import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const Register = ({ setNotification, onRegisterSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = (password) => password.length >= 6;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isEmailValid(email)) {
      setNotification({ message: "Please enter a valid email address.", type: "error" });
      return;
    }
    if (!isPasswordValid(password)) {
      setNotification({ message: "Password must be at least 6 characters.", type: "error" });
      return;
    }

    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setNotification({ message: "Registration successful!", type: "success" });
      
      // Trigger the onRegisterSuccess callback
      onRegisterSuccess("Registration successful! Please login.");

      // Clear the form fields
      setEmail("");
      setPassword("");
    } catch (error) {
      setNotification({ message: "Failed to register: " + error.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Register</h2>
      <form onSubmit={handleRegister} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <button
          type="submit"
          className={`w-full py-3 bg-green-500 text-white rounded-md transition duration-300 ${
            isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-600"
          }`}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
