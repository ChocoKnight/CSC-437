import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { Champion, Team, Player, Tournament, Match, User } from "server/models";
// import { Champion, Team, Player, Tournament, User } from "server/models";

import { formatDateShort } from "../src/utils/dates";

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
        case "tournaments/select":
            selectTournamentsWithMatches().then((tournaments) =>
                apply((model) => ({ ...model, tournaments }))
            );
            break;
        case "matches/select":
            selectMatches().then((matches) =>
                apply((model) => ({ ...model, matches }))
            );
            break;
        case "match/select":
            selectMatchWithGames({ matchId: message[1].matchId }).then((data) => {
                if (data) {
                    const { match, games } = data;
                    apply((model) => ({
                        ...model,
                        match,
                        games,
                    }));
                } else {
                    console.error("Failed to fetch match or games.");
                }
            });
            break;
        case "match/save":
                saveMatch({ matchId: message[1].matchId, match: message[1].match })
                  .then((profile) =>
                    apply((model) => ({ ...model, profile }))
                  )
                  .then(() => {
                    const { onSuccess } = message[1];
                    if (onSuccess) onSuccess();
                  })
                  .catch((error: Error) => {
                    const { onFailure } = message[1];
                    if (onFailure) onFailure(error);
                  });
                break;
        default:
            const unhandled: string = message[0];
            throw new Error(`Unhandled Auth message "${unhandled}"`);
    }
}

function saveMatch(
    msg: {
        matchId: string; 
        match: Match;}
    ){
    return fetch(`/api/matches/${msg.matchId}`, {
      method: "PUT",
      body: JSON.stringify(msg.match)
    })
      .then((response: Response) => {
        console.log(JSON.stringify(msg.match))
        if (response.status === 200) return response.json();
        else
          throw new Error(
            `Failed to save match for ${msg.matchId}`
          );
      })
      .then((json: unknown) => {
        if (json) return json as Match;
        return undefined;
      });
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

function selectTournamentsWithMatches() {
    return fetch("/api/tournaments")
        .then((response: Response) => {
            if (response.status !== 200)
                throw `Failed to load index of tournaments`;
            return response.json();
        })
        .then((json: unknown) => {
            if (json) {
                console.log("Tournament:", json);
                return json as Tournament[];
            }
        });
}

function selectMatches() {
    return fetch("/api/matches")
        .then((response: Response) => {
            if (response.status !== 200)
                throw `Failed to load index of matches`;
            return response.json();
        })
        .then((json: unknown) => {
            if (json) {
                console.log("matches:", json);
                return json as Match[];
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
            const matchIndex = `${teamOne} vs ${teamTwo} - ${formatDateShort(date)}`;

            console.log(matchIndex)

            return fetch(`/api/games?matchId=${encodeURIComponent(matchIndex)}`)
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