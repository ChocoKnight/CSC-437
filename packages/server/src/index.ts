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

// Routes
app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

app.use("/api/series", SeriesMultiple);

app.get(
  "/series/:seriesId",
  (req: Request, res: Response) => {
    const { seriesId } = req.params;

    Series.get(seriesId).then((data) => {
      res.set("Content-Type", "text/html")
        .send(new SeriesPage(data).render());
    });
  }
);

app.use("/auth", auth);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});