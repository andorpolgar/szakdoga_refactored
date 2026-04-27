export default function MatchCard({ fixture, onClick, onTeamClick }) {
  if (!fixture) return null;

  const score = fixture.isPlayed
    ? `${fixture.homeGoals}-${fixture.awayGoals}`
    : "vs";

  const handleTeamClick = (event, teamId) => {
    event.stopPropagation();
    onTeamClick?.(teamId);
  };

  return (
    <div
      className={`match-card ${onClick ? "clickable-match" : ""}`}
      onClick={onClick}
    >
      <div
        className={onTeamClick ? "clickable-team" : ""}
        onClick={(event) => handleTeamClick(event, fixture.homeTeam?.id)}
      >
        <strong>{fixture.homeTeam?.shortName}</strong>
        <span>{fixture.homeTeam?.name}</span>
      </div>

      <div className="match-score">{score}</div>

      <div
        className={onTeamClick ? "clickable-team" : ""}
        onClick={(event) => handleTeamClick(event, fixture.awayTeam?.id)}
      >
        <strong>{fixture.awayTeam?.shortName}</strong>
        <span>{fixture.awayTeam?.name}</span>
      </div>
    </div>
  );
}