// import { Tournament, Match, Game, User } from "server/models";
import { User } from "server/models";

export type Msg = 
| ["user/select", { userId: string }]
| ["user/save", { userId: string, user: User }]
| ["champion/select", { championName: string }]
| ["teams/select", { teamId: string }]
| ["players/select", { playerName: string }]
| ["tournament/select", { tournamentId: string }]
| ["tournaments/select", { }]
| ["match/select", { matchId: string }]
| ["matches/select", { }]
| ["game/select", { gameId: string }];