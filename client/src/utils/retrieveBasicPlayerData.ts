import axios from "axios";

export const retrieveBasicPlayerData = async (
  summonerName: string,
  apiKey: string
) => {
  return await axios
    .get(
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`
    )
    .then(async (basicDataResponse) => basicDataResponse.data);
};
