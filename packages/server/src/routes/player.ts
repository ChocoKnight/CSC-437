import express, { Request, Response } from "express";
import { Player } from "../models";
import Players from "../services/player-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
    Players.index()
        .then((list: Player[]) => res.json(list))
        .catch((err) => res.status(500).send(err));
});

router.get("/:playerId", (req: Request, res: Response) => {
    const { playerId } = req.params;

    console.log(playerId)
    console.log(req.params)
    console.log(playerId)

    Players.get(playerId)
        .then((player: Player) => res.json(player))
        .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
    const newPlayer = req.body;

    Players.create(newPlayer)
        .then((player: Player) =>
            res.status(201).json(player)
        )
        .catch((err) => res.status(500).send(err));
});

router.put("/:playerId", (req: Request, res: Response) => {
    const { playerId } = req.params;
    const newPlayer = req.body;

    Players
        .update(playerId, newPlayer)
        .then((player: Player) => res.json(player))
        .catch((err) => res.status(404).end());
});

router.delete("/:playerId", (req: Request, res: Response) => {
    const { playerId } = req.params;

    Players.remove(playerId)
        .then(() => res.status(204).end())
        .catch((err) => res.status(404).send(err));
});

export default router;