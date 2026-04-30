function PlayerTooltip({ player }) {
  return (
    <div className="player-tooltip squad-list-tooltip">
      <strong>{player.name}</strong>

      <p>
        {player.position} | OVR: {player.overall}
      </p>

      <div className="tooltip-stat-row">
        <span>Érték</span>
        <strong>
          {player.marketValue
            ? new Intl.NumberFormat("hu-HU").format(player.marketValue)
            : "-"}
        </strong>
      </div>

      <div className="tooltip-stat-row">
        <span>Fizetés</span>
        <strong>
          {player.salary
            ? new Intl.NumberFormat("hu-HU").format(player.salary)
            : "-"}
        </strong>
      </div>

      <div className="tooltip-stat-row">
        <span>Szerződés</span>
        <strong>
          {player.contractYears > 0 ? `${player.contractYears} év` : "Lejárt"}
        </strong>
      </div>

      <div className="tooltip-stat-row">
        <span>Hosszabbítás ára</span>
        <strong>
          €
          {Number(Math.round((player.salary || 0) * 1.5)).toLocaleString(
            "hu-HU"
          )}
        </strong>
      </div>

      <div className="tooltip-stat-row">
        <span>Fitness</span>
        <strong>{player.fitness ?? 100}%</strong>
      </div>

      <div className="tooltip-stat-row">
        <span>Állapot</span>
        <strong>
          {player.injured
            ? `Sérült (${player.injuryWeeks ?? 1} forduló)`
            : "Egészséges"}
        </strong>
      </div>

      <div className="tooltip-stat-row">
        <span>Pace</span>
        <strong>{player.pace}</strong>
      </div>

      <div className="tooltip-stat-row">
        <span>Shooting</span>
        <strong>{player.shooting}</strong>
      </div>

      <div className="tooltip-stat-row">
        <span>Passing</span>
        <strong>{player.passing}</strong>
      </div>

      <div className="tooltip-stat-row">
        <span>Dribbling</span>
        <strong>{player.dribbling}</strong>
      </div>

      <div className="tooltip-stat-row">
        <span>Defending</span>
        <strong>{player.defending}</strong>
      </div>

      <div className="tooltip-stat-row">
        <span>Physical</span>
        <strong>{player.physical}</strong>
      </div>
    </div>
  );
}

function PlayerCard({ player, onExtendContract, isUpdating }) {
  return (
    <div
      className={`squad-list-player-card ${player.injured ? "player-injured" : ""} ${
        (player.fitness ?? 100) < 60 ? "player-tired" : ""
      } ${player.contractYears <= 0 ? "player-contract-expired" : ""}`}
    >
      <span className="squad-list-ovr">{player.overall}</span>

      <div>
        <strong>{player.name}</strong>
        <p className="muted-text">{player.position}</p>

        <button
          type="button"
          className="contract-extension-card-btn"
          disabled={isUpdating || player.contractYears >= 5}
          onClick={(event) => {
            event.stopPropagation();
            onExtendContract?.(player.id);
          }}
        >
          {player.contractYears >= 5 ? "Max szerződés" : "+1 év"}
        </button>
      </div>

      <span className={`role-badge role-${player.role}`}>{player.role}</span>

      <PlayerTooltip player={player} />
    </div>
  );
}

export default function SquadPlayerList({
  players,
  onExtendContract,
  isUpdating,
}) {
  const sortedPlayers = [...players].sort((a, b) => {
    if (b.overall !== a.overall) return b.overall - a.overall;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="card squad-player-list-card">
      <h2>Játékoskeret</h2>

      <div className="squad-list-grid">
        {sortedPlayers.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            onExtendContract={onExtendContract}
            isUpdating={isUpdating}
          />
        ))}
      </div>
    </div>
  );
}