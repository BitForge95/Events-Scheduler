import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("events-scheduler-backend-production.up.railway.app/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Registered successfully! Please log in.");
        navigate("/login");
      } else if (res.status === 409) {
        toast.info("You already have an account. Redirecting to login.");
        navigate("/login");
      } else {
        if (data.message?.toLowerCase().includes("you have already registered, please login")) {
          setAlreadyRegistered(true);
        }
        toast.error(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="register-main-container">
      <div className="register-subcontainer">
        <h2 className="register-account-heading">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="register-username-input"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            className="register-email-input"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            className="register-password-input"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit" className="register-submit">
            Register
          </button>
        </form>

        {alreadyRegistered && (
          <div className="login-redirect-container">
            <p className="registered-message">It seems you already have an account.</p>
            <button
              onClick={() => navigate("/login")}
              className="register-redirect-button"
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
