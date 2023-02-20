import "./kda.css";

export const KDAStats = (props: any) => {
  const totalPlayerData = props.KDAData;
  return (
    <section className="kda-stats-section">
      <p className="kills-deaths-assists">
        {!isNaN(totalPlayerData.playerKills) ? (
          <>
            {(
              totalPlayerData.playerKills / totalPlayerData.totalGamesPlayed
            ).toFixed(0)}{" "}
            /{" "}
            <span className="deaths">
              {(
                totalPlayerData.playerDeaths / totalPlayerData.totalGamesPlayed
              ).toFixed(0)}
            </span>{" "}
            /{" "}
            {(
              totalPlayerData.playerAssists / totalPlayerData.totalGamesPlayed
            ).toFixed(0)}
          </>
        ) : (
          <>
            {" "}
            0 / <span className="deaths">0</span> / 0
          </>
        )}
      </p>
      <p className="kda">
        {!isNaN(totalPlayerData.playerKills) &&
        !isNaN(totalPlayerData.playerAssists) ? (
          <>
            {(
              (totalPlayerData.playerKills + totalPlayerData.playerAssists) /
              totalPlayerData.playerDeaths
            ).toFixed(2)}
            :1
          </>
        ) : (
          <>0.00:1</>
        )}
      </p>
      <p className="kill-participation">
        P/KILL{" "}
        {!isNaN(totalPlayerData.playerKills)
          ? (
              ((totalPlayerData.playerKills + totalPlayerData.playerAssists) /
                totalPlayerData.totalKills) *
              100
            ).toFixed(2)
          : 0}
        %
      </p>
    </section>
  );
};
