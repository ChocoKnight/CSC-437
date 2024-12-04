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
var champion_svc_exports = {};
__export(champion_svc_exports, {
  default: () => champion_svc_default
});
module.exports = __toCommonJS(champion_svc_exports);
var import_mongoose = require("mongoose");
const ChampionSchema = new import_mongoose.Schema({
  championId: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  champ_id: { type: Number, required: true },
  title: { type: String, required: true, trim: true }
});
const ChampionModel = (0, import_mongoose.model)("Champion", ChampionSchema, "champion");
function index() {
  return ChampionModel.find();
}
function get(championName) {
  return ChampionModel.find({ champion_name: championName }).then((list) => {
    console.log("Query result:", list);
    return list[0];
  }).catch((err) => {
    console.log(err);
    throw `${championName} Not Found`;
  });
}
function create(json) {
  const t = new ChampionModel(json);
  return t.save();
}
function update(championId, champion) {
  return ChampionModel.findOneAndUpdate({ championId }, champion, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${championId} not updated`;
    else return updated;
  });
}
function remove(championId) {
  return ChampionModel.findOneAndDelete({ championId }).then(
    (deleted) => {
      if (!deleted) throw `${championId} not deleted`;
    }
  );
}
var champion_svc_default = { index, get, create, update, remove };
