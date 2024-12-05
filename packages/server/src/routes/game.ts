import express, { Request, Response } from "express";
import { Game } from "../models/match";
import Games from "../services/game-svc";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    const { matchId } = req.query;

    console.log("Raw Query Parameters:", req.query);
    console.log("MatchId:", matchId);

    // Games.index()
    //     .then((list: Game[]) => res.json(list))
    //     .catch((err) => res.status(500).send(err));

    Games.index()
        .then((list: Game[]) => {
            // console.log("Games Data:", list);
            // if (tournamentName) {
                const filteredGames = matchId
                ? list.filter(game => {
                    // console.log("Comparing:", `"${game.tournamentName.trim()}"`, "with", `"${tournamentName.toString().trim()}"`);
                    // console.log( game.tournamentName.trim().toLowerCase() === tournamentName.toString().trim().toLowerCase());
                    return game.matchId.trim().toLowerCase() === matchId.toString().trim().toLowerCase();
                })
                : list;

                res.json(filteredGames)
            // } else {
            //     res.json(list)
            // }
        })
        .catch((err) => res.status(500).send(err));
});

router.get("/:gameId", (req: Request, res: Response) => {
    const { gameId } = req.params;

    console.log(gameId)
    console.log(req.params)
    console.log(gameId)

    Games.get(gameId)
        .then((game: Game) => res.json(game))
        .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
    const newGame = req.body;

    Games.create(newGame)
        .then((game: Game) =>
            res.status(201).json(game)
        )
        .catch((err) => res.status(500).send(err));
});

router.put("/:gameId", (req: Request, res: Response) => {
    const { gameId } = req.params;
    const newGame = req.body;

    Games
        .update(gameId, newGame)
        .then((game: Game) => res.json(game))
        .catch((err) => res.status(404).end());
});

router.delete("/:gameId", (req: Request, res: Response) => {
    const { gameId } = req.params;

    Games.remove(gameId)
        .then(() => res.status(204).end())
        .catch((err) => res.status(404).send(err));
});

export default router;