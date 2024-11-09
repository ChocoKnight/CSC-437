import express, { Request, Response } from "express";
import { Series } from "../models/series";
import SeriesMultiple from "../services/series-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
    SeriesMultiple.index()
        .then((list: Series[]) => res.json(list))
        .catch((err) => res.status(500).send(err));
});

router.get("/:userid", (req: Request, res: Response) => {
    const { userid } = req.params;

    SeriesMultiple.get(userid)
        .then((series: Series) => res.json(series))
        .catch((err) => res.status(404).send(err));
});

export default router;