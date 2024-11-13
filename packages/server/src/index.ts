import express, { Request, Response } from "express";
import { SeriesPage } from "./pages/series";
import Series from "./services/series-svc"
import SeriesMultiple from "./routes/series";
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

// Routes
app.use("/api/series", authenticateUser, SeriesMultiple);

app.get("/series/:seriesId", (req: Request, res: Response) => {
  const { seriesId } = req.params;

  Series.get(seriesId).then((data) => {
    res.set("Content-Type", "text/html")
      .send(new SeriesPage(data).render());
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});