import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";

// Utils
import { retrieveBasicPlayerData } from "../utils/retrieveBasicPlayerData";

// DotEnv
import dotenv from "dotenv";
dotenv.config();

// API Key
const apiKey: string = process.env.API_KEY!;

export const Home = () => {
  const navigate = useNavigate();

  // state to manage the opacity of the search border
  const [searchBorderOpacity, setSearchBorderOpacity] = useState(1);
  const [searchBorderActivatedOpacity, setSearchBorderActivatedOpacity] =
    useState(0);

  // state to manage the summoner name entered in the search bar
  const [summonerNameInput, setSummonerNameInput] = useState("");

  // when the user types in the search bar, set the summoner name state
  const handleSummonerNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSummonerNameInput(event.target.value);
  };

  // when the user presses enter in the search bar, search for the summoner data
  const handleSearchSummonerData = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      try {
        // retrieve basic player data for the entered summoner name
        const basicPlayerData = await retrieveBasicPlayerData(
          summonerNameInput.toLowerCase(),
          apiKey
        );

        // if player data was successfully retrieved, navigate to the player page
        if (basicPlayerData) {
          const encodedSummonerName = encodeURIComponent(basicPlayerData.name);
          navigate(`/lol/summoners/${encodedSummonerName}`);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <section className="home-main">
      <section className="logo-section">
        <img
          className="lol-logo"
          src={require("../Images/leagueoflegends-logo.png")}
          alt="Logo"
        ></img>
      </section>
      <section
        className="button-section"
        onMouseEnter={() => {
          setSearchBorderOpacity(0);
          setSearchBorderActivatedOpacity(1);
        }}
        onMouseLeave={() => {
          setSearchBorderOpacity(1);
          setSearchBorderActivatedOpacity(0);
        }}
      >
        <img
          className="search-icon"
          src={require("../Images/search-icon.png")}
          alt="Search Icon"
        ></img>
        <img
          className="search-border"
          src={require("../Images/search-border.png")}
          style={{ opacity: searchBorderOpacity }}
          alt="Search Border"
        />
        <img
          className="search-border-activated"
          src={require("../Images/search-border-activated.png")}
          style={{ opacity: searchBorderActivatedOpacity }}
          alt="Search Border"
        />
        <input
          className="search-bar"
          type="text"
          onChange={handleSummonerNameChange}
          onKeyPress={handleSearchSummonerData}
          name="summonerName"
          placeholder="Search"
        ></input>
      </section>
    </section>
  );
};
