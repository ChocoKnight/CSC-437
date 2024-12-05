import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
// import { Champion, Team, Player, Tournament, Match, User } from "server/models";
import { Champion, Team, Player, Match, User } from "server/models";

import { formatDate } from "../src/utils/dates";

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
            // selectTournament(message[1]).then((tournament) =>
            //     apply((model) => ({ ...model, tournament }))
            // );
            selectTournamentWithMatches({ tournamentId: message[1].tournamentId }).then((data) => {
                if (data) {
                    const { tournament, matches } = data;
                    apply((model) => ({
                        ...model,
                        tournament, // Add or update tournament data in the model
                        matches,    // Add or update matches data in the model
                    }));
                } else {
                    console.error("Failed to fetch tournament or matches.");
                }
            });
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

function selectChampion(msg: { championName: string }) {
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

function selectTeam(msg: { teamId: string }) {
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

function selectPlayer(msg: { playerName: string }) {
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

// function selectTournament(msg: { tournamentId: string }) {
//     // console.log(`/api/tournaments/${msg.tournamentId}`)
//     return fetch(`/api/tournaments/${msg.tournamentId}`)
//         .then((response: Response) => {
//             if (response.status === 200) {
//                 return response.json();
//             }
//             return undefined;
//         })
//         .then((json: unknown) => {
//             if (json) {
//                 console.log("Profile:", json);
//                 return json as Tournament;
//             }
//         });
// }

// function selectTournamentMatches(msg: { tournamentName: string }) {
//     return fetch(`/api/matches?tournamentName=${msg}`)
//         .then((response: Response) => {
//             if (response.status === 200) {
//                 return response.json();
//             }
//             return undefined;
//         })
//         .then((json: unknown) => {
//             if (json) {
//                 console.log("Profile:", json);
//                 return json as Array<Match>;
//             }
//         });
// }

function selectTournamentWithMatches(msg: { tournamentId: string }) {
    return fetch(`/api/tournaments/${msg.tournamentId}`)
        .then((tournamentResponse) => {
            if (tournamentResponse.status === 200) {
                return tournamentResponse.json();
            }
            throw new Error("Failed to fetch tournament data");
        })
        .then((tournament) => {
            console.log("Tournament:", tournament);

            const { league, split, year } = tournament;
            const tournamentName = split === "N/A" ? `${league} ${year}` : `${league} ${year} ${split}`;

            return fetch(`/api/matches?tournamentName=${encodeURIComponent(tournamentName)}`)
                .then((matchesResponse) => {
                    if (matchesResponse.status === 200) {
                        return matchesResponse.json();
                    }
                    throw new Error("Failed to fetch matches data");
                })
                .then((matches) => {
                    console.log("Matches:", matches);
                    return { tournament, matches };
                });
        })
        .catch((error) => {
            console.error("Error:", error);
            return undefined;
        });
}

function selectMatch(msg: { matchId: string }) {
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

function selectMatchWithGames(msg: { matchId: string }) {
    return fetch(`/api/matches/${msg.matchId}`)
        .then((matchResponse) => {
            if (matchResponse.status === 200) {
                return matchResponse.json();
            }
            throw new Error("Failed to fetch tournament data");
        })
        .then((match) => {
            console.log("Match:", match);

            const { teamOne, teamTwo, date } = match;
            const matchIndex = `${teamOne} vs ${teamTwo} - ${formatDate(date)}`;

            return fetch(`/api/matches?tournamentName=${encodeURIComponent(matchIndex)}`)
                .then((gamesResponse) => {
                    if (gamesResponse.status === 200) {
                        return gamesResponse.json();
                    }
                    throw new Error("Failed to fetch matches data");
                })
                .then((games) => {
                    console.log("Games:", games);
                    return { match, games };
                });
        })
        .catch((error) => {
            console.error("Error:", error);
            return undefined;
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