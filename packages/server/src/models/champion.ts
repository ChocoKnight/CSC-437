export interface Champion {
    championId: string;
    name: string;
    champ_id: number;
    title: string;
}

export interface Tournament {
    tournamentId: String,
    _id: String,
    league: String,
    year: Number,
    split: String
}

export interface User {
    username: string;
    favoriteTeams: Array<String>;
    favoriteChampions: Array<String>;
}