"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var series_svc_exports = {};
__export(series_svc_exports, {
  getDestination: () => getDestination
});
module.exports = __toCommonJS(series_svc_exports);
const series = {
  blg_vs_t1: {
    tournamentName: "Worlds 2024",
    date: /* @__PURE__ */ new Date("2024-11-02"),
    teamOne: "BLG",
    teamTwo: "T1",
    games: [
      {
        blueTeam: "T1",
        redTeam: "BLG",
        blueWin: false,
        blueFirstBlood: false,
        blueFirstTower: false,
        blueHerald: false,
        blueTowers: 5,
        blueTopPlates: 1,
        blueMidPlates: 3,
        blueBotPlates: 3,
        blueGrubs: 2,
        blueBarons: 0,
        blueCloudDrakes: 0,
        blueOceanDrakes: 0,
        blueMountainDrakes: 0,
        blueInfernalDrakes: 0,
        blueHextechDrakes: 0,
        blueChemtechDrakes: 1,
        blueElderDrakes: 0,
        redTowers: 11,
        redTopPlates: 4,
        redMidPlates: 1,
        redBotPlates: 3,
        redGrubs: 4,
        redBarons: 1,
        redCloudDrakes: 0,
        redOceanDrakes: 0,
        redMountainDrakes: 0,
        redInfernalDrakes: 0,
        redHextechDrakes: 2,
        redChemtechDrakes: 0,
        redElderDrakes: 0,
        duration: 1629
      },
      {
        blueTeam: "T1",
        redTeam: "BLG",
        blueWin: true,
        blueFirstBlood: false,
        blueFirstTower: true,
        blueHerald: true,
        blueTowers: 9,
        blueTopPlates: 5,
        blueMidPlates: 3,
        blueBotPlates: 1,
        blueGrubs: 6,
        blueBarons: 1,
        blueCloudDrakes: 0,
        blueOceanDrakes: 1,
        blueMountainDrakes: 1,
        blueInfernalDrakes: 0,
        blueHextechDrakes: 0,
        blueChemtechDrakes: 1,
        blueElderDrakes: 0,
        redTowers: 0,
        redTopPlates: 0,
        redMidPlates: 0,
        redBotPlates: 3,
        redGrubs: 0,
        redBarons: 0,
        redCloudDrakes: 0,
        redOceanDrakes: 0,
        redMountainDrakes: 0,
        redInfernalDrakes: 1,
        redHextechDrakes: 0,
        redChemtechDrakes: 0,
        redElderDrakes: 0,
        duration: 1645
      },
      {
        blueTeam: "BLG",
        redTeam: "T1",
        blueWin: true,
        blueFirstBlood: true,
        blueFirstTower: true,
        blueHerald: true,
        blueTowers: 11,
        blueTopPlates: 5,
        blueMidPlates: 1,
        blueBotPlates: 1,
        blueGrubs: 5,
        blueBarons: 1,
        blueCloudDrakes: 1,
        blueOceanDrakes: 0,
        blueMountainDrakes: 0,
        blueInfernalDrakes: 2,
        blueHextechDrakes: 0,
        blueChemtechDrakes: 0,
        blueElderDrakes: 0,
        redTowers: 2,
        redTopPlates: 0,
        redMidPlates: 2,
        redBotPlates: 3,
        redGrubs: 1,
        redBarons: 0,
        redCloudDrakes: 0,
        redOceanDrakes: 0,
        redMountainDrakes: 1,
        redInfernalDrakes: 0,
        redHextechDrakes: 0,
        redChemtechDrakes: 0,
        redElderDrakes: 0,
        duration: 1655
      },
      {
        blueTeam: "T1",
        redTeam: "BLG",
        blueWin: true,
        blueFirstBlood: false,
        blueFirstTower: true,
        blueHerald: true,
        blueTowers: 9,
        blueTopPlates: 2,
        blueMidPlates: 1,
        blueBotPlates: 2,
        blueGrubs: 6,
        blueBarons: 2,
        blueCloudDrakes: 0,
        blueOceanDrakes: 0,
        blueMountainDrakes: 1,
        blueInfernalDrakes: 0,
        blueHextechDrakes: 1,
        blueChemtechDrakes: 2,
        blueElderDrakes: 0,
        redTowers: 2,
        redTopPlates: 2,
        redMidPlates: 1,
        redBotPlates: 2,
        redGrubs: 0,
        redBarons: 0,
        redCloudDrakes: 0,
        redOceanDrakes: 0,
        redMountainDrakes: 0,
        redInfernalDrakes: 0,
        redHextechDrakes: 0,
        redChemtechDrakes: 0,
        redElderDrakes: 0,
        duration: 1902
      },
      {
        blueTeam: "BLG",
        redTeam: "T1",
        blueWin: false,
        blueFirstBlood: true,
        blueFirstTower: false,
        blueHerald: false,
        blueTowers: 3,
        blueTopPlates: 2,
        blueMidPlates: 1,
        blueBotPlates: 1,
        blueGrubs: 1,
        blueBarons: 0,
        blueCloudDrakes: 0,
        blueOceanDrakes: 0,
        blueMountainDrakes: 0,
        blueInfernalDrakes: 1,
        blueHextechDrakes: 0,
        blueChemtechDrakes: 0,
        blueElderDrakes: 0,
        redTowers: 7,
        redTopPlates: 3,
        redMidPlates: 1,
        redBotPlates: 5,
        redGrubs: 5,
        redBarons: 1,
        redCloudDrakes: 2,
        redOceanDrakes: 0,
        redMountainDrakes: 0,
        redInfernalDrakes: 0,
        redHextechDrakes: 1,
        redChemtechDrakes: 0,
        redElderDrakes: 0,
        duration: 1933
      }
    ]
  }
};
function getDestination(_) {
  return series["blg_vs_t1"];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDestination
});
