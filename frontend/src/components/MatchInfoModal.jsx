import { useEffect, useState } from "react";
import { getTeamPlayers } from "../api/screenApi";
import InlineLoader from "./InlineLoader";
import EmptyState from "./EmptyState";
import MatchCard from "./MatchCard";

const midfieldPositions = ["CM", "CDM", "CAM"];

const normalizePosition = (value) => {
  if (!value) return "";

  return String(value)
    .toUpperCase()
    .replace(/[0-9]/g, "")
    .replace("_", "")
    .trim();
};

const getFitData = (player) => {
  const playerPosition = normalizePosition(player.position);
  const targetPosition = normalizePosition(
    player.lineupPosition || player.tacticalPosition || player.position
  );

  if (playerPosition === targetPosition) {
    return { multiplier: 1, className: "fit-good" };
  }

  const midfieldPositions = ["CM", "CDM", "CAM"];
  const centerBackPositions = ["CB"];

  if (
    midfieldPositions.includes(playerPosition) &&
    midfieldPositions.includes(targetPosition)
  ) {
    return { multiplier: 0.9, className: "fit-ok" };
  }

  if (
    centerBackPositions.includes(playerPosition) &&
    centerBackPositions.includes(targetPosition)
  ) {
    return { multiplier: 1, className: "fit-good" };
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

function TeamSquadPreview({ saveId, team, onTeamClick }) {
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

  const teamOverall = starters.length
    ? Math.round(
        starters
          .slice(0, 11)
          .reduce((sum, player) => sum + getPlayerOverall(player), 0) /
          starters.slice(0, 11).length
      )
    : "-";

  return (
    <section className="match-team-squad-preview">
      <h3
        className="clickable-team"
        onClick={() => onTeamClick?.(team?.id)}
      >
        {team?.name} <span>({team?.shortName})</span>
        <strong className="match-team-overall">OVR {teamOverall}</strong>
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

export default function MatchInfoModal({ fixture, saveId, onClose, onTeamClick }) {
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
          <TeamSquadPreview
            saveId={saveId}
            team={fixture.homeTeam}
            onTeamClick={onTeamClick}
          />

          <TeamSquadPreview
            saveId={saveId}
            team={fixture.awayTeam}
            onTeamClick={onTeamClick}
          />
        </div>
      </div>
    </div>
  );
}