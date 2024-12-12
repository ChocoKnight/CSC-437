// import { Tournament, Match, Game, User } from "server/models";
import { User, Match } from "server/models";

export type Msg = 
| ["user/select", { userId: string }]
| ["user/save", { userId: string, user: User }]
| ["champion/select", { championName: string }]
| ["teams/select", { teamId: string }]
| ["players/select", { playerName: string }]
| ["tournament/select", { tournamentId: string }]
| ["tournaments/select", { }]
| ["match/select", { matchId: string }]
| ["match/save", { 
    matchId: string, 
    match: Match, 
    onSuccess?: () => void;
    onFailure?: (err: Error) => void;}]
| ["matches/select", { }]
| ["game/select", { gameId: string }]
| ["user/select", { userId: string }]
| ["user/edit", { userId: string }];