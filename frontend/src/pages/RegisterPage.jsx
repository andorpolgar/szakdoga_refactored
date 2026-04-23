import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function RegisterPage() {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);

  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await register(form);
      setSuccess("Sikeres regisztráció. Most jelentkezz be.");
      setTimeout(() => {
        navigate("/login");
      }, 700);
    } catch (err) {
      setError(err?.response?.data?.message || "Sikertelen regisztráció");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="card auth-card">
        <h1>Regisztráció</h1>

        <form onSubmit={handleSubmit} className="form-stack">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="username"
            placeholder="Felhasználónév"
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Jelszó"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Regisztráció..." : "Regisztráció"}
          </button>
        </form>

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        <p className="muted-text">
          Már van fiókod? <Link to="/login">Bejelentkezés</Link>
        </p>
      </div>
    </div>
  );
}