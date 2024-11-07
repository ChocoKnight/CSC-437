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
  getSeries: () => getSeries
});
module.exports = __toCommonJS(series_svc_exports);
var import_mongoose = require("mongoose");
const series = {
  blg_vs_t1: {
    seriesId: "blgvst1",
    tournamentName: "Worlds 2024",
    date: /* @__PURE__ */ new Date("2024-11-02"),
    teamOne: "BLG",
    teamTwo: "T1",
    games: [
      {
        gameId: "blgvst1_1",
        seriesId: "blgvst1",
        blueTeam: "T1",
        redTeam: "BLG",
        pickBans: {
          pickBanId: "blgvst1_pb_1",
          gameId: "blgvst1_1",
          blueBanOne: "Jax",
          blueBanTwo: "Aurora",
          blueBanThree: "Vi",
          blueBanFour: "Kaisa",
          blueBanFive: "Kalista",
          bluePickOne: "Varus",
          bluePickTwo: "Yone",
          bluePickThree: "Ashe",
          bluePickFour: "Skarner",
          bluePickFive: "Gnar",
          redBanOne: "Sejuani",
          redBanTwo: "Sylas",
          redBanThree: "Ziggs",
          redBanFour: "Renata",
          redBanFive: "Jhin",
          redPickOne: "Rakan",
          redPickTwo: "Rumble",
          redPickThree: "Caitlyn",
          redPickFour: "Braum",
          redPickFive: "Rell"
        },
        blueWin: false,
        blueFirstBlood: false,
        blueFirstTower: false,
        blueHerald: 0,
        redHerald: 1,
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
        gameId: "blgvst1_2",
        seriesId: "blgvst1",
        blueTeam: "T1",
        redTeam: "BLG",
        pickBans: {
          pickBanId: "blgvst1_pb_2",
          gameId: "blgvst1_2",
          blueBanOne: "Jax",
          blueBanTwo: "Aurora",
          blueBanThree: "Vi",
          blueBanFour: "Kaisa",
          blueBanFive: "Kalista",
          bluePickOne: "Varus",
          bluePickTwo: "Yone",
          bluePickThree: "Ashe",
          bluePickFour: "Skarner",
          bluePickFive: "Gnar",
          redBanOne: "Sejuani",
          redBanTwo: "Sylas",
          redBanThree: "Ziggs",
          redBanFour: "Renata",
          redBanFive: "Jhin",
          redPickOne: "Rakan",
          redPickTwo: "Rumble",
          redPickThree: "Caitlyn",
          redPickFour: "Braum",
          redPickFive: "Rell"
        },
        blueWin: true,
        blueFirstBlood: false,
        blueFirstTower: true,
        blueHerald: 1,
        redHerald: 0,
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
        gameId: "blgvst1_3",
        seriesId: "blgvst1",
        blueTeam: "BLG",
        redTeam: "T1",
        pickBans: {
          pickBanId: "blgvst1_pb_3",
          gameId: "blgvst1_3",
          blueBanOne: "Jax",
          blueBanTwo: "Aurora",
          blueBanThree: "Vi",
          blueBanFour: "Kaisa",
          blueBanFive: "Kalista",
          bluePickOne: "Varus",
          bluePickTwo: "Yone",
          bluePickThree: "Ashe",
          bluePickFour: "Skarner",
          bluePickFive: "Gnar",
          redBanOne: "Sejuani",
          redBanTwo: "Sylas",
          redBanThree: "Ziggs",
          redBanFour: "Renata",
          redBanFive: "Jhin",
          redPickOne: "Rakan",
          redPickTwo: "Rumble",
          redPickThree: "Caitlyn",
          redPickFour: "Braum",
          redPickFive: "Rell"
        },
        blueWin: true,
        blueFirstBlood: true,
        blueFirstTower: true,
        blueHerald: 1,
        redHerald: 0,
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
        gameId: "blgvst1_4",
        seriesId: "blgvst1",
        blueTeam: "T1",
        redTeam: "BLG",
        pickBans: {
          pickBanId: "blgvst1_pb_4",
          gameId: "blgvst1_4",
          blueBanOne: "Jax",
          blueBanTwo: "Aurora",
          blueBanThree: "Vi",
          blueBanFour: "Kaisa",
          blueBanFive: "Kalista",
          bluePickOne: "Varus",
          bluePickTwo: "Yone",
          bluePickThree: "Ashe",
          bluePickFour: "Skarner",
          bluePickFive: "Gnar",
          redBanOne: "Sejuani",
          redBanTwo: "Sylas",
          redBanThree: "Ziggs",
          redBanFour: "Renata",
          redBanFive: "Jhin",
          redPickOne: "Rakan",
          redPickTwo: "Rumble",
          redPickThree: "Caitlyn",
          redPickFour: "Braum",
          redPickFive: "Rell"
        },
        blueWin: true,
        blueFirstBlood: false,
        blueFirstTower: true,
        blueHerald: 1,
        redHerald: 0,
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
        gameId: "blgvst1_5",
        seriesId: "blgvst1",
        blueTeam: "BLG",
        redTeam: "T1",
        pickBans: {
          pickBanId: "blgvst1_pb_5",
          gameId: "blgvst1_5",
          blueBanOne: "Jax",
          blueBanTwo: "Aurora",
          blueBanThree: "Vi",
          blueBanFour: "Kaisa",
          blueBanFive: "Kalista",
          bluePickOne: "Varus",
          bluePickTwo: "Yone",
          bluePickThree: "Ashe",
          bluePickFour: "Skarner",
          bluePickFive: "Gnar",
          redBanOne: "Sejuani",
          redBanTwo: "Sylas",
          redBanThree: "Ziggs",
          redBanFour: "Renata",
          redBanFive: "Jhin",
          redPickOne: "Rakan",
          redPickTwo: "Rumble",
          redPickThree: "Caitlyn",
          redPickFour: "Braum",
          redPickFive: "Rell"
        },
        blueWin: false,
        blueFirstBlood: true,
        blueFirstTower: false,
        blueHerald: 0,
        redHerald: 1,
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
const PickBanSchema = new import_mongoose.Schema(
  {
    pickBanId: { type: String, required: true, trim: true },
    gameId: { type: String, required: true, trim: true },
    blueBanOne: { type: String, required: true, trim: true },
    blueBanTwo: { type: String, required: true, trim: true },
    blueBanThree: { type: String, required: true, trim: true },
    blueBanFour: { type: String, required: true, trim: true },
    blueBanFive: { type: String, required: true, trim: true },
    bluePickOne: { type: String, required: true, trim: true },
    bluePickTwo: { type: String, required: true, trim: true },
    bluePickThree: { type: String, required: true, trim: true },
    bluePickFour: { type: String, required: true, trim: true },
    bluePickFive: { type: String, required: true, trim: true },
    redBanOne: { type: String, required: true, trim: true },
    redBanTwo: { type: String, required: true, trim: true },
    redBanThree: { type: String, required: true, trim: true },
    redBanFour: { type: String, required: true, trim: true },
    redBanFive: { type: String, required: true, trim: true },
    redPickOne: { type: String, required: true, trim: true },
    redPickTwo: { type: String, required: true, trim: true },
    redPickThree: { type: String, required: true, trim: true },
    redPickFour: { type: String, required: true, trim: true },
    redPickFive: { type: String, required: true, trim: true }
  },
  { collection: "pickbans" }
);
const GameSchema = new import_mongoose.Schema(
  {
    gameId: { type: String, required: true, trim: true },
    seriesId: { type: String, required: true, trim: true },
    blueTeam: { type: String, required: true, trim: true },
    redTeam: { type: String, required: true, trim: true },
    pickBans: { type: PickBanSchema, required: true },
    blueWin: { type: Boolean, required: true },
    blueFirstBlood: { type: Boolean, required: true },
    blueFirstTower: { type: Boolean, required: true },
    blueTopPlates: { type: Number, required: true },
    blueMidPlates: { type: Number, required: true },
    blueBotPlates: { type: Number, required: true },
    blueGrubs: { type: Number, required: true },
    blueHerald: { type: Number, required: true },
    blueBarons: { type: Number, required: true },
    blueCloudDrakes: { type: Number, required: true },
    blueOceanDrakes: { type: Number, required: true },
    blueMountainDrakes: { type: Number, required: true },
    blueInfernalDrakes: { type: Number, required: true },
    blueHextechDrakes: { type: Number, required: true },
    blueChemtechDrakes: { type: Number, required: true },
    blueElderDrakes: { type: Number, required: true },
    redTopPlates: { type: Number, required: true },
    redMidPlates: { type: Number, required: true },
    redBotPlates: { type: Number, required: true },
    redGrubs: { type: Number, required: true },
    redHerald: { type: Number, required: true },
    redBarons: { type: Number, required: true },
    redCloudDrakes: { type: Number, required: true },
    redOceanDrakes: { type: Number, required: true },
    redMountainDrakes: { type: Number, required: true },
    redInfernalDrakes: { type: Number, required: true },
    redHextechDrakes: { type: Number, required: true },
    redChemtechDrakes: { type: Number, required: true },
    redElderDrakes: { type: Number, required: true }
  },
  { collection: "games" }
);
const SeriesSchema = new import_mongoose.Schema(
  {
    seriesId: { type: String, required: true, trim: true },
    tournamentName: { type: String, required: true, trim: true },
    date: { type: Date, required: true, trim: true },
    teamOne: { type: String, required: true, trim: true },
    teamTwo: { type: String, required: true, trim: true },
    games: { type: new Array(), required: true }
  },
  { collection: "series" }
);
function getSeries(_) {
  return series["blg_vs_t1"];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getSeries
});
