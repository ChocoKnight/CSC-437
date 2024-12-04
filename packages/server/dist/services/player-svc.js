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
var player_svc_exports = {};
__export(player_svc_exports, {
  default: () => player_svc_default
});
module.exports = __toCommonJS(player_svc_exports);
var import_mongoose = require("mongoose");
const PlayerSchema = new import_mongoose.Schema({
  playerId: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  team: { type: Number, required: true },
  year: { type: String, required: true, trim: true }
});
const PlayerModel = (0, import_mongoose.model)("Player", PlayerSchema, "player");
function index() {
  return PlayerModel.find();
}
function get(playerId) {
  return PlayerModel.find({ playerId }).populate("games").then((list) => {
    return list[0];
  }).catch((err) => {
    console.log(err);
    throw `${playerId} Not Found`;
  });
}
function create(json) {
  const t = new PlayerModel(json);
  return t.save();
}
function update(playerId, player) {
  return PlayerModel.findOneAndUpdate({ playerId }, player, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${playerId} not updated`;
    else return updated;
  });
}
function remove(playerId) {
  return PlayerModel.findOneAndDelete({ playerId }).then(
    (deleted) => {
      if (!deleted) throw `${playerId} not deleted`;
    }
  );
}
var player_svc_default = { index, get, create, update, remove };
