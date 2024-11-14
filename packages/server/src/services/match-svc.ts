import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import { Match, Game, Objectives, PickBan } from "../models";

const match = {
    blg_vs_t1: {
        seriesId: "blgvst1_finals",
        tournamentName: "Worlds 2024",
        date: new Date("2024-11-02"),
        teamOne: "BLG",
        teamTwo: "T1",
        games: [
            {
                gameId: "blgvst1_finals_1",
                seriesId: "blgvst1_finals",
                blueTeam: "T1",
                redTeam: "BLG",
                bluePickBans: {
                    banOne: "Jax",
                    banTwo: "Aurora",
                    banThree: "Vi",
                    banFour: "Kaisa",
                    banFive: "Kalista",
                    pickOne: "Varus",
                    pickTwo: "Yone",
                    pickThree: "Ashe",
                    pickFour: "Skarner",
                    pickFive: "Gnar",
                },
                redPickBans: {
                    banOne: "Sejuani",
                    banTwo: "Sylas",
                    banThree: "Ziggs",
                    banFour: "Renata",
                    banFive: "Jhin",
                    pickOne: "Rakan",
                    pickTwo: "Rumble",
                    pickThree: "Caitlyn",
                    pickFour: "Braum",
                    pickFive: "Rell",
                },
                blueWin: false,
                blueFirstBlood: false,
                blueFirstTower: false,
                blueObjectives: {
                    towers: 5,
                    topPlates: 1,
                    midPlates: 3,
                    botPlates: 3,
                    grubs: 2,
                    herald: 0,
                    barons: 0,
                    firstDrake: "Chemtech",
                    secondDrake: "",
                    thirdDrake: "",
                    fourthDrake: "",
                    elderDrakes: 0,
                },
                redObjectives: {
                    towers: 11,
                    topPlates: 4,
                    midPlates: 1,
                    botPlates: 3,
                    grubs: 4,
                    herald: 1,
                    barons: 1,
                    firstDrake: "Hextech",
                    secondDrake: "Hextech",
                    thirdDrake: "",
                    fourthDrake: "",
                    elderDrakes: 0,
                },
                duration: 1629,
            },
            {
                gameId: "blgvst1_finals_2",
                seriesId: "blgvst1_finals",
                blueTeam: "T1",
                redTeam: "BLG",
                bluePickBans: {
                    banOne: "Jax",
                    banTwo: "Aurora",
                    banThree: "Vi",
                    banFour: "Kaisa",
                    banFive: "Wukong",
                    pickOne: "Varus",
                    pickTwo: "Yone",
                    pickThree: "Ashe",
                    pickFour: "Skarner",
                    pickFive: "Gnar",
                },
                redPickBans: {
                    banOne: "Sejuani",
                    banTwo: "Sylas",
                    banThree: "Ziggs",
                    banFour: "Renata",
                    banFive: "Jhin",
                    pickOne: "Rakan",
                    pickTwo: "Rumble",
                    pickThree: "Caitlyn",
                    pickFour: "Braum",
                    pickFive: "Rell",
                },
                blueWin: false,
                blueFirstBlood: false,
                blueFirstTower: false,
                blueObjectives: {
                    towers: 5,
                    topPlates: 1,
                    midPlates: 3,
                    botPlates: 3,
                    grubs: 2,
                    herald: 0,
                    barons: 0,
                    firstDrake: "Chemtech",
                    secondDrake: "",
                    thirdDrake: "",
                    fourthDrake: "",
                    elderDrakes: 0,
                },
                redObjectives: {
                    towers: 11,
                    topPlates: 4,
                    midPlates: 1,
                    botPlates: 3,
                    grubs: 4,
                    herald: 1,
                    barons: 1,
                    firstDrake: "Hextech",
                    secondDrake: "Hextech",
                    thirdDrake: "",
                    fourthDrake: "",
                    elderDrakes: 0,
                },
                duration: 1645,
            },
            {
                gameId: "blgvst1_finals_3",
                seriesId: "blgvst1_finals",
                blueTeam: "BLG",
                redTeam: "T1",
                bluePickBans: {
                    banOne: "Jax",
                    banTwo: "Aurora",
                    banThree: "Vi",
                    banFour: "Kaisa",
                    banFive: "Kalista",
                    pickOne: "Varus",
                    pickTwo: "Yone",
                    pickThree: "Ashe",
                    pickFour: "Skarner",
                    pickFive: "Gnar",
                },
                redPickBans: {
                    banOne: "Sejuani",
                    banTwo: "Sylas",
                    banThree: "Ziggs",
                    banFour: "Renata",
                    banFive: "Jhin",
                    pickOne: "Rakan",
                    pickTwo: "Rumble",
                    pickThree: "Caitlyn",
                    pickFour: "Braum",
                    pickFive: "Rell",
                },
                blueWin: false,
                blueFirstBlood: false,
                blueFirstTower: false,
                blueObjectives: {
                    towers: 5,
                    topPlates: 1,
                    midPlates: 3,
                    botPlates: 3,
                    grubs: 2,
                    herald: 0,
                    barons: 0,
                    firstDrake: "Chemtech",
                    secondDrake: "",
                    thirdDrake: "",
                    fourthDrake: "",
                    elderDrakes: 0,
                },
                redObjectives: {
                    towers: 11,
                    topPlates: 4,
                    midPlates: 1,
                    botPlates: 3,
                    grubs: 4,
                    herald: 1,
                    barons: 1,
                    firstDrake: "Hextech",
                    secondDrake: "Hextech",
                    thirdDrake: "",
                    fourthDrake: "",
                    elderDrakes: 0,
                },
                duration: 1655,
            },
            {
                gameId: "blgvst1_finals_4",
                seriesId: "blgvst1_finals",
                blueTeam: "T1",
                redTeam: "BLG",
                bluePickBans: {
                    banOne: "Jax",
                    banTwo: "Aurora",
                    banThree: "Vi",
                    banFour: "Kaisa",
                    banFive: "Kalista",
                    pickOne: "Varus",
                    pickTwo: "Yone",
                    pickThree: "Ashe",
                    pickFour: "Skarner",
                    pickFive: "Gnar",
                },
                redPickBans: {
                    banOne: "Sejuani",
                    banTwo: "Sylas",
                    banThree: "Ziggs",
                    banFour: "Renata",
                    banFive: "Jhin",
                    pickOne: "Rakan",
                    pickTwo: "Rumble",
                    pickThree: "Caitlyn",
                    pickFour: "Braum",
                    pickFive: "Rell",
                },
                blueWin: false,
                blueFirstBlood: false,
                blueFirstTower: false,
                blueObjectives: {
                    towers: 5,
                    topPlates: 1,
                    midPlates: 3,
                    botPlates: 3,
                    grubs: 2,
                    herald: 0,
                    barons: 0,
                    firstDrake: "Chemtech",
                    secondDrake: "",
                    thirdDrake: "",
                    fourthDrake: "",
                    elderDrakes: 0,
                },
                redObjectives: {
                    towers: 11,
                    topPlates: 4,
                    midPlates: 1,
                    botPlates: 3,
                    grubs: 4,
                    herald: 1,
                    barons: 1,
                    firstDrake: "Hextech",
                    secondDrake: "Hextech",
                    thirdDrake: "",
                    fourthDrake: "",
                    elderDrakes: 0,
                },
                duration: 1902,
            },
            {
                gameId: "blgvst1_finals_5",
                seriesId: "blgvst1_finals",
                blueTeam: "BLG",
                redTeam: "T1",
                bluePickBans: {
                    banOne: "Jax",
                    banTwo: "Aurora",
                    banThree: "Vi",
                    banFour: "Kaisa",
                    banFive: "Kalista",
                    pickOne: "Varus",
                    pickTwo: "Yone",
                    pickThree: "Ashe",
                    pickFour: "Skarner",
                    pickFive: "Gnar",
                },
                redPickBans: {
                    banOne: "Sejuani",
                    banTwo: "Sylas",
                    banThree: "Ziggs",
                    banFour: "Renata",
                    banFive: "Jhin",
                    pickOne: "Rakan",
                    pickTwo: "Rumble",
                    pickThree: "Caitlyn",
                    pickFour: "Braum",
                    pickFive: "Rell",
                },
                blueWin: false,
                blueFirstBlood: false,
                blueFirstTower: false,
                blueObjectives: {
                    towers: 5,
                    topPlates: 1,
                    midPlates: 3,
                    botPlates: 3,
                    grubs: 2,
                    herald: 0,
                    barons: 0,
                    firstDrake: "Chemtech",
                    secondDrake: "",
                    thirdDrake: "",
                    fourthDrake: "",
                    elderDrakes: 0,
                },
                redObjectives: {
                    towers: 11,
                    topPlates: 4,
                    midPlates: 1,
                    botPlates: 3,
                    grubs: 4,
                    herald: 1,
                    barons: 1,
                    firstDrake: "Hextech",
                    secondDrake: "Hextech",
                    thirdDrake: "",
                    fourthDrake: "",
                    elderDrakes: 0,
                },
                duration: 1933,
            }
        ]
    }
}

const PickBanSchema = new Schema<PickBan>({
    banOne: { type: String, required: true, trim: true },
    banTwo: { type: String, required: true, trim: true },
    banThree: { type: String, required: true, trim: true },
    banFour: { type: String, required: true, trim: true },
    banFive: { type: String, required: true, trim: true },
    pickOne: { type: String, required: true, trim: true },
    pickTwo: { type: String, required: true, trim: true },
    pickThree: { type: String, required: true, trim: true },
    pickFour: { type: String, required: true, trim: true },
    pickFive: { type: String, required: true, trim: true },
});

const ObjectivesSchema = new Schema<Objectives>({
    towers: { type: Number, required: true },
    topPlates: { type: Number, required: true },
    midPlates: { type: Number, required: true },
    botPlates: { type: Number, required: true },
    grubs: { type: Number, required: true },
    herald: { type: Number, required: true },
    barons: { type: Number, required: true },
    firstDrake: { type: String, required: true, trim: true },
    secondDrake: { type: String, required: true, trim: true },
    thirdDrake: { type: String, required: true, trim: true },
    fourthDrake: { type: String, required: true, trim: true },
    elderDrakes: { type: Number, required: true },
});

const GameSchema = new Schema<Game>(
    {
        gameId: { type: String, required: true, trim: true },
        matchId: { type: String, required: true, trim: true },
        blueTeam: { type: String, required: true, trim: true },
        redTeam: { type: String, required: true, trim: true },
        bluePickBans: { type: PickBanSchema, required: true },
        redPickBans: { type: PickBanSchema, required: true },
        blueWin: { type: Boolean, required: true },
        blueFirstBlood: { type: Boolean, required: true },
        blueFirstTower: { type: Boolean, required: true },
        blueObjectives: { type: ObjectivesSchema, required: true },
        redObjectives: { type: ObjectivesSchema, required: true },
        duration: { type: Number, required: true },
    }
);

const GameModel = model<Game>("Game", GameSchema, "game");

const MatchSchema = new Schema<Match>(
    {
        matchId: { type: String, required: true, trim: true },
        tournamentName: { type: String, required: true, trim: true },
        date: { type: Date, required: true },
        teamOne: { type: String, required: true, trim: true },
        teamTwo: { type: String, required: true, trim: true },
        games: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Game', // Reference to the Game model
            },
        ]
    },
    { collection: 'match' }
);

const MatchModel = model<Match>("Match", MatchSchema, "match");

function index(): Promise<Match[]> {
    return MatchModel.find();
}

function get(matchId: String): Promise<Match> {
    return MatchModel.find({ matchId: matchId })
        .populate('games')
        .then((list) => {
            // console.log("Query result:", list);
            return list[0];
        })
        .catch((err) => {
            console.log(err)
            throw `${matchId} Not Found`;
        });
}

function create(json: Match): Promise<Match> {
    const t = new MatchModel(json);
    return t.save();
}

function update(
    matchId: String,
    match: Match
): Promise<Match> {
    return MatchModel.findOneAndUpdate({ matchId }, match, {
        new: true
    }).then((updated) => {
        if (!updated) throw `${matchId} not updated`;
        else return updated as Match;
    });
}

function remove(matchId: String): Promise<void> {
    return MatchModel.findOneAndDelete({ matchId }).then(
        (deleted) => {
            if (!deleted) throw `${matchId} not deleted`;
        }
    );
}

export default { index, get, create, update, remove };
export function getMatch(_: string) {
    return match["blg_vs_t1"];
}