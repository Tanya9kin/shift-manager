const express = require("express");
const uuid = require("uuid");
const path = require("path");
const {
  populateTeam,
  TeamMember,
  styles,
  all_roles,
  weekly_events,
  Single_event,
  Weekly_event,
  create_month_events,
} = require("./fake-db");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());

const cors = require("cors");

app.use(cors());

// const bodyParser = require("body-parser");
// app.use(bodyParser.json());
//

// console.log(month_events);

const month_events = {
  7: create_month_events(2023, 7, weekly_events),
  8: create_month_events(2023, 8, weekly_events),
};

let team = new Map(
  populateTeam().map((teamMember) => [teamMember.id, teamMember])
);

app.get("/events/:month", (req, res) => {
  const month = req.params.month;
  console.log(month);
  res.json(month_events[month]);
});

app.get("/team/:teamMemberId", (req, res) => {
  console.log(`Team member with id: ${req.params.teamMemberId}`);

  const teamMemberToSend = team.find(
    (team_member) => team_member.id === req.params.teamMemberId
  );

  console.log(teamMemberToSend);

  if (!teamMemberToSend) {
    res.status(404).send("Team member not found");
  } else {
    teamMemberToSend.roles = all_roles.filter((role) =>
      role.team_members.includes(teamMemberToSend.id)
    );
    console.log(
      `team member: ${teamMemberToSend.first_name} roles are: ${teamMemberToSend.roles}`
    );
    res.status(200).send(teamMemberToSend);
  }
});

class TeamMemberRole {
  constructor(type, style) {
    this.type = type;
    this.style = style;
  }
}

app.get("/team", (req, res) => {
  console.log("Request to fetch team has been recieved");
  console.log(team);
  res.status(200).json(Array.from(team.values()));
});

app.get("/team/:category", (req, res) => {
  res.send(`Team Members from category: ${req.params.category}`);
});

app.get("/roles", (req, res) => {
  res.json(all_roles);
});

app.post("/", (req, res) => {
  res.send("Received a POST HTTP method");
});

app.put("/team/:id", (req, res) => {
  const id = req.params.id;
  console.log(`Team member with id: ${id} is going to be updated`);

  const teamMember = team.get(id);

  if (!teamMember) {
    res.status(404).send("Team member not found");
  } else {
    const updatedTeamMember = TeamMember.fromJSON(req.body);
    team.set(id, updatedTeamMember);
    console.log(updatedTeamMember);
    res.status(200).send(updatedTeamMember);
  }
});

app.post("/team", (req, res) => {
  const id = uuid.v4();
  const teamMember = TeamMember.fromJSON({ ...req.body, id: id });
  console.log(teamMember);
  team.set(id, teamMember);
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
