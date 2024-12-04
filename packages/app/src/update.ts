import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { Champion, Team, Player, Tournament, Match, User } from "server/models";

export default function update(message: Msg, apply: Update.ApplyMap<Model>, user: Auth.User) {
    switch (message[0]) {
        case "user/select":
            selectProfile(message[1], user).then((profile) =>
                apply((model) => ({ ...model, profile }))
            );
            break;
        case "champion/select":
            selectChampion(message[1]).then((champion) =>
                apply((model) => ({ ...model, champion }))
            );
            break;
        case "teams/select":
            selectTeam(message[1]).then((team) =>
                apply((model) => ({ ...model, team }))
            );
            break;
        case "players/select":
            selectPlayer(message[1]).then((player) =>
                apply((model) => ({ ...model, player }))
            );
            break;
        case "tournament/select":
            selectTournament(message[1]).then((tournament) =>
                apply((model) => ({ ...model, tournament }))
            );
            break;
        case "match/select":
            selectMatch(message[1]).then((match) =>
                apply((model) => ({ ...model, match }))
            );
            break;
        default:
            const unhandled: string = message[0];
            throw new Error(`Unhandled Auth message "${unhandled}"`);
    }
}

function selectChampion(msg: {championName: string}) {
    return fetch(`/api/champions/${msg.championName}`)
        .then((response: Response) => {
            if (response.status === 200) {
                return response.json();
            }
            return undefined;
        })
        .then((json: unknown) => {
            if (json) {
                console.log("Champion:", json);
                return json as Champion;
            }
        });
}

function selectTeam(msg: {teamId: string}) {
    return fetch(`/api/teams/${msg.teamId}`)
        .then((response: Response) => {
            if (response.status === 200) {
                return response.json();
            }
            return undefined;
        })
        .then((json: unknown) => {
            if (json) {
                console.log("Team:", json);
                return json as Team;
            }
        });
}

function selectPlayer(msg: {playerName: string}) {
    return fetch(`/api/players/${msg.playerName}`)
        .then((response: Response) => {
            if (response.status === 200) {
                return response.json();
            }
            return undefined;
        })
        .then((json: unknown) => {
            if (json) {
                console.log("Player:", json);
                return json as Player;
            }
        });
}

function selectTournament(msg: {tournamentId: string}) {
    console.log(`/api/tournaments/${msg.tournamentId}`)
    return fetch(`/api/tournaments/${msg.tournamentId}`)
        .then((response: Response) => {
            if (response.status === 200) {
                return response.json();
            }
            return undefined;
        })
        .then((json: unknown) => {
            if (json) {
                console.log("Profile:", json);
                return json as Tournament;
            }
        });
}

function selectMatch(msg: {matchId: string}) {
    return fetch(`/api/matches/${msg.matchId}`)
        .then((response: Response) => {
            if (response.status === 200) {
                return response.json();
            }
            return undefined;
        })
        .then((json: unknown) => {
            if (json) {
                console.log("Profile:", json);
                return json as Match;
            }
        });
}

function selectProfile(msg: { userId: string }, user: Auth.User) {
    return fetch(`/api/users/${msg.userId}`, { headers: Auth.headers(user) })
        .then((response: Response) => {
            if (response.status === 200) {
                return response.json();
            }
            return undefined;
        })
        .then((json: unknown) => {
            if (json) {
                console.log("Profile:", json);
                return json as User;
            }
        });
}