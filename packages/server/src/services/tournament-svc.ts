import { Schema, model } from "mongoose";
import { Tournament } from "../models/tournament";

const TournamentSchemea = new Schema<Tournament>({
    tournamentId: { type: String, required: true, trim: true},
    // _id: { type: String, required: true, trim: true},
    league: { type: String, required: true, trim: true},
    year: { type: Number, required: true},
    split: { type: String, required: false}
});

const TournamentModel = model<Tournament>("Tournament", TournamentSchemea, "tournament");

function index(): Promise<Tournament[]> {
    return TournamentModel.find();
}

function get(tournamentId: String): Promise<Tournament> {
    return TournamentModel.find({ _id: tournamentId })
        .then((list) => {
            console.log("Query result:", list);
            return list[0];
        })
        .catch((err) => {
            console.log(err)
            throw `${tournamentId} Not Found`;
        });
}

function create(json: Tournament): Promise<Tournament> {
    const t = new TournamentModel(json);
    return t.save();
}

function update(
    tournamentId: String,
    tournament: Tournament
): Promise<Tournament> {
    return TournamentModel.findOneAndUpdate({ tournamentId }, tournament, {
        new: true
    }).then((updated) => {
        if (!updated) throw `${tournamentId} not updated`;
        else return updated as Tournament;
    });
}

function remove(tournamentId: String): Promise<void> {
    return TournamentModel.findOneAndDelete({ tournamentId }).then(
        (deleted) => {
            if (!deleted) throw `${tournamentId} not deleted`;
        }
    );
}

export default { index, get, create, update, remove };