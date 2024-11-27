import express, { Request, Response } from "express";
import { Team } from "../models";
import Teams from "../services/team-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
    Teams.index()
        .then((list: Team[]) => res.json(list))
        .catch((err) => res.status(500).send(err));
});

router.get("/:teamId", (req: Request, res: Response) => {
    const { teamId } = req.params;

    console.log(teamId)
    console.log(req.params)
    console.log(teamId)

    Teams.get(teamId)
        .then((team: Team) => res.json(team))
        .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
    const newTeam = req.body;

    Teams.create(newTeam)
        .then((team: Team) =>
            res.status(201).json(team)
        )
        .catch((err) => res.status(500).send(err));
});

router.put("/:teamId", (req: Request, res: Response) => {
    const { teamId } = req.params;
    const newTeam = req.body;

    Teams
        .update(teamId, newTeam)
        .then((team: Team) => res.json(team))
        .catch((err) => res.status(404).end());
});

router.delete("/:teamId", (req: Request, res: Response) => {
    const { teamId } = req.params;

    Teams.remove(teamId)
        .then(() => res.status(204).end())
        .catch((err) => res.status(404).send(err));
});

export default router;