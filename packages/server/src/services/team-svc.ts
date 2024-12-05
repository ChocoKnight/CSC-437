import { Schema, model } from "mongoose";
import { Team } from "../models";

const TeamSchema = new Schema<Team>({
    teamId: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    year: { type: Number, required: true, trim: true },
})

const TeamModel = model<Team>("Team", TeamSchema, "team");

function index(): Promise<Team[]> {
    return TeamModel.find();
}

function get(teamId: String): Promise<Team> {
    return TeamModel.find({ name: teamId })
        .then((list) => {
            // console.log("Query result:", list);
            return list[0];
        })
        .catch((err) => {
            console.log(err)
            throw `${teamId} Not Found`;
        });
}

function create(json: Team): Promise<Team> {
    const t = new TeamModel(json);
    return t.save();
}

function update(
    teamId: String,
    team: Team
): Promise<Team> {
    return TeamModel.findOneAndUpdate({ teamId }, team, {
        new: true
    }).then((updated) => {
        if (!updated) throw `${teamId} not updated`;
        else return updated as Team;
    });
}

function remove(teamId: String): Promise<void> {
    return TeamModel.findOneAndDelete({ teamId }).then(
        (deleted) => {
            if (!deleted) throw `${teamId} not deleted`;
        }
    );
}

export default { index, get, create, update, remove };