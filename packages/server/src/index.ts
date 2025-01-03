import express, { Request, response, Response } from "express";
import fs from "node:fs/promises";
import path from "path";

import { LoginPage } from "./pages/auth";

// import { MatchPage } from "./pages/match";
import Tournament from "./services/tournament-svc"
import Tournaments from "./routes/tournament";

import { MatchPage } from "./pages/match";
import Match from "./services/match-svc"
import Matches from "./routes/match";

import Game from "./services/game-svc";
import Games from "./routes/game";

import Champion from "./services/champion-svc"
import Champions from "./routes/champion";

import Team from "./services/team-svc"
import Teams from "./routes/team";

import Player from "./services/player-svc"
import Players from "./routes/player";

import { UserPage } from "./pages/user";
import User from "./services/user-svc";
import Users from "./routes/user";

import auth, { authenticateUser } from "./routes/auth";

import { connect } from "./services/mongo";


const app = express();
const port = process.env.PORT || 3000;

// Connect to DB
connect("LoL");

// Static Files
const staticDir = process.env.STATIC || "public";
app.use(express.static(staticDir));

// Middleware
app.use(express.json());

// Auth Routes
app.use("/auth", auth);

// API Routes
// app.use("/api/users", Users);
app.use("/api/users", authenticateUser, Users);
app.use("/api/tournaments", Tournaments);
app.use("/api/matches", Matches);
app.use("/api/games", Games);
app.use("/api/champions", Champions);
app.use("/api/players", Players);
app.use("/api/teams", Teams);
// app.use("/api/matches", authenticateUser, Matches);

// Page Routes
app.get("/login", (req: Request, res: Response) => {
  const page = new LoginPage();
  res.set("Content-Type", "text/html").send(page.render());
});

app.get("/users/:username", (req: Request, res: Response) => {
  const { username } = req.params;

  User.get(username).then((data) => {
    const page = new UserPage(data);
    res.set("Content-Type", "text/html").send(page.render());
  });
});

// app.get("/tournament/:matchId", (req: Request, res: Response) => {
//   const { matchId } = req.params;

//   Match.get(matchId).then((data) => {
//     res.set("Content-Type", "text/html")
//       .send(new MatchPage(data).render());
//   });
// });

app.get("/matches/:matchId", (req: Request, res: Response) => {
  const { matchId } = req.params;

  Match.get(matchId).then((data) => {
    res.set("Content-Type", "text/html")
      .send(new MatchPage(data).render());
  });
});

app.get("/games/:gameId", (req: Request, res: Response) => {
  const { gameId } = req.params;

  Match.get(gameId).then((data) => {
    res.set("Content-Type", "text/html")
      .send(new MatchPage(data).render());
  });
});

app.get("/champions/:championName", (req: Request, res: Response) => {
  const { matchId } = req.params;

  Match.get(matchId).then((data) => {
    res.set("Content-Type", "text/html")
      .send(new MatchPage(data).render());
  });
});

app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});