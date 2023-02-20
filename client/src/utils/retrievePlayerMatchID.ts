import axios from "axios";

export const retrievePlayerMatchID = async (
  playerData: any,
  apiKey: string,
  matchIdStart: number
) => {
  return await axios
    .get(
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${await playerData.puuid}/ids?start=${matchIdStart}&count=20&api_key=${apiKey}`
    )
    .then((res:any) => res.data);
};