import MatchCard from "./MatchCard";

export default function MatchInfoModal({ fixture, onClose, onTeamClick }) {
  if (!fixture) return null;

  const isPlayed = fixture.isPlayed;

  return (
    <div className="modal-backdrop">
      <div className="match-info-modal">
        <button className="modal-close-btn" onClick={onClose}>
          ×
        </button>

        <span className="game-page-kicker">
          {isPlayed ? "Match Summary" : "Match Preview"}
        </span>

        <h2>
          {fixture.homeTeam?.shortName} - {fixture.awayTeam?.shortName}
        </h2>

        <MatchCard fixture={fixture} />

        <div className="match-info-actions">
          <button
            className="secondary-btn"
            onClick={() => onTeamClick?.(fixture.homeTeam?.id)}
          >
            {fixture.homeTeam?.shortName} keret
          </button>

          <button
            className="secondary-btn"
            onClick={() => onTeamClick?.(fixture.awayTeam?.id)}
          >
            {fixture.awayTeam?.shortName} keret
          </button>
        </div>

        <div className="match-info-summary">
          {isPlayed ? (
            <p>
              Lejátszott mérkőzés. Végeredmény:{" "}
              <strong>
                {fixture.homeGoals}-{fixture.awayGoals}
              </strong>
            </p>
          ) : (
            <p>
              Ez a mérkőzés még nincs lejátszva. A forduló szimulálásakor kap
              eredményt.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}