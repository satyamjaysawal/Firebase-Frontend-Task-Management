import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const Login = ({ setUser, signupSuccess, setNotification }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle the login action
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Attempt login with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setNotification({ message: "Login successful!", type: "success" });

      // Clear notification after 3 seconds
      setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 3000);
    } catch (err) {
      setNotification({ message: err.message, type: "error" });

      // Clear notification after 3 seconds
      setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Login</h2>

      {/* Success or Error Message */}
      {signupSuccess && (
        <p className="text-green-600 text-center mb-4">{signupSuccess}</p>
      )}
      {setNotification?.message && (
        <p
          className={`text-center mb-4 text-sm ${setNotification.type === "error" ? "text-red-600" : "text-green-600"}`}
        >
          {setNotification.message}
        </p>
      )}

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-5">
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
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 text-white rounded-md transition duration-300 ${
            isLoading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
          }`}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Additional Success or Error Message */}
      {signupSuccess && (
        <p className="text-green-600 text-center mt-4">{signupSuccess}</p>
      )}
    </div>
  );
};

export default Login;
