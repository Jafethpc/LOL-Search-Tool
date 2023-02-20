import "./winratestats.css";

export const WinrateStats = (props: any) => {
  const winrateData = props.WinrateData;
  return (
    <section className="winrate-stats-section">
      <p className="games-wins-losses">
        {!isNaN(winrateData.totalGamesPlayed)
          ? winrateData.totalGamesPlayed
          : 0}
        G {!isNaN(winrateData.wins) ? winrateData.wins : 0}W{" "}
        {!isNaN(winrateData.totalGamesPlayed)
          ? winrateData.totalGamesPlayed - winrateData.wins
          : 0}
        L
      </p>
      <section className="game-winrate-progress-bar">
        <section
          className="game-winrate-progress"
          style={{
            width: `${(
              (winrateData.wins / winrateData.totalGamesPlayed) *
              100
            ).toFixed(0)}%`,
          }}
        ></section>
      </section>
      <p className="game-winrate">
        {!isNaN(winrateData.totalGamesPlayed)
          ? ((winrateData.wins / winrateData.totalGamesPlayed) * 100).toFixed(0)
          : 0}
        %
      </p>
    </section>
  );
};
