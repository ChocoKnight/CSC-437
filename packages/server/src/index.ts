import express, { Request, response, Response } from "express";

import { LoginPage } from "./pages/auth";

import { MatchPage } from "./pages/match";
import Match from "./services/match-svc"
import Matches from "./routes/match";

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
app.use("/api/matches", Matches);
// app.use("/api/matches", authenticateUser, Matches);

// Page Routes
app.get("/login", (req: Request, res: Response) => {
  const page = new LoginPage();
  res.set("Content-Type", "text/html").send(page.render());
});

app.get("/matches/:matchId", (req: Request, res: Response) => {
  const { matchId } = req.params;

  Match.get(matchId).then((data) => {
    res.set("Content-Type", "text/html")
      .send(new MatchPage(data).render());
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});