import { useEffect, useState } from "react";
import { getTeamPlayers } from "../api/screenApi";
import InlineLoader from "./InlineLoader";
import EmptyState from "./EmptyState";
import MatchCard from "./MatchCard";

const midfieldPositions = ["CM", "CDM", "CAM"];

const getFitData = (player) => {
  const targetPosition = player.lineupSlot || player.lineupPosition || player.position;

  if (player.position === targetPosition) {
    return { multiplier: 1, className: "fit-good" };
  }

  if (
    midfieldPositions.includes(player.position) &&
    midfieldPositions.includes(targetPosition)
  ) {
    return { multiplier: 0.9, className: "fit-ok" };
  }

  return { multiplier: 0.75, className: "fit-bad" };
};

const getPlayerOverall = (player) =>
  player.effectiveOverall ??
  Math.round((player.overall ?? 0) * getFitData(player).multiplier);

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
  const fit = getFitData(player);

  return (
    <div className="match-team-squad-row player-info-hover-row">
      <strong>{player.name}</strong>
      <span>{player.position}</span>
      <em className={fit.className}>{getPlayerOverall(player)}</em>

      <PlayerStatsTooltip player={player} />
    </div>
  );
}

function TeamSquadPreview({ saveId, team }) {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!saveId || !team?.id) return;

    setIsLoading(true);

    getTeamPlayers(saveId, team.id)
      .then((data) => {
        const normalizedPlayers = Array.isArray(data)
          ? data
          : data?.players || data?.team?.players || data?.data || [];

        setPlayers(normalizedPlayers);
      })
      .catch(() => setPlayers([]))
      .finally(() => setIsLoading(false));
  }, [saveId, team?.id]);

  const starters =
    players.filter(
      (p) => p.role === "starter" || p.lineupSlot || p.lineupPosition
    ).length > 0
      ? players.filter(
          (p) => p.role === "starter" || p.lineupSlot || p.lineupPosition
        )
      : [...players].sort((a, b) => (b.overall ?? 0) - (a.overall ?? 0)).slice(0, 11);

  return (
    <section className="match-team-squad-preview">
      <h3>
        {team?.name} <span>({team?.shortName})</span>
      </h3>

      {isLoading ? (
        <InlineLoader text="Keret betöltése..." />
      ) : starters.length ? (
        <div className="match-team-squad-list">
          {starters.slice(0, 11).map((player) => (
            <PlayerInfoRow key={player.id} player={player} />
          ))}
        </div>
      ) : (
        <EmptyState title="Nincs keret adat." />
      )}
    </section>
  );
}

export default function MatchInfoModal({ fixture, saveId, onClose }) {
  if (!fixture) return null;

  return (
    <div className="modal-backdrop">
      <div className="match-info-modal match-info-modal-wide">
        <button className="modal-close-btn" onClick={onClose}>
          ×
        </button>

        <span className="game-page-kicker">
          {fixture.isPlayed ? "Match Summary" : "Match Preview"}
        </span>

        <h2>
          {fixture.homeTeam?.shortName} - {fixture.awayTeam?.shortName}
        </h2>

        <MatchCard fixture={fixture} />

        <div className="match-squad-preview-grid">
          <TeamSquadPreview saveId={saveId} team={fixture.homeTeam} />
          <TeamSquadPreview saveId={saveId} team={fixture.awayTeam} />
        </div>
      </div>
    </div>
  );
}