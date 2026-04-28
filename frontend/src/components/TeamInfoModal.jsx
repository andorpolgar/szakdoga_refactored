import { useEffect, useState } from "react";
import { getTeamDetail, getTeamFixtures, getTeamPlayers } from "../api/screenApi";
import InlineLoader from "./InlineLoader";
import EmptyState from "./EmptyState";
import MatchCard from "./MatchCard";
import MatchInfoModal from "./MatchInfoModal";

const getPlayerOverall = (player) =>
  player.overall ?? player.rating ?? player.ovr ?? player.stats?.overall ?? "-";

function PlayerStatsTooltip({ player }) {
  return (
    <div className="player-tooltip">
      <strong>{player.name}</strong>
      <p>
        {player.position} | OVR: {player.overall ?? "-"}
      </p>

      {["pace", "shooting", "passing", "dribbling", "defending", "physical"].map(
        (stat) => (
          <div key={stat} className="tooltip-stat-row">
            <span>{stat}</span>
            <strong>{player[stat] ?? "-"}</strong>
          </div>
        )
      )}
    </div>
  );
}

function PlayerInfoRow({ player }) {
  return (
    <div className="team-lineup-row player-info-hover-row">
      <strong>{player.name}</strong>
      <span>{player.position}</span>
      <span className="team-lineup-ovr raw-ovr">
        {getPlayerOverall(player)}
      </span>

      <PlayerStatsTooltip player={player} />
    </div>
  );
}

export default function TeamInfoModal({ saveId, teamId, onClose }) {
  const [teamDetail, setTeamDetail] = useState(null);
  const [players, setPlayers] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [selectedFixture, setSelectedFixture] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!saveId || !teamId) return;

    setIsLoading(true);
    setError("");

    Promise.all([
      getTeamDetail(saveId, teamId),
      getTeamPlayers(saveId, teamId),
      getTeamFixtures(saveId, teamId),
    ])
      .then(([detailData, playersData, fixturesData]) => {
        setTeamDetail(detailData);

        const normalizedPlayers = Array.isArray(playersData)
          ? playersData
          : playersData?.players ||
            playersData?.team?.players ||
            detailData?.players ||
            [];

        const normalizedFixtures = Array.isArray(fixturesData)
          ? fixturesData
          : fixturesData?.fixtures ||
            [
              ...(detailData?.lastFixtures || []),
              ...(detailData?.upcomingFixtures || []),
            ];

        setPlayers(normalizedPlayers);
        setFixtures(normalizedFixtures);
      })
      .catch((err) => {
        setError(
          err?.response?.data?.message ||
            "Nem sikerült betölteni a csapat adatokat."
        );
      })
      .finally(() => setIsLoading(false));
  }, [saveId, teamId]);

  const starters =
    players.filter(
      (p) => p.role === "starter" || p.lineupSlot || p.lineupPosition
    ).length > 0
      ? players.filter(
          (p) => p.role === "starter" || p.lineupSlot || p.lineupPosition
        )
      : [...players].sort((a, b) => (b.overall ?? 0) - (a.overall ?? 0)).slice(0, 11);

  return (
    <div className="modal-backdrop">
      <div className="team-info-modal">
        <button className="modal-close-btn" onClick={onClose}>
          ×
        </button>

        {isLoading ? (
          <InlineLoader text="Csapat betöltése..." />
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <>
            <span className="game-page-kicker">Team Info</span>
            <h2>
              {teamDetail?.team?.name || teamDetail?.name}
              <small> ({teamDetail?.team?.shortName || teamDetail?.shortName})</small>
            </h2>

            <div className="team-info-grid">
              <section>
                <h3>Kezdő 11</h3>

                <div className="team-lineup-list">
                  {starters.slice(0, 11).map((player) => (
                    <PlayerInfoRow key={player.id} player={player} />
                  ))}
                </div>
              </section>

              <section>
                <h3>Keret</h3>

                <div className="team-squad-scroll">
                  {players.map((player) => (
                    <PlayerInfoRow key={player.id} player={player} />
                  ))}
                </div>
              </section>
            </div>

            <section className="team-fixtures-section">
              <h3>Meccsek</h3>

              {fixtures.length ? (
                <div className="compact-match-list">
                  {fixtures.slice(0, 6).map((fixture) => (
                    <MatchCard
                      key={fixture.id}
                      fixture={fixture}
                      onClick={() => setSelectedFixture(fixture)}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState title="Nincs meccs adat." />
              )}
            </section>
          </>
        )}

        {selectedFixture && (
          <MatchInfoModal
            fixture={selectedFixture}
            saveId={saveId}
            onClose={() => setSelectedFixture(null)}
            onTeamClick={() => {}}
          />
        )}
      </div>
    </div>
  );
}