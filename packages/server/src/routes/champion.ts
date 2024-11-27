import express, { Request, Response } from "express";
import { Champion } from "../models";
import Champions from "../services/champion-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
    Champions.index()
        .then((list: Champion[]) => res.json(list))
        .catch((err) => res.status(500).send(err));
});

router.get("/:championId", (req: Request, res: Response) => {
    const { championId } = req.params;

    console.log(championId)
    console.log(req.params)
    console.log(championId)

    Champions.get(championId)
        .then((champion: Champion) => res.json(champion))
        .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
    const newChampion = req.body;

    Champions.create(newChampion)
        .then((champion: Champion) =>
            res.status(201).json(champion)
        )
        .catch((err) => res.status(500).send(err));
});

router.put("/:championId", (req: Request, res: Response) => {
    const { championId } = req.params;
    const newChampion = req.body;

    Champions
        .update(championId, newChampion)
        .then((champion: Champion) => res.json(champion))
        .catch((err) => res.status(404).end());
});

router.delete("/:championId", (req: Request, res: Response) => {
    const { championId } = req.params;

    Champions.remove(championId)
        .then(() => res.status(204).end())
        .catch((err) => res.status(404).send(err));
});

export default router;