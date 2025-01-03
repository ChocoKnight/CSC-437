"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var game_exports = {};
__export(game_exports, {
  default: () => game_default
});
module.exports = __toCommonJS(game_exports);
var import_express = __toESM(require("express"));
var import_game_svc = __toESM(require("../services/game-svc"));
const router = import_express.default.Router();
router.get("/", (req, res) => {
  const { matchId } = req.query;
  console.log("Raw Query Parameters:", req.query);
  console.log("MatchId:", matchId);
  import_game_svc.default.index().then((list) => {
    const filteredGames = matchId ? list.filter((game) => {
      return game.matchId.trim().toLowerCase() === matchId.toString().trim().toLowerCase();
    }) : list;
    res.json(filteredGames);
  }).catch((err) => res.status(500).send(err));
});
router.get("/:gameId", (req, res) => {
  const { gameId } = req.params;
  console.log(gameId);
  console.log(req.params);
  console.log(gameId);
  import_game_svc.default.get(gameId).then((game) => res.json(game)).catch((err) => res.status(404).send(err));
});
router.post("/", (req, res) => {
  const newGame = req.body;
  import_game_svc.default.create(newGame).then(
    (game) => res.status(201).json(game)
  ).catch((err) => res.status(500).send(err));
});
router.put("/:gameId", (req, res) => {
  const { gameId } = req.params;
  const newGame = req.body;
  import_game_svc.default.update(gameId, newGame).then((game) => res.json(game)).catch((err) => res.status(404).end());
});
router.delete("/:gameId", (req, res) => {
  const { gameId } = req.params;
  import_game_svc.default.remove(gameId).then(() => res.status(204).end()).catch((err) => res.status(404).send(err));
});
var game_default = router;
