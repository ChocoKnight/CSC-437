import express, { Request, Response } from "express";
import { Tournament } from "../models/tournament";
import Tournaments from "../services/tournament-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
    Tournaments.index()
        .then((list: Tournament[]) => res.json(list))
        .catch((err) => res.status(500).send(err));
});

router.get("/:tournamentId", (req: Request, res: Response) => {
    const { tournamentId } = req.params;

    console.log(tournamentId)

    Tournaments.get(tournamentId)
        .then((tournament: Tournament) => res.json(tournament))
        .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
    const newTournament = req.body;

    Tournaments.create(newTournament)
        .then((tournament: Tournament) =>
            res.status(201).json(tournament)
        )
        .catch((err) => res.status(500).send(err));
});

router.put("/:tournamentId", (req: Request, res: Response) => {
    const { tournamentId } = req.params;
    const newTournament = req.body;

    Tournaments
        .update(tournamentId, newTournament)
        .then((tournament: Tournament) => res.json(tournament))
        .catch((err) => res.status(404).end());
});

router.delete("/:tournamentId", (req: Request, res: Response) => {
    const { tournamentId } = req.params;

    Tournaments.remove(tournamentId)
        .then(() => res.status(204).end())
        .catch((err) => res.status(404).send(err));
});

export default router;