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
var match_exports = {};
__export(match_exports, {
  default: () => match_default
});
module.exports = __toCommonJS(match_exports);
var import_express = __toESM(require("express"));
var import_match_svc = __toESM(require("../services/match-svc"));
const router = import_express.default.Router();
router.get("/", (req, res) => {
  const { tournamentName } = req.query;
  console.log("Raw Query Parameters:", req.query);
  console.log("Tournament Name:", tournamentName);
  import_match_svc.default.index().then((list) => {
    const filteredMatches = tournamentName ? list.filter((match) => {
      return match.tournamentName.trim().toLowerCase() === tournamentName.toString().trim().toLowerCase();
    }) : list;
    res.json(filteredMatches);
  }).catch((err) => res.status(500).send(err));
});
router.get("/:matchId", (req, res) => {
  const { matchId } = req.params;
  console.log(matchId);
  console.log(req.params);
  console.log(matchId);
  import_match_svc.default.get(matchId).then((match) => res.json(match)).catch((err) => res.status(404).send(err));
});
router.post("/", (req, res) => {
  const newMatch = req.body;
  import_match_svc.default.create(newMatch).then(
    (match) => res.status(201).json(match)
  ).catch((err) => res.status(500).send(err));
});
router.put("/:matchId", (req, res) => {
  const { matchId } = req.params;
  const newMatch = req.body;
  import_match_svc.default.update(matchId, newMatch).then((match) => res.json(match)).catch((err) => {
    console.log(err);
    res.status(404).end();
  });
});
router.delete("/:matchId", (req, res) => {
  const { matchId } = req.params;
  import_match_svc.default.remove(matchId).then(() => res.status(204).end()).catch((err) => res.status(404).send(err));
});
var match_default = router;
