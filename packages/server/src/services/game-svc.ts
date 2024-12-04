import { Schema, model } from "mongoose";
import { Game, Objectives, PickBan } from "../models";

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
    plates: { type: Number, required: true },
    voidGrubs: { type: Number, required: true },
    riftHearlds: { type: Number, required: true },
    baronNashors: { type: Number, required: true },
    ruinousAtakan: { type: Number, required: true },
    voraciousAtakan: { type: Number, required: true },
    infernalDragons: { type: Number, required: true, trim: true },
    mountainDragons: { type: Number, required: true, trim: true },
    oceanDragons: { type: Number, required: true, trim: true },
    cloudDragons: { type: Number, required: true, trim: true },
    hextechDragons: { type: Number, required: true, trim: true },
    chemtechDragons: { type: Number, required: true, trim: true },
    elderDragons: { type: Number, required: true },
});

const GameSchema = new Schema<Game>(
    {
        gameId: { type: String, required: true, trim: true },
        matchId: { type: String, required: true, trim: true },
        gameName: { type: String, required: true, trim: true },
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

const GameModel = model<Game>("Game", GameSchema);

function index(): Promise<Game[]> {
    return GameModel.find();
}

function get(gameId: String): Promise<Game> {
    return GameModel.find({ gameId })
        .then((list) => {
            console.log("Query result:", list);
            return list[0];
        })
        .catch((err) => {
            throw `${gameId} Not Found`;
        });
}

export default { index, get };
