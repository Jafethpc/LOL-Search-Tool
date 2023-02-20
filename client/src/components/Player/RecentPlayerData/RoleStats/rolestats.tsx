import { RoleProgress } from "./RoleProgress/roleprogress";

import "./rolestats.css";

export const RoleStats = (props: any) => {
  const rolesPlayed = props.rolesPlayed;
  let totalGamesPlayed = 0;

  rolesPlayed.forEach((element: any) => {
    totalGamesPlayed += element.timesPlayed;
  });

  const getRoleData = (role: string) => {
    return rolesPlayed.filter((obj: any) => {
      return obj.role === role;
    })[0];
  };

  return (
    <section className="role-data-section">
      <RoleProgress
        roleData={getRoleData("TOP")}
        timesPlayed={totalGamesPlayed}
        role={"top"}
      />
      <RoleProgress
        roleData={getRoleData("JUNGLE")}
        timesPlayed={totalGamesPlayed}
        role={"jungle"}
      />
      <RoleProgress
        roleData={getRoleData("MIDDLE")}
        timesPlayed={totalGamesPlayed}
        role={"middle"}
      />
      <RoleProgress
        roleData={getRoleData("BOTTOM")}
        timesPlayed={totalGamesPlayed}
        role={"bottom"}
      />
      <RoleProgress
        roleData={getRoleData("SUPPORT")}
        timesPlayed={totalGamesPlayed}
        role={"support"}
      />
    </section>
  );
};
