export default function PageHero({ kicker, title, subtitle, children }) {
  return (
    <div className="game-page-hero">
      <div>
        {kicker && <span className="game-page-kicker">{kicker}</span>}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>

      {children && <div className="game-page-hero-actions">{children}</div>}
    </div>
  );
}