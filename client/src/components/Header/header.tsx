import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { retrieveBasicPlayerData } from "../../utils/retrieveBasicPlayerData";
import "./header.css";

// DotEnv
import dotenv from "dotenv";
dotenv.config();

// API Key
const apiKey: string = process.env.API_KEY!;

export const Header = () => {
  const navigate = useNavigate();

  const [searchBorderOpacity, setSearchBorderOpacity] = useState(1);
  const [searchBorderActivatedOpacity, setSearchBorderActivatedOpacity] =
    useState(0);
  const [summonerName, setSummonerName] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (redirect) {
      // eslint-disable-next-line no-self-assign
      window.location.href = window.location.href;
    }
  }, [redirect]);

  const setSummonerValue = (e: any) => {
    setSummonerName(e.target.value.split(" ").join("").toLowerCase());
  };

  const searchSummonerData = async () => {
    try {
      const basicPlayerData = await retrieveBasicPlayerData(
        summonerName,
        apiKey
      );

      if (basicPlayerData) {
        navigate(`/lol/summoners/${basicPlayerData.name.replace(/ /g, "%20")}`);
        setRedirect(true);
      }
    } catch (error) {}
  };

  return (
    <>
      <header>
        <section className="icons">
          <p className="home" onClick={() => navigate("/")}>
            HOME
          </p>
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
              src={require("../../Images/search-icon.png")}
              alt="Search Icon"
            />
            <img
              className="search-border"
              src={require("../../Images/search-border.png")}
              style={{ opacity: searchBorderOpacity }}
              alt="Search Box"
            />
            <img
              className="search-border-activated"
              src={require("../../Images/search-border-activated.png")}
              style={{ opacity: searchBorderActivatedOpacity }}
              alt="Search Box"
            />
            <input
              className="search-bar"
              type="text"
              onChange={setSummonerValue}
              name="summonerName"
              placeholder="Search"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchSummonerData();
                }
              }}
            />
          </section>
        </section>
        <section className="border-divider"></section>
      </header>
    </>
  );
};
