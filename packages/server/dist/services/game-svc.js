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
var game_svc_exports = {};
__export(game_svc_exports, {
  default: () => game_svc_default
});
module.exports = __toCommonJS(game_svc_exports);
var import_mongoose = require("mongoose");
const PickBanSchema = new import_mongoose.Schema({
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
const ObjectivesSchema = new import_mongoose.Schema({
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
const GameSchema = new import_mongoose.Schema(
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
const GameModel = (0, import_mongoose.model)("Game", GameSchema, "game");
function index() {
  return GameModel.find();
}
function get(gameId) {
  return GameModel.find({ gameId }).then((list) => {
    console.log("Query result:", list);
    return list[0];
  }).catch((err) => {
    throw `${gameId} Not Found`;
  });
}
function create(json) {
  const t = new GameModel(json);
  return t.save();
}
function update(matchId, match) {
  return GameModel.findOneAndUpdate({ matchId }, match, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${matchId} not updated`;
    else return updated;
  });
}
function remove(matchId) {
  return GameModel.findOneAndDelete({ matchId }).then(
    (deleted) => {
      if (!deleted) throw `${matchId} not deleted`;
    }
  );
}
var game_svc_default = { index, get, create, update, remove };
