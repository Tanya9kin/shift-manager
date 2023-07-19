const express = require("express");
const uuid = require("uuid");
const path = require("path");
const { team, styles, roles, month_events } = require("./fake-db");
const PORT = process.env.PORT || 8080;
const app = express();

const cors = require("cors");
// const { da } = require("date-fns/locale");
app.use(cors());

// const bodyParser = require("body-parser");
// app.use(bodyParser.json());

// const state = {
//   events: [
//     false,
//     "Bachata",
//     "Salsa & Zouk",
//     false,
//     "Bachata & Salsa",
//     false,
//     false,
//   ],

//   workers: {
//     instructors: [
//       {
//         name: "Tanya",
//         email: "tanya9kin@gmail.com",
//         bachata: true,
//         salsa: false,
//         zouk: true,
//       },
//       {
//         name: "Daniel",
//         email: "daniel@gmail.com",
//         bachata: true,
//         salsa: false,
//         zouk: true,
//       },
//       {
//         name: "Lior",
//         email: "lior@gmail.com",
//         bachata: true,
//         salsa: false,
//         zouk: false,
//       },
//       {
//         name: "Hezi",
//         email: "hezi@gmail.com",
//         bachata: true,
//         salsa: true,
//         zouk: false,
//       },
//       {
//         name: "Bat-hen",
//         email: "bat-hen@gmail.com",
//         bachata: false,
//         salsa: true,
//         zouk: false,
//       },
//       {
//         name: "Haim",
//         email: "haim@gmail.com",
//         bachata: true,
//         salsa: true,
//         zouk: false,
//       },
//     ],
//     djs: [
//       {
//         name: "Don Or",
//         bachata: true,
//         salsa: false,
//         zouk: false,
//       },
//       {
//         name: "Lobo",
//         bachata: true,
//         salsa: false,
//         zouk: true,
//       },
//       {
//         name: "Vova",
//         bachata: false,
//         salsa: true,
//         zouk: false,
//       },
//     ],
//   },

//   chosen_day: 25,

//   chosen_day_schedule: {
//     bachata: {
//       level1: "Tanya",
//       level2: "Hezi",
//       level3: "Lior",
//       dj: "Don Or",
//     },
//     salsa: {
//       level1: "Bat-hen",
//       level2: "Haim",
//       dj: "Vova",
//     },
//   },
// };

// console.log(month_events);

app.use(express.json());

// app.get("/api", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });

app.get("/events/:month", (req, res) => {
  const month = req.params.month;
  console.log(month);
  res.json(month_events[month]);
});

// app.get("/events/:month/:day", (req, res) => {
//   res.send(
//     `GET HTTP method on events from month ${req.params.month} from day ${req.params.day} resource`
//   );
// });

app.get("/team/:teamMemberId", (req, res) => {
  console.log(`Team member with id: ${req.params.teamMemberId}`);

  const teamMemberToSend = team.find(
    (team_member) => team_member.id === req.params.teamMemberId
  );

  // console.log(
  //   `${team_member.id} === ${req.params.teamMemberId} which means its ${
  //     team_member.id === req.params.teamMemberId
  //   }`
  // );

  console.log(teamMemberToSend);

  if (!teamMemberToSend) {
    res.status(404).send("Team member not found");
  } else {
    teamMemberToSend.roles = roles.filter((role) =>
      role.team_members.includes(teamMemberToSend.id)
    );
    console.log(
      `team member: ${teamMemberToSend.first_name} roles are: ${teamMemberToSend.roles}`
    );
    res.status(200).send(teamMemberToSend);
  }
});

app.get("/team/:teamMemberId/roles", (req, res) => {
  console.log(`Team member with id: ${req.params.teamMemberId}`);

  const teamMemberToSend = team.find(
    (team_member) => team_member.id === req.params.teamMemberId
  );

  console.log(teamMemberToSend);

  if (!teamMemberToSend) {
    res.status(404).send("Team member not found");
  } else {
    const memberRoles = roles
      .filter((role) => role.team_members.includes(teamMemberToSend.id))
      .map((role) => role.role_type);
    console.log(
      `team member: ${teamMemberToSend.first_name} roles are: ${memberRoles}`
    );
    res.status(200).json(memberRoles);
  }
});

app.get("/team", (req, res) => {
  console.log("Request to fetch team has been recieved");
  res.json(team);
});
app.get("/team/:category", (req, res) => {
  res.send(`Team Members from category: ${req.params.category}`);
});

app.get("/roles", (req, res) => {
  res.json(roles);
});

app.post("/", (req, res) => {
  res.send("Received a POST HTTP method");
});

app.post("/team", (req, res) => {
  const id = uuid.v4();
  const teamMember = new TeamMember(
    req.body.first_name,
    req.body.last_name,
    req.body.email,
    req.body.phone
  );

  team.push(teamMember);

  res.send(teamMember);
});

app.put("/", (req, res) => {
  return res.send("Received a PUT HTTP method");
});

app.delete("/", (req, res) => {
  return res.send("Received a DELETE HTTP method");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
