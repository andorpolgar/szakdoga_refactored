export default function MatchCard({ fixture }) {
  if (!fixture) return null;

  const score = fixture.isPlayed
    ? `${fixture.homeGoals}-${fixture.awayGoals}`
    : "vs";

  return (
    <div className="match-card">
      <div>
        <strong>{fixture.homeTeam?.shortName}</strong>
        <span>{fixture.homeTeam?.name}</span>
      </div>

      <div className="match-score">{score}</div>

      <div>
        <strong>{fixture.awayTeam?.shortName}</strong>
        <span>{fixture.awayTeam?.name}</span>
      </div>
    </div>
  );
}