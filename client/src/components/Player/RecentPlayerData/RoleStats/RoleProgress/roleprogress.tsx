import "./roleprogress.css";

export const RoleProgress = (props: any) => {
  const roleData = props.roleData;
  const timesPlayed = props.timesPlayed;
  const role = props.role;
  let heightPercentage = 0;
  if (typeof roleData !== "undefined")
    heightPercentage = (roleData.timesPlayed / timesPlayed) * 100;

  return (
    <section className="role-data">
      <section className="progress-bar">
        <section
          className="bar-percentage"
          style={{ height: `${heightPercentage}%` }}
        ></section>
      </section>
      {
        <img
          className="role-img"
          src={require(`./Images/${role}-icon.png`)}
          alt="Role Icon"
        ></img>
      }
    </section>
  );
};
