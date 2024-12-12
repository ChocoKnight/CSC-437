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
var match_svc_exports = {};
__export(match_svc_exports, {
  default: () => match_svc_default
});
module.exports = __toCommonJS(match_svc_exports);
var import_mongoose2 = require("mongoose");
const match = {
  blg_vs_t1: {
    seriesId: "blgvst1_finals",
    tournamentName: "Worlds 2024",
    date: /* @__PURE__ */ new Date("2024-11-02"),
    teamOne: "BLG",
    teamTwo: "T1",
    games: [
      {
        gameId: "blgvst1_finals_1",
        seriesId: "blgvst1_finals",
        blueTeam: "T1",
        redTeam: "BLG",
        bluePickBans: {
          banOne: "Jax",
          banTwo: "Aurora",
          banThree: "Vi",
          banFour: "Kaisa",
          banFive: "Kalista",
          pickOne: "Varus",
          pickTwo: "Yone",
          pickThree: "Ashe",
          pickFour: "Skarner",
          pickFive: "Gnar"
        },
        redPickBans: {
          banOne: "Sejuani",
          banTwo: "Sylas",
          banThree: "Ziggs",
          banFour: "Renata",
          banFive: "Jhin",
          pickOne: "Rakan",
          pickTwo: "Rumble",
          pickThree: "Caitlyn",
          pickFour: "Braum",
          pickFive: "Rell"
        },
        blueWin: false,
        blueFirstBlood: false,
        blueFirstTower: false,
        blueObjectives: {
          towers: 5,
          topPlates: 1,
          midPlates: 3,
          botPlates: 3,
          grubs: 2,
          herald: 0,
          barons: 0,
          firstDrake: "Chemtech",
          secondDrake: "",
          thirdDrake: "",
          fourthDrake: "",
          elderDrakes: 0
        },
        redObjectives: {
          towers: 11,
          topPlates: 4,
          midPlates: 1,
          botPlates: 3,
          grubs: 4,
          herald: 1,
          barons: 1,
          firstDrake: "Hextech",
          secondDrake: "Hextech",
          thirdDrake: "",
          fourthDrake: "",
          elderDrakes: 0
        },
        duration: 1629
      },
      {
        gameId: "blgvst1_finals_2",
        seriesId: "blgvst1_finals",
        blueTeam: "T1",
        redTeam: "BLG",
        bluePickBans: {
          banOne: "Jax",
          banTwo: "Aurora",
          banThree: "Vi",
          banFour: "Kaisa",
          banFive: "Wukong",
          pickOne: "Varus",
          pickTwo: "Yone",
          pickThree: "Ashe",
          pickFour: "Skarner",
          pickFive: "Gnar"
        },
        redPickBans: {
          banOne: "Sejuani",
          banTwo: "Sylas",
          banThree: "Ziggs",
          banFour: "Renata",
          banFive: "Jhin",
          pickOne: "Rakan",
          pickTwo: "Rumble",
          pickThree: "Caitlyn",
          pickFour: "Braum",
          pickFive: "Rell"
        },
        blueWin: false,
        blueFirstBlood: false,
        blueFirstTower: false,
        blueObjectives: {
          towers: 5,
          topPlates: 1,
          midPlates: 3,
          botPlates: 3,
          grubs: 2,
          herald: 0,
          barons: 0,
          firstDrake: "Chemtech",
          secondDrake: "",
          thirdDrake: "",
          fourthDrake: "",
          elderDrakes: 0
        },
        redObjectives: {
          towers: 11,
          topPlates: 4,
          midPlates: 1,
          botPlates: 3,
          grubs: 4,
          herald: 1,
          barons: 1,
          firstDrake: "Hextech",
          secondDrake: "Hextech",
          thirdDrake: "",
          fourthDrake: "",
          elderDrakes: 0
        },
        duration: 1645
      },
      {
        gameId: "blgvst1_finals_3",
        seriesId: "blgvst1_finals",
        blueTeam: "BLG",
        redTeam: "T1",
        bluePickBans: {
          banOne: "Jax",
          banTwo: "Aurora",
          banThree: "Vi",
          banFour: "Kaisa",
          banFive: "Kalista",
          pickOne: "Varus",
          pickTwo: "Yone",
          pickThree: "Ashe",
          pickFour: "Skarner",
          pickFive: "Gnar"
        },
        redPickBans: {
          banOne: "Sejuani",
          banTwo: "Sylas",
          banThree: "Ziggs",
          banFour: "Renata",
          banFive: "Jhin",
          pickOne: "Rakan",
          pickTwo: "Rumble",
          pickThree: "Caitlyn",
          pickFour: "Braum",
          pickFive: "Rell"
        },
        blueWin: false,
        blueFirstBlood: false,
        blueFirstTower: false,
        blueObjectives: {
          towers: 5,
          topPlates: 1,
          midPlates: 3,
          botPlates: 3,
          grubs: 2,
          herald: 0,
          barons: 0,
          firstDrake: "Chemtech",
          secondDrake: "",
          thirdDrake: "",
          fourthDrake: "",
          elderDrakes: 0
        },
        redObjectives: {
          towers: 11,
          topPlates: 4,
          midPlates: 1,
          botPlates: 3,
          grubs: 4,
          herald: 1,
          barons: 1,
          firstDrake: "Hextech",
          secondDrake: "Hextech",
          thirdDrake: "",
          fourthDrake: "",
          elderDrakes: 0
        },
        duration: 1655
      },
      {
        gameId: "blgvst1_finals_4",
        seriesId: "blgvst1_finals",
        blueTeam: "T1",
        redTeam: "BLG",
        bluePickBans: {
          banOne: "Jax",
          banTwo: "Aurora",
          banThree: "Vi",
          banFour: "Kaisa",
          banFive: "Kalista",
          pickOne: "Varus",
          pickTwo: "Yone",
          pickThree: "Ashe",
          pickFour: "Skarner",
          pickFive: "Gnar"
        },
        redPickBans: {
          banOne: "Sejuani",
          banTwo: "Sylas",
          banThree: "Ziggs",
          banFour: "Renata",
          banFive: "Jhin",
          pickOne: "Rakan",
          pickTwo: "Rumble",
          pickThree: "Caitlyn",
          pickFour: "Braum",
          pickFive: "Rell"
        },
        blueWin: false,
        blueFirstBlood: false,
        blueFirstTower: false,
        blueObjectives: {
          towers: 5,
          topPlates: 1,
          midPlates: 3,
          botPlates: 3,
          grubs: 2,
          herald: 0,
          barons: 0,
          firstDrake: "Chemtech",
          secondDrake: "",
          thirdDrake: "",
          fourthDrake: "",
          elderDrakes: 0
        },
        redObjectives: {
          towers: 11,
          topPlates: 4,
          midPlates: 1,
          botPlates: 3,
          grubs: 4,
          herald: 1,
          barons: 1,
          firstDrake: "Hextech",
          secondDrake: "Hextech",
          thirdDrake: "",
          fourthDrake: "",
          elderDrakes: 0
        },
        duration: 1902
      },
      {
        gameId: "blgvst1_finals_5",
        seriesId: "blgvst1_finals",
        blueTeam: "BLG",
        redTeam: "T1",
        bluePickBans: {
          banOne: "Jax",
          banTwo: "Aurora",
          banThree: "Vi",
          banFour: "Kaisa",
          banFive: "Kalista",
          pickOne: "Varus",
          pickTwo: "Yone",
          pickThree: "Ashe",
          pickFour: "Skarner",
          pickFive: "Gnar"
        },
        redPickBans: {
          banOne: "Sejuani",
          banTwo: "Sylas",
          banThree: "Ziggs",
          banFour: "Renata",
          banFive: "Jhin",
          pickOne: "Rakan",
          pickTwo: "Rumble",
          pickThree: "Caitlyn",
          pickFour: "Braum",
          pickFive: "Rell"
        },
        blueWin: false,
        blueFirstBlood: false,
        blueFirstTower: false,
        blueObjectives: {
          towers: 5,
          topPlates: 1,
          midPlates: 3,
          botPlates: 3,
          grubs: 2,
          herald: 0,
          barons: 0,
          firstDrake: "Chemtech",
          secondDrake: "",
          thirdDrake: "",
          fourthDrake: "",
          elderDrakes: 0
        },
        redObjectives: {
          towers: 11,
          topPlates: 4,
          midPlates: 1,
          botPlates: 3,
          grubs: 4,
          herald: 1,
          barons: 1,
          firstDrake: "Hextech",
          secondDrake: "Hextech",
          thirdDrake: "",
          fourthDrake: "",
          elderDrakes: 0
        },
        duration: 1933
      }
    ]
  }
};
const PickBanSchema = new import_mongoose2.Schema({
  banOne: { type: String, required: true, trim: true },
  banTwo: { type: String, required: true, trim: true },
  banThree: { type: String, required: true, trim: true },
  banFour: { type: String, required: true, trim: true },
  banFive: { type: String, required: true, trim: true },
  pickOne: { type: String, required: true, trim: true },
  pickTwo: { type: String, required: true, trim: true },
  pickThree: { type: String, required: true, trim: true },
  pickFour: { type: String, required: true, trim: true },
  pickFive: { type: String, required: true, trim: true }
});
const ObjectivesSchema = new import_mongoose2.Schema({
  towers: { type: Number, required: true },
  plates: { type: Number, required: true },
  voidGrubs: { type: Number, required: true },
  riftHearlds: { type: Number, required: true },
  baronNashors: { type: Number, required: true },
  ruinousAtakan: { type: Number, required: true },
  voraciousAtakan: { type: Number, required: true },
  infernalDragons: { type: Number, required: true, trim: true },
  mountainDragons: { type: Number, required: true, trim: true },
  oceanDragons: { type: Number, required: true, trim: true },
  cloudDragons: { type: Number, required: true, trim: true },
  hextechDragons: { type: Number, required: true, trim: true },
  chemtechDragons: { type: Number, required: true, trim: true },
  elderDragons: { type: Number, required: true }
});
const GameSchema = new import_mongoose2.Schema(
  {
    gameId: { type: String, required: true, trim: true },
    matchId: { type: String, required: true, trim: true },
    gameName: { type: String, required: true, trim: true },
    blueTeam: { type: String, required: true, trim: true },
    redTeam: { type: String, required: true, trim: true },
    bluePickBans: { type: PickBanSchema, required: true },
    redPickBans: { type: PickBanSchema, required: true },
    blueWin: { type: Boolean, required: true },
    blueFirstBlood: { type: Boolean, required: true },
    blueFirstTower: { type: Boolean, required: true },
    blueObjectives: { type: ObjectivesSchema, required: true },
    redObjectives: { type: ObjectivesSchema, required: true },
    duration: { type: Number, required: true }
  }
);
const MatchSchema = new import_mongoose2.Schema(
  {
    matchId: { type: String, required: true, trim: true },
    tournamentName: { type: String, required: true, trim: true },
    patch: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    teamOne: { type: String, required: true, trim: true },
    teamTwo: { type: String, required: true, trim: true },
    games: [
      {
        type: Number
        // ref: 'Game', // Reference to the Game model
      }
    ]
  },
  { collection: "match" }
);
const MatchModel = (0, import_mongoose2.model)("Match", MatchSchema, "match");
function index() {
  return MatchModel.find();
}
function get(matchId) {
  return MatchModel.find({ _id: matchId }).populate("games").then((list) => {
    return list[0];
  }).catch((err) => {
    console.log(err);
    throw `${matchId} Not Found`;
  });
}
function create(json) {
  const t = new MatchModel(json);
  return t.save();
}
function update(matchId, match2) {
  return MatchModel.findOneAndUpdate({ matchId }, match2, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${matchId} not updated`;
    else return updated;
  });
}
function remove(matchId) {
  return MatchModel.findOneAndDelete({ matchId }).then(
    (deleted) => {
      if (!deleted) throw `${matchId} not deleted`;
    }
  );
}
var match_svc_default = { index, get, create, update, remove };
