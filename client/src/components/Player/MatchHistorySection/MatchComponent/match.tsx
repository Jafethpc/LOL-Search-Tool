// CSS
import "./match.css";

export const Match = (props: any) => {
  const totalGameData = props.matchData.totalGameData;
  const matchData = props.matchData.matchData;
  const playerData = props.matchData.playerData;
  const queueID = props.queueID;
  const summonerSpellsID = props.summonerSpellsID.data;
  const runes = props.runes;
  const cs = playerData.totalMinionsKilled + playerData.neutralMinionsKilled;
  const playerPrimaryRuneSet = playerData.perks.styles[0];
  const playerSecondaryRuneSet = playerData.perks.styles[1];
  const items = [
    playerData.item0,
    playerData.item1,
    playerData.item2,
    playerData.item3,
    playerData.item4,
    playerData.item5,
    playerData.item6,
  ];
  let summonerSpell1;
  let summonerSpell2;
  let primaryRune;
  let secondaryRune;
  let blueSide: any = [];
  let redSide: any = [];

  runes.forEach((e: any) => {
    if (e.id === playerPrimaryRuneSet.style) {
      e.slots[0].runes.forEach((e: any) => {
        if (e.id === playerPrimaryRuneSet.selections[0].perk)
          primaryRune = e.icon;
      });
    }

    if (e.id === playerSecondaryRuneSet.style) secondaryRune = e.icon;
  });

  for (const property in summonerSpellsID) {
    if (summonerSpellsID[property].key === String(playerData.summoner1Id)) {
      summonerSpell1 = property;
    }
    if (summonerSpellsID[property].key === String(playerData.summoner2Id))
      summonerSpell2 = property;
  }

  matchData.info.participants.forEach((e: any) => {
    if (e.teamId === 100) blueSide.push(e);
    else redSide.push(e);
  });

  // Calculate how many days ago a match was played
  const currentTime: any = new Date();
  const pastTime: any = new Date(matchData.info.gameEndTimestamp);

  const days = Math.floor((currentTime - pastTime) / (1000 * 60 * 60 * 24));
  const hours = Math.floor((currentTime - pastTime) / (1000 * 60 * 60)) % 24;
  const minutes = Math.floor((currentTime - pastTime) / (1000 * 60)) % 60;

  // Gamemode
  const matchGamemode = queueID.find(
    (queue: any) => queue.queueId === matchData.info.queueId
  )?.description;

  return (
    <div className="match-main">
      {/* <img className="match-top-border" src={bottomBorder}></img> */}
      <div className="match-main-section">
        <section className="match-information">
          {" "}
          <section
            className="win-status"
            style={{
              backgroundColor: playerData.win
                ? "rgb(83, 90, 231)"
                : "rgb(225, 56, 56)",
            }}
          ></section>
          <section className="gamemode-win-section">
            <section className="match-information-top-section">
              <p
                className="match-gamemode"
                style={{
                  color: playerData.win
                    ? "rgb(83, 90, 231)"
                    : "rgb(225, 56, 56)",
                }}
              >
                {matchGamemode === "5v5 Ranked Solo games"
                  ? "Ranked Solo"
                  : matchGamemode === "5v5 Draft Pick games"
                  ? "Normal"
                  : matchGamemode === "5v5 ARAM games"
                  ? "ARAM"
                  : matchGamemode === "Ultimate Spellbook games"
                  ? "Ultimate Spellbook"
                  : matchGamemode === "Ultra Rapid Fire games" ||
                    matchGamemode === "Pick URF games"
                  ? "URF"
                  : matchGamemode === "ARURF games"
                  ? "ARURF"
                  : matchData.info.queueId === 720
                  ? "Clash"
                  : matchData.info.queueId === 440
                  ? "Ranked Flex"
                  : typeof matchGamemode !== "undefined"
                  ? "Custom"
                  : ""}
              </p>
              <p className="match-time-ago">
                {days > 0
                  ? `${days} days`
                  : days === 0 && hours <= 24
                  ? `${hours} hours`
                  : `${minutes}`}{" "}
                ago
              </p>
            </section>
            <section className="match-information-bottom-section">
              <p className="match-outcome">
                {playerData.win === true ? "VICTORY" : "DEFEAT"}
              </p>
              <p className="match-duration">
                {`${Math.trunc(
                  Math.floor(matchData.info.gameDuration) / 60
                )}m ${matchData.info.gameDuration % 60}`}
                s
              </p>
            </section>
          </section>
        </section>
        <section className="champion-runes">
          <section className="champion-runes-top-section">
            <section className="champion-image-border">
              <img
                className="champion-icon-img"
                src={
                  playerData.championName === "FiddleSticks"
                    ? `https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/Fiddlesticks.png`
                    : `https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${playerData.championName}.png`
                }
                alt="Champion Icon"
              ></img>
              <img
                className="champion-icon-image-border"
                src={require("./Images/champion-icon-border.png")}
                alt=""
              ></img>
            </section>
            <section className="champion-level">
              <img
                className="level-image-border"
                src={require("./Images/champion-level-border.png")}
                alt="Level Border"
              ></img>
              <p className="level">{playerData.champLevel}</p>
            </section>
          </section>
          <section className="champion-runes-bottom-section">
            <img
              className="summoner-spell"
              src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/spell/${summonerSpell1}.png`}
              alt="Summoner Spell"
            ></img>
            <img
              className="summoner-spell"
              src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/spell/${summonerSpell2}.png`}
              alt="Summoner Spell"
            ></img>
            <img
              className="runes"
              src={`https://ddragon.leagueoflegends.com/cdn/img/${primaryRune}`}
              alt="Primary Rune"
            ></img>
            <img
              className="runes"
              src={`https://ddragon.leagueoflegends.com/cdn/img/${secondaryRune}`}
              alt="Secondary Rune"
            ></img>
          </section>
        </section>
        <section className="kda-items">
          <section className="kda-items-top-section">
            <section className="kda-items-top-left-section">
              <section className="kda-section">
                <p className="kills-deaths-assists">
                  {playerData.kills} /{" "}
                  <span className="player-deaths">{playerData.deaths}</span> /{" "}
                  {playerData.assists}
                </p>
                <p className="kda">
                  {`${(
                    (playerData.kills + playerData.assists) /
                    playerData.deaths
                  ).toFixed(2)}` === "Infinity"
                    ? "Perfect "
                    : `${(
                        (playerData.kills + playerData.assists) /
                        playerData.deaths
                      ).toFixed(2)}:1 `}
                  KDA
                </p>
                <section className="cs-section">
                  <p className="cs">
                    {" "}
                    {cs % 1 === 0 ? cs.toFixed(0) : cs.toFixed(2)} (
                    {(cs / (matchData.info.gameDuration / 60)).toFixed(2)})
                  </p>
                  <img
                    className="cs-icon"
                    src={require("./Images/CS-icon.png")}
                    alt="CS Icon"
                  ></img>
                </section>
              </section>

              <section className="killp-vision">
                <p className="kill-participation">
                  P/KILL{" "}
                  {(
                    (playerData.kills / totalGameData.totalKills) *
                    100
                  ).toFixed(0)}
                  %
                </p>
                <p className="vision-score">VISION {playerData.visionScore}</p>
              </section>
            </section>
            <section className="kda-items-top-right-section"></section>
          </section>
          <section className="kda-items-bottom-section">
            <section className="main-items-section">
              {items.map((e: any) => {
                return (
                  <img
                    className="main-item"
                    src={
                      e !== 0
                        ? `https://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/${e}.png`
                        : require("./Images/empty-item.jpg")
                    }
                    alt="Main Item"
                  ></img>
                );
              })}
            </section>
            <img className="utlitiy-item" alt="Utility Items"></img>
          </section>
        </section>
        <section className="participants">
          <section className="ally-team">
            {blueSide.map((player: any) => {
              return (
                <section className="team-player">
                  <img
                    className="player-champion-team-img"
                    src={
                      player.championName === "FiddleSticks"
                        ? `https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/Fiddlesticks.png`
                        : `https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${player.championName}.png`
                    }
                    alt="Player Champion"
                  ></img>
                  <p className="team-player-name">{player.summonerName}</p>
                </section>
              );
            })}
          </section>
          <section className="enemy-team">
            {redSide.map((player: any) => {
              return (
                <section className="team-player">
                  <img
                    className="player-champion-team-img"
                    src={
                      player.championName === "FiddleSticks"
                        ? `https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/Fiddlesticks.png`
                        : `https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${player.championName}.png`
                    }
                    alt="Player Champion"
                  ></img>
                  <p className="team-player-name">{player.summonerName}</p>
                </section>
              );
            })}
          </section>
        </section>
      </div>
      <div className="match-divider"></div>
    </div>
  );
};
