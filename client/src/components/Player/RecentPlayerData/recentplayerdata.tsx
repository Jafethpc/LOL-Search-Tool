import { ChampionStats } from "./ChampionStats/championstats";
import borderbackground from "./Images/border-background.png";
import loadingGif from "./Images/loading.gif";
import { KDAStats } from "./KDAStats/kdastats";

import "./recentplayerdata.css";
import { RoleStats } from "./RoleStats/rolestats";
import { WinrateStats } from "./WinrateStats/winratestats";

export const RecentPlayerData = (props: any) => {
  const sortedChampionData = props.championStats;
  const rolesPlayed = props.rolesPlayed;
  const kdaWinrateData = props.killParticipation;

  return (
    <section>
      <section className="recent-player-data-section">
        <img
          className="border-background"
          src={borderbackground}
          alt="Border Background"
        ></img>
        <section className="recent-player-data">
          <section className="left-recent-player-data">
            <section className="kda-winrate-section">
              <KDAStats KDAData={kdaWinrateData} />
              <WinrateStats WinrateData={kdaWinrateData} />
            </section>
            <RoleStats rolesPlayed={rolesPlayed} />
          </section>
          <section className="right-recent-player-data">
            {typeof sortedChampionData !== "undefined" &&
            sortedChampionData.length >= 1 ? (
              sortedChampionData
                .slice(0, 3)
                .map((championData: any, i: any) => {
                  return (
                    <ChampionStats
                      props={sortedChampionData}
                      championData={championData}
                    />
                  );
                })
            ) : (
              <img src={loadingGif} alt="Loading Gif"></img>
            )}
          </section>
        </section>
      </section>
    </section>
  );
};
