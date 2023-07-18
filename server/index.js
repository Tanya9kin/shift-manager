const express = require("express");
const uuid = require("uuid");
const path = require("path");

const PORT = process.env.PORT || 8080;
const app = express();

const {
  startOfMonth,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  getDay,
} = require("date-fns");

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

class TeamMember {
  constructor(first_name, last_name, email, phone) {
    this.id = uuid.v4();
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
  }
}

const teamMember1 = new TeamMember(
  "Tanya",
  "Deveykin",
  "tanya9kin@gmail.com",
  "0547536256"
);
const teamMember2 = new TeamMember(
  "Daniel",
  "Lyubin",
  "daniel@gmail.com",
  "0547536256"
);
const teamMember3 = new TeamMember(
  "Lior",
  "Benisty",
  "lior@gmail.com",
  "0506448370"
);

const team = [teamMember1, teamMember2, teamMember3];
console.log(team);

class Style {
  constructor(name, levels = []) {
    this.name = name;
    this.levels = levels;
  }
}

const bachata = new Style("Bachata", [1, 2, 3, 4, 5]);
const salsa = new Style("Salsa", [1, 2, 3, 4]);
const zouk = new Style("Zouk", [1, 2, 3]);

const styles = [bachata, salsa, zouk];

class Role {
  constructor(type, style, team_members = []) {
    this.id = uuid.v4();
    this.type = type;
    this.style = style;
    this.team_members = team_members;
  }
}

const bachata_instructor = new Role("Instructor", bachata, [
  teamMember1,
  teamMember3,
]);
const zouk_instructor = new Role("Instructor", zouk, [
  teamMember1,
  teamMember2,
]);
const salsa_instructor = new Role("Instructor", salsa, [teamMember2]);
const bachata_dj = new Role("DJ", bachata, [teamMember2]);
const salsa_dj = new Role("DJ", salsa, []);
const zouk_dj = new Role("DJ", zouk, [teamMember2]);

const roles = [
  bachata_instructor,
  zouk_instructor,
  salsa_instructor,
  bachata_dj,
  salsa_dj,
  zouk_dj,
];

class Weekly_event {
  constructor(name, week_day, style) {
    this.name = name;
    this.week_day = week_day;
    this.style = style;
  }
}

class Single_event extends Weekly_event {
  constructor(name, week_day, style, date, instructors = null, dj = null) {
    super(name, week_day, style);
    this.date = date;
    this.instructors = instructors;
    this.dj = dj;
  }
}

const week_days = {
  sunday: 1,
  monday: 2,
  tuesday: 3,
  wednesday: 4,
  thursday: 5,
  friday: 6,
  saturday: 7,
};

const bachata_closed_event = new Weekly_event(
  "Bachata Closed",
  week_days.monday,
  bachata
);
const salsa_closed_event = new Weekly_event(
  "Salsa Closed",
  week_days.tuesday,
  salsa
);
const zouk_event = new Weekly_event("Zouk Open", week_days.tuesday, zouk);
const bachata_open_event = new Weekly_event(
  "Bachata Open",
  week_days.thursday,
  bachata
);
const salsa_open_event = new Weekly_event(
  "Salsa Open",
  week_days.thursday,
  salsa
);

const weekly_events = [
  bachata_closed_event,
  salsa_closed_event,
  zouk_event,
  bachata_open_event,
  salsa_open_event,
];

function create_month_events(year, month, weekly_events) {
  const month_events = [];

  const days = eachDayOfInterval({
    start: startOfMonth(month),
    end: endOfMonth(month),
  });

  for (const day in days) {
    const date = new Date(year, month, day);
    for (const event of weekly_events) {
      if (event.week_day - 2 === getDay(date)) {
        month_events.push(
          new Single_event(event.name, event.week_day, event.style, date)
        );
      }
    }
  }

  return month_events;
}

const month_events = {
  7: create_month_events(2023, 7, weekly_events),
  8: create_month_events(2023, 8, weekly_events),
};

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
