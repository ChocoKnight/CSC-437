import { Champion, Match, Game, Player, Team, Tournament, User } from "server/models";

export interface Model {
    champion?: Champion;
    match?: Match;
    matches?: Match[];
    game?: Game;
    games?: Game[];
    player?: Player;
    team?: Team;
    tournament?: Tournament;
    tournaments?: Tournament[];
    user?: User;
}

export const init: Model = {};