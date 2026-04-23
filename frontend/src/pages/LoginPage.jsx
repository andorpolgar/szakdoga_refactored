import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useGameStore } from "../store/gameStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const activeSaveId = useGameStore((state) => state.activeSaveId);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
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
    setLoading(true);

    try {
      await login(form);
      navigate(activeSaveId ? "/dashboard" : "/saves");
    } catch (err) {
      setError(err?.response?.data?.message || "Sikertelen bejelentkezés");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="card auth-card">
        <h1>Bejelentkezés</h1>

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
            type="password"
            name="password"
            placeholder="Jelszó"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Belépés..." : "Belépés"}
          </button>
        </form>

        {error && <p className="error-text">{error}</p>}

        <p className="muted-text">
          Nincs még fiókod? <Link to="/register">Regisztráció</Link>
        </p>
      </div>
    </div>
  );
}