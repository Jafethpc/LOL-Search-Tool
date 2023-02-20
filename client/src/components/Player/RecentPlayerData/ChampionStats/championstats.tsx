import { useState } from "react";
import "./championstats.css";

export const ChampionStats = (props: any) => {
  let height = "0%";
  const completeChampionData = props.props;
  const championData = props.championData;

  completeChampionData.length === 1
    ? (height = "98%")
    : completeChampionData.length === 2
    ? (height = "48.5%")
    : (height = "32.5%");

  const cs = championData.cs / championData.timesPlayed;
  return (
    <section className="champion-stats-section" style={{ height: height }}>
      <img
        className="champion-data-image"
        src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championData.championName}_0.jpg`}
        alt="Champion Splash Art"
      ></img>
      <section className="champion-stats-data-section">
        <section className="top-section">
          <p className="champion-name">{championData.championName}</p>
          <p className="kda">
            {(
              (championData.kills + championData.assists) /
              championData.deaths
            ).toFixed(2)}
            :1
          </p>
        </section>
        <section className="bottom-section">
          <p className="cs">
            CS {cs % 1 === 0 ? cs.toFixed(0) : cs.toFixed(2)} (
            {(
              cs /
              (championData.gameDuration / 60 / championData.timesPlayed)
            ).toFixed(2)}
            )
          </p>
          <p className="winrate">
            {((championData.wins / championData.timesPlayed) * 100) % 1 === 0
              ? ((championData.wins / championData.timesPlayed) * 100).toFixed(
                  0
                )
              : ((championData.wins / championData.timesPlayed) * 100).toFixed(
                  2
                )}
            % ({championData.wins}W{" "}
            {championData.timesPlayed - championData.wins}
            L)
          </p>
        </section>
      </section>
    </section>
  );
};
