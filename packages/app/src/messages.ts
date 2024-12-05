// import { Tournament, Match, Game, User } from "server/models";
import { User } from "server/models";

export type Msg = 
| ["user/select", { userId: string }]
| ["user/save", { userId: string, user: User }]
| ["champion/select", { championName: string }]
| ["teams/select", { teamId: string }]
| ["players/select", { playerName: string }]
| ["tournament/select", { tournamentId: string }]
| ["tournament/match/select", { tournamentName: string }]
| ["match/select", { matchId: string }]
| ["game/select", { gameId: string }];