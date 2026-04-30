import { useEffect, useState } from "react";
import GameNav from "../components/GameNav";
import PageHero from "../components/PageHero";
import InlineLoader from "../components/InlineLoader";
import { useGameStore } from "../store/gameStore";
import {
  getStadiumScreen,
  upgradeSelectedTeamStadium,
} from "../api/screenApi";

const formatMoney = (value) =>
  `€${Number(value || 0).toLocaleString("hu-HU")}`;

const formatNumber = (value) => Number(value || 0).toLocaleString("hu-HU");

export default function StadiumPage() {
  const activeSaveId = useGameStore((state) => state.activeSaveId);

  const [stadiumScreen, setStadiumScreen] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const loadStadium = async () => {
    if (!activeSaveId) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getStadiumScreen(activeSaveId);
      setStadiumScreen(data);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Nem sikerült betölteni a stadion adatokat."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStadium();
  }, [activeSaveId]);

  const handleUpgrade = async () => {
    if (!activeSaveId) return;

    setIsUpgrading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await upgradeSelectedTeamStadium(activeSaveId);
      setSuccessMessage("A stadion fejlesztése sikeres volt.");
      await loadStadium();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Nem sikerült fejleszteni a stadiont."
      );
    } finally {
      setIsUpgrading(false);
    }
  };

  if (isLoading && !stadiumScreen) {
    return (
      <div className="page-shell">
        <div className="page-container">
          <InlineLoader text="Stadion betöltése..." />
        </div>
      </div>
    );
  }

  const team = stadiumScreen?.team;
  const stadium = stadiumScreen?.stadium;

  return (
    <div className="page-shell">
      <div className="page-container">
        <PageHero
          kicker="Club Facilities"
          title="Stadion"
          subtitle={
            team
              ? `${team.name} (${team.shortName}) stadionja és meccsnapi bevételei`
              : "Stadion menedzsment"
          }
        >
          <GameNav />
          <p className="muted-text">
            Balance: {formatMoney(team?.balance)}
          </p>
        </PageHero>

        {error && <p className="error-text">{error}</p>}
        {successMessage && <p className="success-text">{successMessage}</p>}

        <div className="stadium-layout">
          <section className="card stadium-main-card">
            <div>
              <span className="stadium-icon">🏟️</span>
              <h2>Stadion szint {stadium?.level}</h2>
              <p className="muted-text">
                A stadion fejlesztése növeli a férőhelyek számát, így hosszabb
                távon nagyobb jegybevételt hozhat a klubnak.
              </p>
            </div>

            <div className="stadium-stat-grid">
              <div className="stadium-stat">
                <span>Férőhely</span>
                <strong>{formatNumber(stadium?.capacity)}</strong>
              </div>

              <div className="stadium-stat">
                <span>Következő szint</span>
                <strong>{stadium?.nextLevel}</strong>
              </div>

              <div className="stadium-stat">
                <span>Fejlesztés után</span>
                <strong>{formatNumber(stadium?.nextCapacity)}</strong>
              </div>

              <div className="stadium-stat">
                <span>Becsült jegybevétel / hazai meccs</span>
                <strong>{formatMoney(stadium?.estimatedTicketRevenue)}</strong>
              </div>
            </div>
          </section>

          <aside className="card stadium-upgrade-card">
            <h2>Fejlesztés</h2>

            <p className="muted-text">
              A következő stadionfejlesztés ára:
            </p>

            <strong className="stadium-price">
              {formatMoney(stadium?.upgradeCost)}
            </strong>

            <button
              type="button"
              disabled={!stadium?.canUpgrade || isUpgrading}
              onClick={handleUpgrade}
            >
              {isUpgrading ? "Fejlesztés..." : "Stadion fejlesztése"}
            </button>

            {!stadium?.canUpgrade && (
              <p className="error-text">
                Nincs elég pénzed a stadion fejlesztéséhez.
              </p>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}