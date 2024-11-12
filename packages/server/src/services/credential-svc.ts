import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";
import { Credential } from "../models/credential";

enum MESSAGES {
    noUsernamePassword = "Must provide username and password",
    invalidUsernamePassword = "Invalid username or password",
    userNameExists = "Username exists"
}

const credentialSchema = new Schema<Credential>(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        hashedPassword: {
            type: String,
            required: true
        }
    },
    { collection: "user_credentials" }
);

const credentialModel = model<Credential>(
    "Credential",
    credentialSchema
);

function create(username: string, password: string) {
    return new Promise<Credential>((resolve, reject) => {
        if (!username || !password) {
            reject(MESSAGES.noUsernamePassword);
        }

        credentialModel
            .find({ username })
            .then((found: Credential[]) => {
                if (found.length) reject(MESSAGES.userNameExists);
            })
            .then(() =>
                bcrypt
                    .genSalt(10)
                    .then((salt: string) => bcrypt.hash(password, salt))
                    .then((hashedPassword: string) => {
                        const creds = new credentialModel({
                            username,
                            hashedPassword
                        });
                        creds.save().then((created: Credential) => {
                            if (created) resolve(created);
                        })
                    })
            );
    });
}

function verify(username: string, password: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        credentialModel
            .find({ username })
            .then((found) => {
                if (found && found.length == 1) return found[0];
                else reject(MESSAGES.invalidUsernamePassword);
            })
            .then((credsOnFile) => {
                if (credsOnFile)
                    bcrypt.compare(
                        password,
                        credsOnFile.hashedPassword,
                        (_, result) => {
                            console.log(
                                "Verified",
                                result,
                                credsOnFile.username
                            );
                            if (result) resolve(credsOnFile.username);
                            else reject(MESSAGES.invalidUsernamePassword);
                        }
                    );
                else reject(MESSAGES.invalidUsernamePassword);
            });
    });
}

export default { create, verify };