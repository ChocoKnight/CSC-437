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
var tournament_svc_exports = {};
__export(tournament_svc_exports, {
  default: () => tournament_svc_default
});
module.exports = __toCommonJS(tournament_svc_exports);
var import_mongoose = require("mongoose");
const TournamentSchemea = new import_mongoose.Schema({
  tournamentId: { type: String, required: true, trim: true },
  league: { type: String, required: true, trim: true },
  year: { type: Number, required: true },
  split: { type: Number, required: false }
});
const TournamentModel = (0, import_mongoose.model)("Tournament", TournamentSchemea, "tournament");
function index() {
  return TournamentModel.find();
}
function get(tournamentId) {
  return TournamentModel.find({ tournamentId }).populate("games").then((list) => {
    return list[0];
  }).catch((err) => {
    console.log(err);
    throw `${tournamentId} Not Found`;
  });
}
function create(json) {
  const t = new TournamentModel(json);
  return t.save();
}
function update(tournamentId, tournament) {
  return TournamentModel.findOneAndUpdate({ tournamentId }, tournament, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${tournamentId} not updated`;
    else return updated;
  });
}
function remove(tournamentId) {
  return TournamentModel.findOneAndDelete({ tournamentId }).then(
    (deleted) => {
      if (!deleted) throw `${tournamentId} not deleted`;
    }
  );
}
var tournament_svc_default = { index, get, create, update, remove };
