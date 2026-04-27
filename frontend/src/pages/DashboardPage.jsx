import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GameNav from "../components/GameNav";
import PageHero from "../components/PageHero";
import StatCard from "../components/StatCard";
import MatchCard from "../components/MatchCard";
import EmptyState from "../components/EmptyState";
import InlineLoader from "../components/InlineLoader";
import { useAuthStore } from "../store/authStore";
import { useDashboardStore } from "../store/dashboardStore";
import { useGameStore } from "../store/gameStore";

export default function DashboardPage() {
  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.logout);

  const activeSaveId = useGameStore((state) => state.activeSaveId);
  const clearActiveSave = useGameStore((state) => state.clearActiveSave);

  const dashboard = useDashboardStore((state) => state.dashboard);
  const isLoadingDashboard = useDashboardStore(
    (state) => state.isLoadingDashboard
  );
  const dashboardError = useDashboardStore((state) => state.dashboardError);
  const loadDashboard = useDashboardStore((state) => state.loadDashboard);
  const resetDashboard = useDashboardStore((state) => state.resetDashboard);

  useEffect(() => {
    if (!activeSaveId) {
      resetDashboard();
      return;
    }

    loadDashboard(activeSaveId).catch(() => {});
  }, [activeSaveId, loadDashboard, resetDashboard]);

  const handleBackToSaves = () => {
    resetDashboard();
    clearActiveSave();
    navigate("/saves");
  };

  const handleLogout = () => {
    resetDashboard();
    clearActiveSave();
    logout();
    navigate("/login");
  };

  if (isLoadingDashboard && !dashboard) {
    return (
      <div className="page-shell">
        <div className="page-container">
          <InlineLoader text="Dashboard betöltése..." />
        </div>
      </div>
    );
  }

  if (dashboardError && !dashboard) {
    return (
      <div className="page-shell">
        <div className="page-container">
          <div className="card">
            <p className="error-text">{dashboardError}</p>
            <button onClick={handleBackToSaves}>Vissza a mentésekhez</button>
          </div>
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="page-shell">
        <div className="page-container">
          <EmptyState title="Nincs dashboard adat." />
        </div>
      </div>
    );
  }

  const currentRound = dashboard.seasonState?.currentRound ?? "-";
  const totalRounds = dashboard.seasonState?.totalRounds ?? "-";
  const selectedTeamStanding = dashboard.standings?.find(
    (row) => row.team.id === dashboard.selectedTeam?.id
  );
  const nextFixture = dashboard.currentRoundFixtures?.find(
    (fixture) =>
      fixture.homeTeam?.id === dashboard.selectedTeam?.id ||
      fixture.awayTeam?.id === dashboard.selectedTeam?.id
  );

  return (
    <div className="page-shell">
      <div className="page-container">
        <PageHero
          kicker="Manager Dashboard"
          title={dashboard.save.name}
          subtitle={`${dashboard.selectedTeam?.name} (${dashboard.selectedTeam?.shortName})`}
        >
          <GameNav />

          <div className="button-row">
            <button className="secondary-btn" onClick={handleBackToSaves}>
              Mentések
            </button>

            <button className="secondary-btn" onClick={handleLogout}>
              Kilépés
            </button>
          </div>
        </PageHero>

        {dashboardError && <p className="error-text">{dashboardError}</p>}

        <div className="stat-grid">
          <StatCard
            label="Aktuális forduló"
            value={`${currentRound}/${totalRounds}`}
            helper={dashboard.seasonState?.isFinished ? "Szezon vége" : "Szezon folyamatban"}
          />

          <StatCard
            label="Bajnoki helyezés"
            value={selectedTeamStanding ? `${selectedTeamStanding.position}.` : "-"}
            helper={
              selectedTeamStanding
                ? `${selectedTeamStanding.points} pont`
                : "Nincs tabella adat"
            }
          />

          <StatCard
            label="Lejátszott meccsek"
            value={
              dashboard.currentRoundFixtures
                ? dashboard.currentRoundFixtures.filter((fixture) => fixture.isPlayed).length
                : "-"
            }
            helper="Aktuális fordulóban"
          />
        </div>

        <div className="dashboard-final-grid">
          <section className="card dashboard-main-card">
            <div className="section-heading-row">
              <div>
                <h2>Következő / aktuális saját meccs</h2>
                <p className="muted-text">
                  Innen látod, melyik mérkőzés következik a játékmenetben.
                </p>
              </div>
            </div>

            {nextFixture ? (
              <MatchCard fixture={nextFixture} />
            ) : (
              <EmptyState
                title="Nincs saját meccs az aktuális fordulóban."
                description="Lehet, hogy a forduló már lezárult."
              />
            )}

            <button onClick={() => navigate("/fixtures")}>
              Meccsek kezelése
            </button>
          </section>

          <section className="card">
            <h2>Tabella top 4</h2>

            {dashboard.standings?.slice(0, 4).map((row) => (
              <div
                key={row.team.id}
                className={`league-row ${
                  row.team.id === dashboard.selectedTeam?.id ? "own-team-row" : ""
                }`}
              >
                <span>
                  {row.position}. {row.team.name}
                </span>

                <strong>{row.points} pont</strong>
              </div>
            ))}

            <button className="secondary-btn" onClick={() => navigate("/standings")}>
              Teljes tabella
            </button>
          </section>

          <section className="card">
            <h2>Aktuális forduló</h2>

            {dashboard.currentRoundFixtures?.length ? (
              <div className="compact-match-list">
                {dashboard.currentRoundFixtures.map((fixture) => (
                  <MatchCard key={fixture.id} fixture={fixture} />
                ))}
              </div>
            ) : (
              <EmptyState title="Nincs aktuális forduló adat." />
            )}
          </section>

          <section className="card">
            <h2>Előző forduló</h2>

            {dashboard.lastRoundFixtures?.length ? (
              <div className="compact-match-list">
                {dashboard.lastRoundFixtures.map((fixture) => (
                  <MatchCard key={fixture.id} fixture={fixture} />
                ))}
              </div>
            ) : (
              <EmptyState title="Még nincs lejátszott forduló." />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}