import axios from "axios";

export const retrieveRankPlayerData = async (
  playerData: any,
  apiKey: string
) => {
  return await axios
    .get(
      `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${await playerData.id}?api_key=${apiKey}`
    )
    .then((res) => {
      const sortedRanks = res.data.sort((a: any, b: any) => {
        if (a.queueType === "RANKED_SOLO_5x5") {
          return -1;
        } else if (b.queueType === "RANKED_FLEX_SR") {
          return 1;
        } else if (b.queueType === "RANKED_TFT_DOUBLE_UP") {
          return 2;
        }
      });

      return sortedRanks;
    });
};
