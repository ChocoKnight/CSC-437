import express, { Request, Response } from "express";
import { Match } from "../models/match";
import Matches from "../services/match-svc";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    const { tournamentName } = req.query;

    console.log("Raw Query Parameters:", req.query);
    console.log("Tournament Name:", tournamentName);

    Matches.index()
        .then((list: Match[]) => {
            // console.log("Matches Data:", list);
            // if (tournamentName) {
                const filteredMatches = tournamentName
                ? list.filter(match => {
                    // console.log("Comparing:", `"${match.tournamentName.trim()}"`, "with", `"${tournamentName.toString().trim()}"`);
                    // console.log( match.tournamentName.trim().toLowerCase() === tournamentName.toString().trim().toLowerCase());
                    return match.tournamentName.trim().toLowerCase() === tournamentName.toString().trim().toLowerCase();
                })
                : list;

                res.json(filteredMatches)
            // } else {
            //     res.json(list)
            // }
        })
        .catch((err) => res.status(500).send(err));
});

router.get("/:matchId", (req: Request, res: Response) => {
    const { matchId } = req.params;

    console.log(matchId)
    console.log(req.params)
    console.log(matchId)

    Matches.get(matchId)
        .then((match: Match) => res.json(match))
        .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
    const newMatch = req.body;

    Matches.create(newMatch)
        .then((match: Match) =>
            res.status(201).json(match)
        )
        .catch((err) => res.status(500).send(err));
});

router.put("/:matchId", (req: Request, res: Response) => {
    const { matchId } = req.params;
    const newMatch = req.body;

    Matches
        .update(matchId, newMatch)
        .then((match: Match) => res.json(match))
        .catch((err) => res.status(404).end());
});

router.delete("/:matchId", (req: Request, res: Response) => {
    const { matchId } = req.params;

    Matches.remove(matchId)
        .then(() => res.status(204).end())
        .catch((err) => res.status(404).send(err));
});

export default router;