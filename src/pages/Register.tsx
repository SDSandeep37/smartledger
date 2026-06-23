import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const timer = () => {
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };
  const handleFormSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!formData.email && !formData.password && !formData.name) {
        setMessageType("error");
        setMessage("Please fill the form");
        return;
      }
      if (!formData.name) {
        setMessageType("error");
        setMessage("Please enter your full name");
        return;
      }
      if (!formData.email) {
        setMessageType("error");
        setMessage("Please enter your email");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setMessageType("error");
        setMessage("Password should be same.");
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
        `${import.meta.env.VITE_PUBLIC_API_URL}/user/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: "owner",
          }),
          credentials: "include",
        },
      );
      const result = await response.json();
      console.log(result);
      if (!result.success) {
        setMessageType("error");
        setMessage(result.message);
        return;
      }
      if (result.success) {
        setMessageType("success");
        setMessage(result.message);
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Register failed:", error);
      setMessageType("error");
      setMessage("Some went wrong. Please try again!");
    }
  };
  return (
    <div className=" min-h-screen flex items-center justify-center bg-linear-to-br from-black via-[#0a0f1f] to-[#000000] relative">
      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md bg-black/70 backdrop-blur-lg border border-blue-500/40 rounded-xl shadow-xl p-8">
        {/* Logo */}
        <div
          className="flex justify-center items-center"
          style={{ width: "100%", height: "80px" }}
        >
          <img src="/logo.png" alt="SmartLedger Logo" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Welcome to{" "}
          <span className="text-(--accent-orange-glow)">SmartLedger</span>
        </h2>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleFormSubmit}>
          <div>
            <label className="block text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-blue-500/40 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-blue-500/40 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-blue-500/40 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
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
            type="submit"
            className="w-full cursor-pointer bg-(--accent-orange) hover:bg-(--accent-orange-glow) text-white font-semibold py-3 rounded-lg shadow-lg transition"
          >
            Register
          </button>
        </form>

        {/* Links */}
        <div className="flex justify-between text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="hover:text-(--accent-orange)">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
