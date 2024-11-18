import { Schema, model } from "mongoose";
import { User } from "../models/user";

const UserSchema = new Schema<User>(
    {
        username: { type: String, required: true, trim: true },
        favoriteTeams: [String],
        favoriteChampions: [String]
    },
    { collection: "user_profiles" }
);

const UserModel = model<User>(
    "User",
    UserSchema
);

function index(): Promise<User[]> {
    return UserModel.find();
}

function get(username: String): Promise<User> {
    return UserModel.find({ username })
        .then((list) => list[0])
        .catch(() => {
            throw `${username} Not Found`;
        });
}

function update(username: String, user: User): Promise<User> {
    return UserModel.findOneAndUpdate({ username }, user, {
        new: true
    }).then((updated) => {
        if (!updated) throw `${username} not updated`;
        else return updated as User;
    });
}

function create(user: User): Promise<User> {
    const p = new UserModel(user);
    return p.save();
}

function remove(username: String): Promise<void> {
    return UserModel.findOneAndDelete({ username }).then(
        (deleted) => {
            if (!deleted) throw `${username} not deleted`;
        }
    );
}

export default { index, get, create, update, remove };