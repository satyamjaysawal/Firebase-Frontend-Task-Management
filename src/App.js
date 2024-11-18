import React, { useState, useEffect } from "react";
import { auth, provider } from "./firebaseConfig";
import { signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from "firebase/auth";
import Tasks from "./components/Tasks";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [user, setUser] = useState(null);
  const [isRegister, setIsRegister] = useState(false); // Track if the user is in Register mode
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setNotification({ message: "Signed in successfully!", type: "success" });
    } catch (error) {
      setNotification({ message: `Sign-in failed: ${error.message}`, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setNotification({ message: "Signed out successfully!", type: "success" });
    } catch (error) {
      setNotification({ message: `Sign-out failed: ${error.message}`, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Handle registration success
  const handleRegisterSuccess = (message) => {
    setIsRegister(false); // Switch to login form
    setNotification({ message, type: "success" });
  };

  return (
    <div className="App min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Task Management System</h1>

        {loading && <p className="text-center text-blue-500">Loading...</p>}

        {user ? (
          <div>
            <p className="text-xl mb-4 text-center text-gray-800">
              Welcome, {user.displayName || user.email}!
            </p>
            <button
              onClick={handleSignOut}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 mb-4"
            >
              Sign Out
            </button>
            <Tasks user={user} />
          </div>
        ) : (
          <div>
            <button
              onClick={handleGoogleSignIn}
              className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 mb-4"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in with Google"}
            </button>

            {notification.message && (
              <p
                className={`text-center ${notification.type === "success" ? "text-green-500" : "text-red-500"} mb-4`}
              >
                {notification.message}
              </p>
            )}

            <div className="mt-6">
              {isRegister ? (
                <>
                  <Register
                    setNotification={setNotification}
                    onRegisterSuccess={handleRegisterSuccess}
                  />
                  <p className="text-center mt-4">
                    Already have an account?{" "}
                    <button
                      onClick={() => setIsRegister(false)}
                      className="text-blue-500"
                    >
                      Login here
                    </button>
                  </p>
                </>
              ) : (
                <>
                  <Login
                    setUser={setUser}
                    setNotification={setNotification}
                  />
                  <p className="text-center mt-4">
                    Don't have an account?{" "}
                    <button
                      onClick={() => setIsRegister(true)}
                      className="text-blue-500"
                    >
                      Register here
                    </button>
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
