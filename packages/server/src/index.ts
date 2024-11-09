import express, { Request, Response } from "express";
import { SeriesPage } from "./pages/series";
import Series from "./services/series-svc"
import SeriesMultiple from "./routes/series";
import Game from "./services/game-svc"
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

// Routes
app.use("/api/series", SeriesMultiple);

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

app.get(
  "/series/:seriesId",
  (req: Request, res: Response) => {
    const { seriesId } = req.params;
    // const data = getSeries(seriesId);
    // const page = new SeriesPage(data);
    // res.set("Content-Type", "text/html").send(page.render());

    // console.log(Game.index());

    Series.get(seriesId).then((data) => {

      // console.log(data)

      res.set("Content-Type", "text/html")
        .send(new SeriesPage(data).render());
    });
  }
);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});