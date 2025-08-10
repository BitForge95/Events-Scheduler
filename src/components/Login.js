import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://events-scheduler-backend-production.up.railway.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        toast.success("Login Successful!");
        navigate("/home");
      } else {
        toast.error(data.message || "Invalid username or password");
      }
    } catch (error) {
      toast.error("Network error. Please check your connection.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="login-title">Sign In</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            autoComplete="username"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
          <button type="submit" className="login-btn">Login</button>
        </form>

        <p className="login-register-text">
          Don’t have an account?{" "}
          <Link to="/register" className="register-link">Register</Link>
        </p>
      </div>
    </div>
  );
}
