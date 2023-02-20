// Inmages
import rankTopSection from "./Images/rank-border-top.png";
import rankBottomSection from "./Images/rank-border-bottom.png";

// CSS
import "./ranksection.css";

export const RankSection = (props: any) => {
  const rankData = props.props[0];
  const queueType = props.queueType
  if (typeof rankData?.queueType === "undefined") {
return (
  <div className="rank-section">
    <p className="queuetype">{queueType}</p>
    <img
      className="rank-border-top"
      src={rankTopSection}
      alt="Top Rank Border"
    ></img>
    <section className="rank-section-data">
      <section className="rank-emblem">
        <img
          className="rank-emblem-img"
          src={require(`../../../Images/Emblem_${
            rankData?.tier ?
            rankData?.tier.charAt(0).toUpperCase() +
            rankData?.tier.slice(1).toLowerCase() : "Unranked"
          }.png`)}
          alt="Rank Emblem"
        ></img>
      </section>
<section className="unranked-section">
  <p className="unranked">UNRANKED</p>
</section>
    </section>
    <img
      className="rank-border-bottom"
      src={rankBottomSection}
      alt="Bottom Rank Border"
    ></img>
  </div>
);
  } else {
return (
  <div className="rank-section">
    <p className="queuetype">{queueType}</p>
    <img
      className="rank-border-top"
      src={rankTopSection}
      alt="Top Rank Border"
    ></img>
    <section className="rank-section-data">
      <section className="rank-emblem">
        <img
          className="rank-emblem-img"
          src={require(`../../../Images/Emblem_${
            rankData.tier.charAt(0).toUpperCase() +
            rankData.tier.slice(1).toLowerCase()
          }.png`)}
          alt="Rank Emblem"
        ></img>
      </section>
      <section className="rank-data">
        <section className="rank-data-top">
          <p className="rank-title">{`${rankData.tier} ${rankData.rank}`}</p>
          <p className="win-lose-ratio">{`${rankData.wins}W ${rankData.losses}L`}</p>
        </section>
        <section className="rank-data-bottom">
          <p className="league-points">{`${rankData.leaguePoints} LP`}</p>
          <p className="winrate">{`Win Rate ${Math.trunc(
            (rankData.wins / (rankData.wins + rankData.losses)) * 100
          )}%`}</p>
        </section>
      </section>
    </section>
    <img
      className="rank-border-bottom"
      src={rankBottomSection}
      alt="Bottom Rank Border"
    ></img>
  </div>
);
  }
};
