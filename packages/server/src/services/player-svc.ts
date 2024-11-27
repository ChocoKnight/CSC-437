import { Schema, model } from "mongoose";
import { Player } from "../models";

const PlayerSchema = new Schema<Player>({
    playerId: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    team: { type: Number, required: true },
    year: { type: String, required: true, trim: true },
})

const PlayerModel = model<Player>("Player", PlayerSchema, "player");

function index(): Promise<Player[]> {
    return PlayerModel.find();
}

function get(playerId: String): Promise<Player> {
    return PlayerModel.find({ playerId: playerId })
        .populate('games')
        .then((list) => {
            // console.log("Query result:", list);
            return list[0];
        })
        .catch((err) => {
            console.log(err)
            throw `${playerId} Not Found`;
        });
}

function create(json: Player): Promise<Player> {
    const t = new PlayerModel(json);
    return t.save();
}

function update(
    playerId: String,
    player: Player
): Promise<Player> {
    return PlayerModel.findOneAndUpdate({ playerId }, player, {
        new: true
    }).then((updated) => {
        if (!updated) throw `${playerId} not updated`;
        else return updated as Player;
    });
}

function remove(playerId: String): Promise<void> {
    return PlayerModel.findOneAndDelete({ playerId }).then(
        (deleted) => {
            if (!deleted) throw `${playerId} not deleted`;
        }
    );
}

export default { index, get, create, update, remove };