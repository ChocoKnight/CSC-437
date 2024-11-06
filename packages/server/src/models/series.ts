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
