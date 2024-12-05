export interface Match {
    _id: string;
    matchId: string;
    tournamentName: string;
    date: Date;
    teamOne: string;
    teamTwo: string;
    patch: number;
    games: Array<Game>;
}

export interface Objectives {
    towers: number;
    plates: number;
    voidGrubs: number;
    riftHearlds: number;
    baronNashors: number;
    ruinousAtakan: number,
    voraciousAtakan: number,
    infernalDragons: number,
    mountainDragons: number,
    cloudDragons: number,
    oceanDragons: number,
    hextechDragons: number,
    chemtechDragons: number,
    elderDragons: number;
}

export interface PickBan {
    banOne: string;
    banTwo: string;
    banThree: string;
    banFour: string;
    banFive: string;
    pickOne: string;
    pickTwo: string;
    pickThree: string;
    pickFour: string;
    pickFive: string;
}

export interface Game {
    gameId: string;
    matchId: string;
    gameName: string;
    blueTeam: string;
    redTeam: string;
    bluePickBans: PickBan;
    redPickBans: PickBan;
    blueWin: boolean;
    blueFirstBlood: boolean;
    blueFirstTower: boolean;
    blueObjectives: Objectives;
    redObjectives: Objectives;
    duration: number;
}