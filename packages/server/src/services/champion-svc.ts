import { Schema, model } from "mongoose";
import { Champion } from "../models";

const ChampionSchema = new Schema<Champion>({
    championId: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    champ_id: { type: Number, required: true },
    title: { type: String, required: true, trim: true },
})

const ChampionModel = model<Champion>("Champion", ChampionSchema, "champion");

function index(): Promise<Champion[]> {
    return ChampionModel.find();
}

function get(championName: String): Promise<Champion> {
    return ChampionModel.find({ champion_name: championName })
        .then((list) => {
            console.log("Query result:", list);
            return list[0];
        })
        .catch((err) => {
            console.log(err)
            throw `${championName} Not Found`;
        });
}

function create(json: Champion): Promise<Champion> {
    const t = new ChampionModel(json);
    return t.save();
}

function update(
    championId: String,
    champion: Champion
): Promise<Champion> {
    return ChampionModel.findOneAndUpdate({ championId }, champion, {
        new: true
    }).then((updated) => {
        if (!updated) throw `${championId} not updated`;
        else return updated as Champion;
    });
}

function remove(championId: String): Promise<void> {
    return ChampionModel.findOneAndDelete({ championId }).then(
        (deleted) => {
            if (!deleted) throw `${championId} not deleted`;
        }
    );
}

export default { index, get, create, update, remove };