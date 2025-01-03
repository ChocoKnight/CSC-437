import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import credentials from "../services/credential-svc";

enum ERRORMESSAGES {
    e401 = "Unauthorized",
    e404 = "Bad request: Invalid input data",
}

const router = express.Router();

dotenv.config();
const TOKEN_SECRET: string = process.env.TOKEN_SECRET || "NOT_A_SECRET";

router.post("/register", (req: Request, res: Response) => {
    const { username, password } = req.body; // from form

    if (!username || !password) {
        res.status(400).send(ERRORMESSAGES.e404);
    } else {
        credentials
            .create(username, password)
            .then((creds) => generateAccessToken(creds.username))
            .then((token) => {
                res.status(201).send({ token: token });
            });
    }
});

router.post("/login", (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).send(ERRORMESSAGES.e404)
    } else {
        credentials
            .verify(username, password)
            .then((goodUser: string) => generateAccessToken(goodUser))
            .then((token) => res.status(200).send({ token: token }))
            .catch((error) => res.status(401).send(ERRORMESSAGES.e401));
    }
});

function generateAccessToken(username: string): Promise<String> {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { username: username },
            TOKEN_SECRET,
            { expiresIn: "1d" },
            (error, token) => {
                if (error) reject(error);
                else resolve(token as string);
            }
        );
    });
}

export function authenticateUser(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];

    console.log(authHeader)

    // getting the second part of the auth header (the token)
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).end();
    } else {
        jwt.verify(token, TOKEN_SECRET, (error, decoded) => {
            if (decoded) next();
            else res.status(403).end();
        })
    }
}

export default router;