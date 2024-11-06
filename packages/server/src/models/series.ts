export interface Series {
    tournamentName: string;
    date: Date;
    teamOne: string;
    teamTwo: string;
    games: Array<Game>;
}

export interface Game {
    blueTeam: string;
    redTeam: string;
    pickBans: PickBans
    blueWin: boolean;
    blueFirstBlood: boolean;
    blueFirstTower: boolean;
    blueHerald: boolean;
    blueTowers: number;
    blueTopPlates: number;
    blueMidPlates: number;
    blueBotPlates: number;
    blueGrubs: number;
    blueBarons: number;
    blueCloudDrakes: number;
    blueOceanDrakes: number;
    blueMountainDrakes: number;
    blueInfernalDrakes: number;
    blueHextechDrakes: number;
    blueChemtechDrakes: number;
    blueElderDrakes: number;
    redTowers: number;
    redTopPlates: number;
    redMidPlates: number;
    redBotPlates: number;
    redGrubs: number;
    redBarons: number;
    redCloudDrakes: number;
    redOceanDrakes: number;
    redMountainDrakes: number;
    redInfernalDrakes: number;
    redHextechDrakes: number;
    redChemtechDrakes: number;
    redElderDrakes: number;
    duration: number;
}

export interface PickBans {
    blueBanOne: string;
    blueBanTwo: string;
    blueBanThree: string;
    blueBanFour: string;
    blueBanFive: string;
    bluePickOne: string;
    bluePickTwo: string;
    bluePickThree: string;
    bluePickFour: string;
    bluePickFive: string;
    redBanOne: string;
    redBanTwo: string;
    redBanThree: string;
    redBanFour: string;
    redBanFive: string;
    redPickOne: string;
    redPickTwo: string;
    redPickThree: string;
    redPickFour: string;
    redPickFive: string;
}
