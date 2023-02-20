<<<<<<< HEAD
=======
require("dotenv").config();
>>>>>>> master
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

app.use(express.urlencoded({ limit: "100mb", extended: "true" }));
app.use(express.json({ limit: "100mb" }));
app.use(cors());

<<<<<<< HEAD
const con = mysql.createConnection({});
=======
const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
>>>>>>> master

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.post("/player", (req, res) => {
  let basicPlayerData = req.body;
  con.query(
    "SELECT playerData FROM player WHERE puuid = '" +
      basicPlayerData.puuid +
      "'",
    function (err, result) {
      if (result.length >= 1) {
        con.query(
          "SELECT playerData FROM player WHERE puuid = '" +
            basicPlayerData.puuid +
            "'",
          function (err, result) {
            if (err) throw err;
            res.send(
              JSON.parse(
                Object.values(JSON.parse(JSON.stringify(result)))[0].playerData
              )
            );
          }
        );
        console.log("The player already exists");
      } else res.send([]);
    }
  );
});

app.post("/addPlayer", (req, res) => {
  let fullPlayerData = req.body;

  con.query(
    "INSERT INTO player(player_id, puuid, playerData) VALUES (DEFAULT, '" +
      fullPlayerData.puuid +
      "', '" +
      JSON.stringify(fullPlayerData) +
      "')",
    function (err, result) {
      if (err) throw err;
      console.log("data sent!" + result);
    }
  );
});

<<<<<<< HEAD
app.get("/player", (req, res) => {});

=======
>>>>>>> master
app.post("/updatePlayer", (req, res) => {
  let fullPlayerData = req.body;
  con.query(
    "UPDATE player SET playerData = '" +
      JSON.stringify(fullPlayerData) +
      "' WHERE puuid = '" +
      fullPlayerData.puuid +
      "'",
    function (err, result) {
      if (err) throw err;
      console.log("data updated!" + result);
    }
  );
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
<<<<<<< HEAD

//  con.query(
//    "UPDATE player SET playerData = '" +
//      JSON.stringify(fullPlayerData) +
//      "' WHERE puuid = '" +
//      fullPlayerData.puuid +
//      "'",
//    function (err, result) {
//      if (err) throw err;
//      console.log("data sent!" + result);
//    }
//  );
=======
>>>>>>> master
