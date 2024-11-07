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
var series_exports = {};
__export(series_exports, {
  SeriesPage: () => SeriesPage
});
module.exports = __toCommonJS(series_exports);
var import_server = require("@calpoly/mustang/server");
var import_renderPage = __toESM(require("./renderPage"));
class SeriesPage {
  data;
  constructor(data) {
    this.data = data;
  }
  render() {
    return (0, import_renderPage.default)({
      body: this.renderBody(),
      stylesheets: [],
      styles: [],
      scripts: [
        `import { define } from "@calpoly/mustang";
                import { HeaderElement } from "/scripts/header.js";
                import { GameHeaderElement } from "/scripts/game_header.js";
                import { TeamGameSummaryElement } from "/scripts/team_game_summary.js";
                import { PlayerGameSummaryElement } from "/scripts/player_game_summary.js";
                import { GameTabPanelElement } from "/scripts/game_tab_panel.js";
                import { PickBanElement } from "/scripts/pick_ban.js";

                define({
                    "lol-header": HeaderElement,
                    "game-header": GameHeaderElement,
                    "team-game-summary": TeamGameSummaryElement,
                    "player-game-summary": PlayerGameSummaryElement,
                    "game-tab-panel": GameTabPanelElement,
                    "pick-ban": PickBanElement,
                });
                
                HeaderElement.initializeOnce();
                GameTabPanelElement.initializeOnce();
                `
      ]
    });
  }
  formatDate = (date) => {
    const dt = date || /* @__PURE__ */ new Date();
    const y = dt.getUTCFullYear();
    const m = SeriesPage.months[dt.getUTCMonth()];
    const d = dt.getUTCDate();
    return `${m} ${d}, ${y}`;
  };
  renderBody() {
    const { tournamentName, date, teamOne, teamTwo, games = [] } = this.data;
    var game_num = 1;
    const gameList = games.map(
      (game) => this.renderGame(game, teamOne, teamTwo, game_num),
      game_num += 1
    );
    return import_server.html`
        <lol-header></lol-header>
        <main class="page">
            <game-header>
                <a slot="team_one" href="">${teamOne}</a>
                <a slot="team_two" href="">${teamTwo}</a>
                <a slot="tournament" href="../tournaments/${tournamentName.replace(/\s+/g, "").toLowerCase()}.html">${tournamentName}</a>
                <span slot="score" href="">0-0</span>
                <span slot="date">${this.formatDate(date)}</span>
            </game-header>
            <game-tab-panel>
                ${gameList}
            </game-tab-panel>
        </main>
        `;
  }
  static months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  renderGame(game, teamOne, teamTwo, game_number) {
    const {
      blueTeam,
      redTeam,
      pickBans,
      blueWin,
      blueFirstBlood,
      blueFirstTower,
      blueHerald,
      blueGrubs,
      redGrubs,
      blueTowers,
      blueTopPlates,
      blueMidPlates,
      blueBotPlates,
      blueBarons,
      blueCloudDrakes,
      blueOceanDrakes,
      blueMountainDrakes,
      blueInfernalDrakes,
      blueHextechDrakes,
      blueChemtechDrakes,
      blueElderDrakes,
      redTowers,
      redTopPlates,
      redMidPlates,
      redBotPlates,
      redBarons,
      redCloudDrakes,
      redOceanDrakes,
      redMountainDrakes,
      redInfernalDrakes,
      redHextechDrakes,
      redChemtechDrakes,
      redElderDrakes,
      duration
    } = game;
    if (teamOne === blueTeam) {
      var teamOneSide = "Blue Side";
      var teamTwoSide = "Red Side";
    } else {
      var teamOneSide = "Red Side";
      var teamTwoSide = "Blue Side";
    }
    if (blueWin && teamOneSide === "Blue Side" || !blueWin && teamOneSide === "Red Side") {
      var score = "W - L";
    } else {
      var score = "L - W";
    }
    return import_server.html`
        <team-game-summary slot="game${game_number}">
            <span slot="team_one_side">${teamOneSide}</span>
            <span slot="score">${score}</span>
            <span slot="team_two_side">${teamTwoSide}</span>

            ${this.renderPickBan(pickBans)}

            <span slot="blue_kills">0</span>
            <span slot="blue_towers">${blueTowers}</span>
            <span slot="blue_grubs">${blueGrubs}</span>
            <span slot="blue_heralds">0</span>
            <span slot="blue_barons">${blueBarons}</span>
            <span slot="blue_drakes">${blueCloudDrakes + blueOceanDrakes + blueMountainDrakes + blueInfernalDrakes + blueHextechDrakes + blueChemtechDrakes + blueElderDrakes}</span>
            <span slot="blue_gold">0</span>
            <span slot="red_kills">0</span>
            <span slot="red_towers">${redTowers}</span>
            <span slot="red_grubs">${redGrubs}</span>
            <span slot="red_heralds">0</span>
            <span slot="red_barons">${redBarons}</span>
            <span slot="red_drakes">${redCloudDrakes + redOceanDrakes + redMountainDrakes + redInfernalDrakes + redHextechDrakes + redChemtechDrakes + redElderDrakes}</span>
            <span slot="red_gold">0</span>
        </team-game-summary>
        `;
  }
  renderPickBan(pickban) {
    const {
      blueBanOne,
      blueBanTwo,
      blueBanThree,
      blueBanFour,
      blueBanFive,
      bluePickOne,
      bluePickTwo,
      bluePickThree,
      bluePickFour,
      bluePickFive,
      redBanOne,
      redBanTwo,
      redBanThree,
      redBanFour,
      redBanFive,
      redPickOne,
      redPickTwo,
      redPickThree,
      redPickFour,
      redPickFive
    } = pickban;
    return import_server.html`
        <pick-ban slot="pick_ban">
            <img slot="bban1" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${blueBanOne}_0.jpg"
                class="champ_icon">
            <img slot="bban2" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${blueBanTwo}_0.jpg"
                class="champ_icon">
            <img slot="bban3" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${blueBanThree}_0.jpg"
                class="champ_icon">
            <img slot="bpick1" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${bluePickOne}_0.jpg"
                class="champ_icon">
            <img slot="bpick2" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${bluePickTwo}_0.jpg"
                class="champ_icon">
            <img slot="bpick3" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${bluePickThree}_0.jpg"
                class="champ_icon">
            <img slot="bban4" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${blueBanFour}_0.jpg"
                class="champ_icon">
            <img slot="bban5" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${blueBanFive}_0.jpg"
                class="champ_icon">
            <img slot="bpick4" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${bluePickFour}_0.jpg"
                class="champ_icon">
            <img slot="bpick5" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${bluePickFive}_0.jpg"
                class="champ_icon">
            <img slot="rban1" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redBanOne}_0.jpg"
                class="champ_icon">
            <img slot="rban2" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redBanTwo}_0.jpg"
                class="champ_icon">
            <img slot="rban3" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redBanThree}_0.jpg"
                class="champ_icon">
            <img slot="rpick1" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickOne}_0.jpg"
                class="champ_icon">
            <img slot="rpick2" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickTwo}_0.jpg"
                class="champ_icon">
            <img slot="rpick3" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickThree}_0.jpg"
                class="champ_icon">
            <img slot="rban4" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redBanFour}_0.jpg"
                class="champ_icon">
            <img slot="rban5" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redBanFive}_0.jpg"
                class="champ_icon">
            <img slot="rpick4" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickFour}_0.jpg"
                class="champ_icon">
            <img slot="rpick5" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickFive}_0.jpg"
                class="champ_icon">
        </pick-ban>
        `;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SeriesPage
});
