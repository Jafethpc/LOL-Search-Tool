import axios from "axios";

export const retrievePlayerMatchData = async (
  matchIDArr: any,
  championsPlayed: any,
  matchesArr: any,
  fullPlayerData: any,
  setChampionStatsState: any,
  setSortedMatchesState: any,
  apiKey: string,
  rolesPlayed: any,
  setRolesPlayed: any,
  setKillParticipation: any,
  setTotalGameData: any
) => {
  await Promise.all(
    // Loops over the array with all the match IDs
    matchIDArr.map(async (matchId: any) => {
      const matchInformation = await axios.get(
        `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiKey}`
      );
      const totalGameData = {
        totalKills: 0,
      };

      // finds the player in the participants array with the same ID as the player you are searching for
      const player = await matchInformation.data.info.participants.find(
        (player: any) => player.puuid === fullPlayerData.puuid
      );

      matchInformation.data.info.participants.forEach((playerData: any) => {
        if (player.teamId === playerData.teamId) {
          totalGameData.totalKills += playerData.kills;
        }
      });

      for (let i = 0; i < matchInformation.data.info.participants.length; i++) {
        if (
          matchInformation.data.info.participants[i].teamId === player.teamId
        ) {
          fullPlayerData.totalPlayerData.totalKills +=
            matchInformation.data.info.participants[i].kills;
        }
      }

      fullPlayerData.totalPlayerData.playerKills += player.kills;
      fullPlayerData.totalPlayerData.playerAssists += player.assists;
      fullPlayerData.totalPlayerData.playerDeaths += player.deaths;
      fullPlayerData.totalPlayerData.totalGamesPlayed++;
      fullPlayerData.totalPlayerData.wins += player.win === true ? 1 : 0;

      if (player) {
        // Sets the champion that the player played
        const currentChampionName = player.championName;

        // Calculates CS for less repetitive code
        const cs = player.totalMinionsKilled + player.neutralMinionsKilled;

        // Selects the champion you played inside of the championsPlayed array.
        // const championPlayed = championsPlayed[currentChampionName];

        const role =
          player.teamPosition !== ""
            ? player.teamPosition === "UTILITY"
              ? "SUPPORT"
              : player.teamPosition
            : player.lane !== "NONE"
            ? player.lane
            : player.role === "DUO"
            ? "DUO"
            : player.role;

        const existingRole = rolesPlayed.find(
          (roles: any) => roles.role === role
        );

        if (existingRole) {
          existingRole.timesPlayed++;
        } else {
          if (
            role !== "DUO" &&
            matchInformation.data.info.gameMode === "CLASSIC"
          ) {
            rolesPlayed.push({
              role: role,
              timesPlayed: 1,
            });
          }
        }
        const existingChampion = championsPlayed.find(
          (champion: any) => champion.championName === currentChampionName
        );
        if (existingChampion) {
          existingChampion.timesPlayed++;
          existingChampion.cs += cs;
          existingChampion.kills += player.kills;
          existingChampion.deaths += player.deaths;
          existingChampion.assists += player.assists;
          existingChampion.wins += player.win === true ? 1 : 0;
          existingChampion.gameDuration +=
            matchInformation.data.info.gameDuration;
        } else {
          championsPlayed.push({
            championName: currentChampionName,
            timesPlayed: 1,
            cs: cs,
            kills: player.kills,
            deaths: player.deaths,
            assists: player.assists,
            wins: player.win === true ? 1 : 0,
            gameDuration: matchInformation.data.info.gameDuration,
          });
        }

        // Pushes the data of that match to an array
        matchesArr.push({
          matchID: matchId,
          matchData: matchInformation.data,
          playerData: player,
          role: role,
          totalGameData: totalGameData,
        });
      }
      // const sortedPlayedRoles = await rolesPlayed.sort((a:any, b:any) => b.)

      // Sorts the array that contained all of the champions played by how many times you played them
      const sortedChampionStats = Object.values(championsPlayed).sort(
        (a: any, b: any) => b.timesPlayed - a.timesPlayed
      );

      const sortedRolesPlayed = Object.values(rolesPlayed).sort(
        (a: any, b: any) => b.timesPlayed - a.timesPlayed
      );

      // Sorts the array that contained all of the matches by which match did you play last
      const sortMatchesByDate = await matchesArr.sort(
        (a: any, b: any) =>
          b.matchData.info.gameCreation - a.matchData.info.gameCreation
      );

      setKillParticipation(fullPlayerData.totalPlayerData);
      setRolesPlayed([...sortedRolesPlayed]);
      setChampionStatsState([...fullPlayerData.championStats]);
      setSortedMatchesState([...sortMatchesByDate]);
      setTotalGameData(setTotalGameData);

      // Storing data in object
      fullPlayerData.rolesPlayed = sortedRolesPlayed;
      fullPlayerData.matches = sortMatchesByDate;
      fullPlayerData.championStats = sortedChampionStats;
      fullPlayerData.killParticipation = fullPlayerData.totalPlayerData;
      fullPlayerData.totalGameData = totalGameData;
    })
  );
};
