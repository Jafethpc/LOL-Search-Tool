import { Match } from "./MatchComponent/match";
import "./matchhistory.css";

export const MatchHistory = (props: any) => {
  const matchData = props.matchData;
  const queueID = props.queueID;
  const summonerSpellsID = props.summonerSpellsID;
  const runes = props.runes;
  const matchAmount = props.matchAmount;

  return (
    <section className="match">
      {matchData.map((matchIteration: any, index: any) => {
        if (index >= 0 && index <= matchAmount - 1) {
          return (
            <>
              <Match
                matchData={matchIteration}
                queueID={queueID}
                const
                summonerSpellsID={summonerSpellsID}
                runes={runes}
              />
            </>
          );
        }
      })}
    </section>
  );
};
