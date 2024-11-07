export interface Series {
    seriesId: string;
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
    firstDrake: String,
    secondDrake: String,
    thirdDrake: String,
    fourthDrake: String,
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
    seriesId: string;
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

// export interface PickBans {
//     // pickBanId: string;
//     // gameId: string;
//     blueBanOne: string;
//     blueBanTwo: string;
//     blueBanThree: string;
//     blueBanFour: string;
//     blueBanFive: string;
//     bluePickOne: string;
//     bluePickTwo: string;
//     bluePickThree: string;
//     bluePickFour: string;
//     bluePickFive: string;
//     redBanOne: string;
//     redBanTwo: string;
//     redBanThree: string;
//     redBanFour: string;
//     redBanFive: string;
//     redPickOne: string;
//     redPickTwo: string;
//     redPickThree: string;
//     redPickFour: string;
//     redPickFive: string;
// }
