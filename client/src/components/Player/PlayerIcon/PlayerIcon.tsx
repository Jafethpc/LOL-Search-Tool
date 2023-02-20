// Images
import championborder from "./Images/champion-border.png";
import unknownchampion from "./Images/unknown-champion.png";
import unknownprofileicon from "./Images/unknownprofileicon.png";

// CSS
import "./playericon.css";

export const PlayerIcon = (props: any) => {
  const playerData = props.props;
  const topChampion = props?.topChampion;
  return (
    <section>
      <section className="profile-Icon">
        <img
          className="champion-border"
          src={championborder}
          alt="Champion Border"
        ></img>
        <section className="player-images">
          <img
            className="champion-splash-art"
            src={
              typeof topChampion !== "undefined"
                ? `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${topChampion.championName}_0.jpg`
                : unknownchampion
            }
            alt="Champion Splash Icon"
          ></img>
          <img
            className="profile-icon"
            src={
              typeof playerData.name !== "undefined"
                ? `http://ddragon.leagueoflegends.com/cdn/12.23.1/img/profileicon/${playerData.profileIconId}.png`
                : unknownprofileicon
            }
            alt="Profile Icon"
          ></img>
          <section className="player-information">
            <p className="player-name">
              {typeof playerData.name !== "undefined" ? playerData.name : ""}
            </p>
            <p className="player-level">
              {typeof playerData.name !== "undefined"
                ? playerData.summonerLevel
                : ""}
            </p>
          </section>
        </section>
      </section>
    </section>
  );
};
