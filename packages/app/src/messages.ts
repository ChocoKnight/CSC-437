import { Tournament, Match, Game, User } from "server/models";

export type Msg = 
| ["user/select", { userId: string }]
| ["user/save", { userId: string, user: User }]
| ["champion/select", { championName: string }]
| ["teams/select", { teamId: string }]
| ["players/select", { playerName: string }]
| ["tournament/select", { tournamentId: string }]
| ["tournament/save", { tournamentId: string, tournament: Tournament }]
| ["match/select", { matchId: string }]
| ["match/save", { matchId: string, match: Match }]
| ["game/select", { gameId: string }]
| ["game/save", { gameId: string, game: Game }];