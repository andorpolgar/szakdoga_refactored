import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createMySave,
  deleteMySave,
  getBaseTeamsWithPlayers,
  getMySaves,
} from "../api/savesApi";
import { useAuthStore } from "../store/authStore";
import { useGameStore } from "../store/gameStore";

export default function SaveSelectorPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const setActiveSave = useGameStore((state) => state.setActiveSave);
  const clearActiveSave = useGameStore((state) => state.clearActiveSave);

  const [saves, setSaves] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const [createForm, setCreateForm] = useState({
    name: "",
    selectedTeamShortName: "",
  });

  const loadPageData = async () => {
    setLoading(true);
    setError("");

    try {
      const [savesData, teamsData] = await Promise.all([
        getMySaves(),
        getBaseTeamsWithPlayers(),
      ]);

      setSaves(savesData);
      setTeams(teamsData);
    } catch (err) {
      setError(err?.response?.data?.message || "Nem sikerült betölteni a mentéseket.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPageData();
  }, []);

  const handleContinue = async (saveId) => {
    try {
      await setActiveSave(saveId);
      navigate("/dashboard");
    } catch {
      setError("Nem sikerült betölteni a mentést.");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");

    if (!createForm.name.trim()) {
      setError("Adj meg mentésnevet.");
      return;
    }

    if (!createForm.selectedTeamShortName) {
      setError("Válassz csapatot.");
      return;
    }

    setCreating(true);

    try {
      const response = await createMySave(createForm);
      await loadPageData();
      await setActiveSave(response.gameSave.id);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Nem sikerült létrehozni a mentést.");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (saveId) => {
    const confirmed = window.confirm("Biztosan törölni szeretnéd ezt a mentést?");
    if (!confirmed) return;

    try {
      await deleteMySave(saveId);

      const activeSaveId = localStorage.getItem("activeSaveId");
      if (activeSaveId === saveId) {
        clearActiveSave();
      }

      await loadPageData();
    } catch (err) {
      setError(err?.response?.data?.message || "Nem sikerült törölni a mentést.");
    }
  };

  const handleLogout = () => {
    clearActiveSave();
    logout();
    navigate("/login");
  };

  return (
    <div className="page-shell">
      <div className="page-container">
        <div className="top-row">
          <div>
            <h1>Mentések</h1>
            <p className="muted-text">
              Bejelentkezve: <strong>{user?.username || user?.email || "Felhasználó"}</strong>
            </p>
          </div>

          <button onClick={handleLogout} className="secondary-btn">
            Kilépés
          </button>
        </div>

        {error && <p className="error-text">{error}</p>}

        <div className="two-col">
          <section className="card">
            <h2>Új mentés</h2>

            <form onSubmit={handleCreate} className="form-stack">
              <input
                type="text"
                placeholder="Mentés neve"
                value={createForm.name}
                onChange={(e) =>
                  setCreateForm((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />

              <select
                value={createForm.selectedTeamShortName}
                onChange={(e) =>
                  setCreateForm((prev) => ({
                    ...prev,
                    selectedTeamShortName: e.target.value,
                  }))
                }
              >
                <option value="">Válassz csapatot</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.shortName}>
                    {team.name} ({team.shortName})
                  </option>
                ))}
              </select>

              <button type="submit" disabled={creating}>
                {creating ? "Létrehozás..." : "Új mentés indítása"}
              </button>
            </form>
          </section>

          <section className="card">
            <h2>Meglévő mentések</h2>

            {loading ? (
              <p>Betöltés...</p>
            ) : saves.length === 0 ? (
              <p>Még nincs mentésed.</p>
            ) : (
              <div className="save-list">
                {saves.map((save) => (
                  <div key={save.id} className="save-card">
                    <div>
                      <h3>{save.name}</h3>
                      <p>
                        Csapat:{" "}
                        <strong>
                          {save.selectedTeam?.name || "Nincs"}
                        </strong>
                      </p>
                      <p>Forduló: {save.currentRound}</p>
                      <p>
                        Haladás: {save.progress.playedFixtures}/{save.progress.totalFixtures}
                      </p>
                      <p>Állapot: {save.isFinished ? "Befejezett" : "Folyamatban"}</p>
                    </div>

                    <div className="save-actions">
                      <button onClick={() => handleContinue(save.id)}>Folytatás</button>
                      <button
                        onClick={() => handleDelete(save.id)}
                        className="danger-btn"
                      >
                        Törlés
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}