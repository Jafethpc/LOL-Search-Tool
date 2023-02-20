// Importing modules
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// DotEnv
import dotenv from "dotenv";

// Components
import { PlayerIcon } from "../components/Player/PlayerIcon/PlayerIcon";
import { RankSection } from "../components/Player/RankSection/ranksection";
import { RecentPlayerData } from "../components/Player/RecentPlayerData/recentplayerdata";
import { MatchHistory } from "../components/Player/MatchHistorySection/matchhistory";
import { Header } from "../components/Header/header";

// Utils
import { retrieveBasicPlayerData } from "../utils/retrieveBasicPlayerData";
import { retrievePlayerMatchData } from "../utils/retrievePlayerMatchData";
import { retrievePlayerMatchID } from "../utils/retrievePlayerMatchID";
import { retrieveRankPlayerData } from "../utils/retrieveRankPlayerData";

// CSS
import "../css/Player.css";

// Images
import updateButtonInactive from "../components/Player/PlayerIcon/Images/update-button-inactive.png";
import updateButtonActive from "../components/Player/PlayerIcon/Images/update-button-active.png";

dotenv.config();

// API Key
const apiKey: string = process.env.API_KEY!;

export const Player = () => {
  let summonerData: any;
  // Contains all the sorted matches by date
  const [sortedMatches, setSortedMatches] = useState<any[]>([]);

  // contains basic player data incluidng accountId, puuid, summonerName, level
  const [basicPlayerData, setBasicPlayerData] = useState<any[]>([]);

  // Contains player champions statistics from their gameplay
  const [championStats, setChampionStats] = useState<any[]>([]);

  // Stores player data before clicking the update button
  const [playerComponentData, setPlayerComponentData] = useState<any>({});

  // Stores what roles the player plays
  const [rolesPlayed, setRolesPlayed] = useState<any[]>([]);

  // Stores player kill participation within all their games
  const [killParticipation, setKillParticipation] = useState<any>({});

  const [queueID, setQueueID] = useState<any>({});

  const [summonerSpellsID, setSummonerSpellsID] = useState<any>({});

  const [totalGameData, setTotalGameData] = useState<any>({});

  const [runes, setRunes] = useState<any>({});

  const [matchStartID, setMatchStartID] = useState(0);

  const [matchAmount, setMatchAmount] = useState(20);

  const [updateButtonIsHovering, setUpdateButtonIsHovering] = useState(false);

  const [img1Opacity, setImg1Opacity] = useState(1);
  const [img2Opacity, setImg2Opacity] = useState(0);

  const handleMouseEnter = () => {
    setImg1Opacity(0);
    setImg2Opacity(1);
  };

  const handleMouseLeave = () => {
    setImg1Opacity(1);
    setImg2Opacity(0);
  };

  // Resets all useStates which contain all components
  const resetStates = () => {
    setBasicPlayerData([]);
    setSortedMatches([]);
    setChampionStats([]);
  };

  const params = useParams();
  const summonerName: any = params.player;

  useEffect(() => {
    // Resets all UseState
    resetStates();

    setMatchStartID(21);

    const fetchPlayerData = async () => {
      setQueueID(
        await axios
          .get("https://static.developer.riotgames.com/docs/lol/queues.json")
          .then((data: any) => data.data)
      );
      setSummonerSpellsID(
        await axios
          .get(
            "https://ddragon.leagueoflegends.com/cdn/12.23.1/data/en_US/summoner.json"
          )
          .then((data: any) => data.data)
      );
      setRunes(
        await axios
          .get(
            "https://ddragon.leagueoflegends.com/cdn/12.22.1/data/en_US/runesReforged.json"
          )
          .then((data: any) => data.data)
      );

      // Contains basic player data including Summoner name, level, profile icon ID, puuid, and ID
      const basicPlayerData = await retrieveBasicPlayerData(
        summonerName,
        apiKey
      );

      // Fetched player data from the mySQL database
      const fetchedPlayerData = (
        await axios.post("http://localhost:5000/player", basicPlayerData)
      ).data;

      // -- If the player data already exists in the database --
      if (Object.keys(fetchedPlayerData).length > 1) {
        setPlayerComponentData({ ...fetchedPlayerData });
        setChampionStats(fetchedPlayerData.championStats);
        setSortedMatches(fetchedPlayerData.matches);
        setRolesPlayed(fetchedPlayerData.rolesPlayed);
        setKillParticipation(fetchedPlayerData.killParticipation);
        setTotalGameData(fetchedPlayerData.totalGameData);
      } else {
        // Creates an object that will contain all the player data
        let fullPlayerData = {
          ...basicPlayerData,
          rank: [...(await retrieveRankPlayerData(basicPlayerData, apiKey))],
          matches: [],
          championStats: [],
          totalPlayerData: {
            totalKills: 0,
            playerKills: 0,
            playerAssists: 0,
            playerDeaths: 0,
            totalGamesPlayed: 0,
            wins: 0,
          },
        };

        setPlayerComponentData({ ...fullPlayerData });

        // Retrieves an array of all matchID's
        let matches = await retrievePlayerMatchID(
          basicPlayerData,
          apiKey,
          matchStartID
        );

        // Contains all the matches unsorted
        const matchData: any = [];

        // Contains all the champions played unsorted
        let championsPlayed: any = [];

        const rolesPlayed: any = [];

        // Retrieves the match data for each matchID
        await retrievePlayerMatchData(
          matches,
          championsPlayed,
          matchData,
          fullPlayerData,
          setChampionStats,
          setSortedMatches,
          apiKey,
          rolesPlayed,
          setRolesPlayed,
          setKillParticipation,
          setTotalGameData
        );

        // Sets the player data as playerComponentData that will be used later for updated data
        setPlayerComponentData({ ...fullPlayerData });

        // Sends the player data to MySQL database
        axios.post("http://localhost:5000/addPlayer", fullPlayerData);
        summonerData = fullPlayerData;
      }
    };
    fetchPlayerData();
  }, []);

  // UPDATE PLAYER FUNCTION
  const updatePlayer = async () => {
    // Resets all UseState

    // Contains basic player data including Summoner name, level, profile icon ID, puuid, and ID
    const basicPlayerData = await retrieveBasicPlayerData(summonerName, apiKey);

    let updatedPlayerData = {
      ...basicPlayerData,
      rank: [...(await retrieveRankPlayerData(basicPlayerData, apiKey))],
      matches: [],
      championStats: [],
      totalPlayerData: playerComponentData.totalPlayerData,
    };

    setPlayerComponentData({ ...updatedPlayerData });

    // Retrieves an array of all matchID's
    let matches = await retrievePlayerMatchID(basicPlayerData, apiKey, 0);

    let championsPlayed: any = playerComponentData.championStats;

    const oldMatches: any = [...playerComponentData.matches];

    let oldMatchID = [
      ...playerComponentData.matches.map((e: any) => e.matchID),
    ];
    let filteredMatches = matches.filter((e: any) => !oldMatchID.includes(e));

    const rolesPlayed: any = playerComponentData.rolesPlayed;

    if (filteredMatches.length >= 1) {
      // Retrieves the match data for each matchID
      await retrievePlayerMatchData(
        filteredMatches,
        championsPlayed,
        oldMatches,
        updatedPlayerData,
        setChampionStats,
        setSortedMatches,
        apiKey,
        rolesPlayed,
        setRolesPlayed,
        setKillParticipation,
        setTotalGameData
      );
      setPlayerComponentData({ ...updatedPlayerData });
    } else {
      updatedPlayerData.matches = playerComponentData.matches;
      updatedPlayerData.championStats = playerComponentData.championStats;
      updatedPlayerData.rolesPlayed = playerComponentData.rolesPlayed;
      updatedPlayerData.killParticipation =
        playerComponentData.killParticipation;

      setKillParticipation(updatedPlayerData.killParticipation);
      setSortedMatches([...updatedPlayerData.matches]);
      setChampionStats([...updatedPlayerData.championStats]);
      setPlayerComponentData({ ...updatedPlayerData });
    }

    axios.post("http://localhost:5000/updatePlayer", updatedPlayerData);
    summonerData = updatedPlayerData;
  };
  let x = championStats[0];

  const showMoreMatches = async () => {
    if (playerComponentData.matches.length > matchAmount) {
      setMatchAmount((matchAmount) => matchAmount + 20);
    } else {
      let matches = await retrievePlayerMatchID(
        playerComponentData,
        apiKey,
        matchStartID
      );

      let championsPlayed: any = playerComponentData.championStats;

      const oldMatches: any = [...playerComponentData.matches];

      let filteredMatches = matches.filter(
        (e: any) => !matches.includes(e.matchID)
      );
      const rolesPlayed: any = playerComponentData.rolesPlayed;

      const y: any = playerComponentData;

      await retrievePlayerMatchData(
        filteredMatches,
        championsPlayed,
        oldMatches,
        y,
        setChampionStats,
        setSortedMatches,
        apiKey,
        rolesPlayed,
        setRolesPlayed,
        setKillParticipation,
        setTotalGameData
      );

      // setMatchIds([...matches]);
      axios.post("http://localhost:5000/updatePlayer", y);
      setPlayerComponentData({ ...y });
      setMatchAmount((matchAmount) => matchAmount + 20);
      setMatchStartID(matchStartID + 20);
    }
  };

  return (
    <div className="main">
      <Header />
      <div className="player-section">
        <section className="player-left-section">
          <PlayerIcon props={playerComponentData} topChampion={x} />
          <button
            className="update-btn"
            onClick={updatePlayer}
            onMouseOver={() => setUpdateButtonIsHovering(true)}
            onMouseOut={() => setUpdateButtonIsHovering(false)}
          >
            <p className="update-btn-text">UPDATE</p>
            <img
              src={
                updateButtonIsHovering === true
                  ? updateButtonActive
                  : updateButtonInactive
              }
              alt="Update button"
            ></img>
          </button>
          {playerComponentData.rank && (
            <>
              <RankSection
                props={playerComponentData.rank.filter(
                  (e: any) => e.queueType === "RANKED_SOLO_5x5"
                )}
                queueType="SOLO/DUO"
              />
              <RankSection
                props={playerComponentData.rank.filter(
                  (e: any) => e.queueType === "RANKED_FLEX_SR"
                )}
                queueType="FLEX"
              />
            </>
          )}
        </section>

        <section className="player-right-section">
          <RecentPlayerData
            championStats={championStats}
            rolesPlayed={rolesPlayed}
            killParticipation={killParticipation}
          />
          <MatchHistory
            matchData={sortedMatches}
            queueID={queueID}
            summonerSpellsID={summonerSpellsID}
            runes={runes}
            totalGameData={totalGameData}
            matchAmount={matchAmount}
          />
          <button
            className="showmore-button"
            onClick={() => showMoreMatches()}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <p className="showmore-text">Show More</p>
            <img
              className="showmore-image-border"
              src={require("../Images/button-border.png")}
              style={{ opacity: img1Opacity }}
              alt="Show More Games Button"
            ></img>
            <img
              className="showmore-image-border-active"
              src={require("../Images/button-border-active.png")}
              style={{ opacity: img2Opacity }}
              alt="Show More Games Button"
            ></img>
          </button>
        </section>
      </div>
    </div>
  );
};
