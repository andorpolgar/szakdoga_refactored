import { useEffect, useState  } from "react";
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
import TeamInfoModal from "../components/TeamInfoModal";
import MatchInfoModal from "../components/MatchInfoModal";

const formatMoney = (value) =>
  `€${Number(value || 0).toLocaleString("hu-HU")}`;

const formatNumber = (value) =>
  Number(value || 0).toLocaleString("hu-HU");

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

  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [selectedFixture, setSelectedFixture] = useState(null);

  const openTeamModal = (teamId) => {
    if (!teamId) return;
    setSelectedFixture(null);
    setSelectedTeamId(teamId);
  };

  const openMatchModal = (fixture) => {
    if (!fixture) return;
    setSelectedTeamId(null);
    setSelectedFixture(fixture);
  };

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
  const isSeasonFinished =
    dashboard.seasonState?.isSeasonFinished ||
    dashboard.seasonState?.isFinished ||
    false;

  const champion = dashboard.standings?.[0] || null;
  const totalRounds = dashboard.seasonState?.totalRounds ?? "-";
  const selectedTeamStanding = dashboard.standings?.find(
    (row) => row.team.id === dashboard.selectedTeam?.id
  );
  const nextFixture = dashboard.currentRoundFixtures?.find(
    (fixture) =>
      fixture.homeTeam?.id === dashboard.selectedTeam?.id ||
      fixture.awayTeam?.id === dashboard.selectedTeam?.id
  );

  const managerOverview = dashboard.managerOverview || null;
  const squadStatus = managerOverview?.squadStatus || null;
  const dashboardWarnings = squadStatus?.warnings || [];
  const championCounts = dashboard.championHistory?.championCounts || [];

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
            label={isSeasonFinished ? "Összes forduló lejátszva" : "Aktuális forduló"}
            value={isSeasonFinished ? "Szezon vége" : `${currentRound}/${totalRounds}`}
            helper={isSeasonFinished ? "A bajnokság lezárult" : "Szezon folyamatban"}
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

          <div className="stat-tooltip-wrapper">
            <StatCard
              label={isSeasonFinished ? "Gólkirály" : "Lejátszott meccsek"}
              value={
                isSeasonFinished
                  ? dashboard.topScorer?.name || "-"
                  : dashboard.currentRoundFixtures
                    ? dashboard.currentRoundFixtures.filter((fixture) => fixture.isPlayed).length
                    : "-"
              }
              helper={
                isSeasonFinished
                  ? `${dashboard.topScorer?.goalsScored ?? 0} gól`
                  : "Aktuális fordulóban"
              }
            />

            {isSeasonFinished && dashboard.topScorer && (
              <div className="player-tooltip stat-player-tooltip">
                <strong>{dashboard.topScorer.name}</strong>
                <p>
                  {dashboard.topScorer.position} | OVR: {dashboard.topScorer.overall}
                </p>
                <p>{dashboard.topScorer.saveTeam?.name}</p>
                <div className="tooltip-stat-row">
                  <span>Gólok</span>
                  <strong>{dashboard.topScorer.goalsScored}</strong>
                </div>
                <div className="tooltip-stat-row">
                  <span>Shooting</span>
                  <strong>{dashboard.topScorer.shooting}</strong>
                </div>
              </div>
            )}
          </div>
          <StatCard
            label="Balance"
            value={formatMoney(managerOverview?.balance)}
            helper="Klub aktuális pénzügyi kerete"
          />

          <StatCard
            label="Taktika"
            value={managerOverview?.tacticLabel || "-"}
            helper={`Formáció: ${managerOverview?.formation || "-"}`}
          />

          <StatCard
            label="Stadion"
            value={
              managerOverview
                ? `Szint ${managerOverview.stadiumLevel}`
                : "-"
            }
            helper={
              managerOverview
                ? `${formatNumber(managerOverview.stadiumCapacity)} férőhely`
                : "Nincs stadion adat"
            }
          />
        </div>
        
        <div className="dashboard-manager-grid">
          <section className="card manager-status-card">
            <div className="section-heading-row">
              <div>
                <span className="game-page-kicker">Manager Overview</span>
                <h2>Csapat állapota</h2>
                <p className="muted-text">
                  Gyors áttekintés a keret egészségi állapotáról és menedzseri teendőkről.
                </p>
              </div>
            </div>

            <div className="manager-status-grid">
              <div className="manager-status-item">
                <span>Átlag fitness</span>
                <strong>{squadStatus?.averageFitness ?? "-"}%</strong>
              </div>

              <div className="manager-status-item">
                <span>Kezdő fitness</span>
                <strong>{squadStatus?.starterAverageFitness ?? "-"}%</strong>
              </div>

              <div className="manager-status-item warning">
                <span>Fáradt játékosok</span>
                <strong>{squadStatus?.tiredCount ?? 0}</strong>
              </div>

              <div className="manager-status-item danger">
                <span>Sérültek</span>
                <strong>{squadStatus?.injuredCount ?? 0}</strong>
              </div>

              <div className="manager-status-item">
                <span>Keretméret</span>
                <strong>{squadStatus?.squadSize ?? "-"}</strong>
              </div>

              <div className="manager-status-item">
                <span>Fizetések összesen</span>
                <strong>{formatMoney(squadStatus?.totalSalary)}</strong>
              </div>
            </div>
          </section>

          <section className="card manager-warning-card">
            <div className="section-heading-row">
              <div>
                <span className="game-page-kicker">Alerts</span>
                <h2>Figyelmeztetések</h2>
                <p className="muted-text">
                  Ezekre érdemes ránézni a következő meccs előtt.
                </p>
              </div>
            </div>

            {dashboardWarnings.length ? (
              <div className="manager-warning-list">
                {dashboardWarnings.slice(0, 4).map((warning) => (
                  <div
                    key={warning.type}
                    className={`manager-warning-item ${warning.level}`}
                  >
                    <strong>{warning.title}</strong>
                    <p>{warning.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="Nincs sürgős teendő."
                description="A keret állapota rendben van a következő mérkőzéshez."
              />
            )}

            <div className="quick-action-row">
              <button className="secondary-btn" onClick={() => navigate("/squad")}>
                Keret kezelése
              </button>

              <button className="secondary-btn" onClick={() => navigate("/stadium")}>
                Stadion
              </button>

              <button className="secondary-btn" onClick={() => navigate("/transfer")}>
                Átigazolások
              </button>
            </div>
          </section>
        </div>

        {championCounts.length > 0 && (
          <section className="card champion-history-card">
            <div className="section-heading-row">
              <div>
                <span className="game-page-kicker">History</span>
                <h2>Bajnokok története</h2>
                <p className="muted-text">
                  Az eddig lejátszott szezonok bajnokai ebben a mentésben.
                </p>
              </div>
            </div>

            <div className="champion-history-list">
              {championCounts.map((item, index) => (
                <div key={item.team.id} className="champion-history-row">
                  <span className="champion-history-rank">#{index + 1}</span>

                  <div className="champion-history-team">
                    <strong>{item.team.name}</strong>
                    <small>{item.team.shortName}</small>
                  </div>

                  <div className="champion-history-titles">
                    <strong>{item.titles}</strong>
                    <span>bajnoki cím</span>
                  </div>

                  <div className="champion-history-seasons">
                    <span>Szezonok</span>
                    <small>{item.seasons.join(", ")}</small>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="dashboard-final-grid">
          <section className="card dashboard-main-card">
            <div className="section-heading-row">
              <div>
                <h2>{isSeasonFinished ? "Szezon végi összegzés" : "Következő / aktuális saját meccs"}</h2>
                <p className="muted-text">
                  Innen látod, melyik mérkőzés következik a játékmenetben.
                </p>
              </div>
            </div>

            {isSeasonFinished ? (
              <div className="season-summary-box">
                <span className="game-page-kicker">Season Finished</span>
                <h3>
                  Bajnok:{" "}
                  {champion?.team?.name || champion?.team?.shortName || "-"}
                </h3>
                <p className="muted-text">
                  A szezon lezárult. A végső tabellát a Tabella oldalon tudod megnézni.
                </p>
              </div>
            ) : nextFixture ? (
              <MatchCard
                fixture={nextFixture}
                onClick={() => openMatchModal(nextFixture)}
                onTeamClick={openTeamModal}
              />
            ) : (
              <EmptyState
                title="Nincs saját meccs az aktuális fordulóban."
                description="Lehet, hogy a forduló már lezárult."
              />
            )}

            <button onClick={() => navigate(isSeasonFinished ? "/standings" : "/fixtures")}>
              {isSeasonFinished ? "Végső tabella" : "Meccsek kezelése"}
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
                <span
                  className="clickable-team"
                  onClick={() => openTeamModal(row.team.id)}
                >
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
            <h2>{isSeasonFinished ? "Utolsó forduló" : "Aktuális forduló"}</h2>

            {dashboard.currentRoundFixtures?.length ? (
              <div className="compact-match-list">
                {dashboard.currentRoundFixtures.map((fixture) => (
                  <MatchCard
                    key={fixture.id}
                    fixture={fixture}
                    onClick={() => openMatchModal(fixture)}
                    onTeamClick={openTeamModal}
                  />
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
                  <MatchCard
                    key={fixture.id}
                    fixture={fixture}
                    onClick={() => openMatchModal(fixture)}
                    onTeamClick={openTeamModal}
                  />
                ))}
              </div>
            ) : (
              <EmptyState title="Még nincs lejátszott forduló." />
            )}
          </section>
        </div>
      </div>
      {selectedTeamId && (
        <TeamInfoModal
          saveId={activeSaveId}
          teamId={selectedTeamId}
          onClose={() => setSelectedTeamId(null)}
        />
      )}

      {selectedFixture && (
        <MatchInfoModal
          fixture={selectedFixture}
          saveId={activeSaveId}
          onClose={() => setSelectedFixture(null)}
          onTeamClick={openTeamModal}
        />
      )}
    </div>
  );
}