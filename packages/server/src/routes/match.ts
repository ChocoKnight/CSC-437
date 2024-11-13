import express, { Request, Response } from "express";
import { Match } from "../models/match";
import Matches from "../services/match-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
    Matches.index()
        .then((list: Match[]) => res.json(list))
        .catch((err) => res.status(500).send(err));
});

router.get("/:matchId", (req: Request, res: Response) => {
    const { matchId } = req.params;

    Matches.get(matchId)
        .then((series: Match) => res.json(series))
        .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
    const newSeries = req.body;

    Matches.create(newSeries)
        .then((series: Match) =>
            res.status(201).json(series)
        )
        .catch((err) => res.status(500).send(err));
});

router.put("/:seriesId", (req: Request, res: Response) => {
    const { seriesId } = req.params;
    const newSeries = req.body;

    Matches
        .update(seriesId, newSeries)
        .then((series: Match) => res.json(series))
        .catch((err) => res.status(404).end());
});

router.delete("/:seriesId", (req: Request, res: Response) => {
    const { seriesId } = req.params;

    Matches.remove(seriesId)
        .then(() => res.status(204).end())
        .catch((err) => res.status(404).send(err));
});

export default router;