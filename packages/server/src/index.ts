import express, { Request, Response } from "express";
import { Series } from "./models";
import { SeriesPage } from "./pages/series";
import { getSeries } from "./services/series-svc"
import { connect } from "./services/mongo";

connect("LoL");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

app.get(
  "/series/:seriesId",
  (req: Request, res: Response) => {
    const { seriesId } = req.params;
    const data = getSeries(seriesId);
    const page = new SeriesPage(data);

    res.set("Content-Type", "text/html").send(page.render());
  }
);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});