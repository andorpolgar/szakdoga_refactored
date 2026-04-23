import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboard } from "../api/dashboardApi";
import { useAuthStore } from "../store/authStore";
import { useGameStore } from "../store/gameStore";

export default function DashboardPage() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const activeSaveId = useGameStore((state) => state.activeSaveId);
  const clearActiveSave = useGameStore((state) => state.clearActiveSave);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      if (!activeSaveId) return;

      setLoading(true);
      setError("");

      try {
        const response = await getDashboard(activeSaveId);
        setData(response);
      } catch (err) {
        setError(err?.response?.data?.message || "Nem sikerült betölteni a dashboardot.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [activeSaveId]);

  const handleBackToSaves = () => {
    clearActiveSave();
    navigate("/saves");
  };

  const handleLogout = () => {
    clearActiveSave();
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="page-shell">
        <div className="page-container">
          <div className="card">
            <p>Dashboard betöltése...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-shell">
        <div className="page-container">
          <div className="card">
            <p className="error-text">{error}</p>
            <div className="row-gap">
              <button onClick={handleBackToSaves}>Vissza a mentésekhez</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="page-shell">
        <div className="page-container">
          <div className="card">
            <p>Nincs dashboard adat.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="page-container">
        <div className="top-row">
          <div>
            <h1>{data.save.name}</h1>
            <p className="muted-text">
              Irányított csapat:{" "}
              <strong>
                {data.selectedTeam?.name} ({data.selectedTeam?.shortName})
              </strong>
            </p>
          </div>

          <div className="button-row">
            <button className="secondary-btn" onClick={handleBackToSaves}>
              Mentések
            </button>
            <button className="secondary-btn" onClick={handleLogout}>
              Kilépés
            </button>
          </div>
        </div>

        <div className="dashboard-grid">
          <section className="card">
            <h2>Szezon állapot</h2>
            <p>
              Forduló:{" "}
              <strong>
                {data.seasonState.currentRound} / {data.seasonState.totalRounds}
              </strong>
            </p>
            <p>Vége: {data.seasonState.isFinished ? "Igen" : "Nem"}</p>
          </section>

          <section className="card">
            <h2>Tabella top 4</h2>
            {data.standings?.slice(0, 4).map((row) => (
              <div key={row.team.id} className="table-row">
                <span>
                  {row.position}. {row.team.name}
                </span>
                <strong>{row.points} pont</strong>
              </div>
            ))}
          </section>

          <section className="card">
            <h2>Aktuális forduló</h2>
            {data.currentRoundFixtures?.length ? (
              data.currentRoundFixtures.map((fixture) => (
                <div key={fixture.id} className="fixture-row">
                  <span>
                    {fixture.homeTeam.shortName} - {fixture.awayTeam.shortName}
                  </span>
                  <strong>
                    {fixture.isPlayed
                      ? `${fixture.homeGoals}-${fixture.awayGoals}`
                      : "nincs eredmény"}
                  </strong>
                </div>
              ))
            ) : (
              <p>Nincs aktuális forduló adat.</p>
            )}
          </section>

          <section className="card">
            <h2>Előző forduló</h2>
            {data.lastRoundFixtures?.length ? (
              data.lastRoundFixtures.map((fixture) => (
                <div key={fixture.id} className="fixture-row">
                  <span>
                    {fixture.homeTeam.shortName} - {fixture.awayTeam.shortName}
                  </span>
                  <strong>
                    {fixture.homeGoals}-{fixture.awayGoals}
                  </strong>
                </div>
              ))
            ) : (
              <p>Még nincs lejátszott forduló.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}