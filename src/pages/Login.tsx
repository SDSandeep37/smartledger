import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuthContext } from "../Contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageType, setMessageType] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { refreshUser } = useContext(UserAuthContext)!;
  const timer = () => {
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };
  const handleLogin = (event: any) => {
    event.preventDefault();
    try {
      if (!email && !password) {
        setMessageType("error");
        setMessage("Please fill the form");
        return;
      }
      if (!email) {
        setMessageType("error");
        setMessage("Please enter your email");
        return;
      }
      if (!password) {
        setMessageType("error");
        setMessage("Password is required");
        return;
      }
      handleApiCall();
    } catch (error) {
      console.log(error);
    } finally {
      timer();
    }
  };
  const handleApiCall = async () => {
    try {
      setMessageType("");
      setMessage("Please wait...");
      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_API_URL}/user/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          credentials: "include",
        },
      );
      const result = await response.json();
      if (!result.success) {
        setMessageType("error");
        setMessage(result.message);
        return;
      }
      setMessageType("success");
      setMessage(result.message);
      await refreshUser();
      navigate("/smartledger");
    } catch (error) {
      console.error("Login failed:", error);
      setMessageType("error");
      setMessage("Some went wrong. Please try again!");
    } finally {
      timer();
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-[#0d2c32] to-[#3d2101] relative">
      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-black/70 backdrop-blur-lg border border-blue-500/40 rounded-xl shadow-xl p-8">
        {/* Logo */}
        <div
          className="flex justify-center items-center"
          style={{ width: "100%", height: "80px" }}
        >
          <img src="/logo.png" alt="SmartLegder Logo" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Welcome to{" "}
          <span className="text-(--accent-orange-glow)">SmartLedger</span>
        </h2>

        {/* Form */}
        <form className="space-y-5">
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-blue-500/40 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-blue-500/40 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {message && (
            <p
              style={{
                textAlign: "center",
                fontSize: "14px",
                fontWeight: "500",
                maxWidth: "300px",
                padding: "5px 0px",
              }}
              className={
                messageType === "success" ? "text-green-500" : "text-red-500"
              }
            >
              {message}
            </p>
          )}
          <button
            onClick={handleLogin}
            type="submit"
            className="cursor-pointer w-full bg-(--accent-orange) hover:bg-(--accent-orange-glow) text-white font-semibold py-3 rounded-lg shadow-lg transition"
          >
            Log In
          </button>
        </form>

        {/* Links */}
        <div className="flex justify-between text-sm text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="hover:text-(--accent-orange)">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
