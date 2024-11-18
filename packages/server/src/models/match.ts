export interface Match {
    matchId: string;
    tournamentName: string;
    date: Date;
    teamOne: string;
    teamTwo: string;
    games: Array<Game>;
}

export interface Objectives {
    towers: number;
    topPlates: number,
    midPlates: number;
    botPlates: number;
    grubs: number;
    herald: number;
    barons: number;
    firstDrake: String;
    secondDrake: String;
    thirdDrake: String;
    fourthDrake: String;
    elderDrakes: number;
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