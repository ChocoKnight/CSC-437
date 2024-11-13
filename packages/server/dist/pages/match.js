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
  MatchPage: () => MatchPage
});
module.exports = __toCommonJS(match_exports);
var import_server = require("@calpoly/mustang/server");
var import_renderPage = __toESM(require("./renderPage"));
class MatchPage {
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
  renderBody() {
    const { tournamentName, date, teamOne, teamTwo, games } = this.data;
    var game_num = 1;
    const gameList = games.map(
      (game) => this.renderGame(game, teamOne, teamTwo, game_num),
      game_num += 1
    );
    const { matchId } = this.data;
    const api = `/api/matches/${matchId}`;
    return import_server.html`
        <lol-header></lol-header>
        <main class="page">
            <game-header src="${api}">
            </game-header>
            <game-tab-panel> 
                ${gameList}
            </game-tab-panel>
        </main>
        `;
  }
  renderGame(game, teamOne, teamTwo, game_number) {
    const {
      blueTeam,
      redTeam,
      bluePickBans,
      redPickBans,
      blueWin,
      blueFirstBlood,
      blueFirstTower,
      blueObjectives,
      redObjectives,
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

            <span slot="duration">${this.formatDuration(duration)}</span>

            <div slot="pick_ban">${this.renderPickBan(bluePickBans, redPickBans)}</div>

            <span slot="blue_kills">0</span>
            <span slot="blue_towers">${blueObjectives.towers}</span>
            <span slot="blue_grubs">${blueObjectives.grubs}</span>
            <span slot="blue_heralds">0</span>
            <span slot="blue_barons">${blueObjectives.barons}</span>
            <span slot="blue_drakes">${this.countDrakes(blueObjectives)}</span>
            <span slot="blue_gold">0</span>
            <span slot="red_kills">0</span>
            <span slot="red_towers">${redObjectives.towers}</span>
            <span slot="red_grubs">${redObjectives.grubs}</span>
            <span slot="red_heralds">0</span>
            <span slot="red_barons">${blueObjectives.barons}</span>
            <span slot="red_drakes">${this.countDrakes(redObjectives)}</span>
            <span slot="red_gold">0</span>
        </team-game-summary>
        `;
  }
  renderPickBan(bluePickBans, redPickBans) {
    const {
      banOne,
      banTwo,
      banThree,
      banFour,
      banFive,
      pickOne,
      pickTwo,
      pickThree,
      pickFour,
      pickFive
    } = bluePickBans;
    const { matchId } = this.data;
    const api = `/api/match/${matchId}`;
    return import_server.html` 
        <pick-ban slot="pick_ban">
            <img slot="banOne" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${banOne}_0.jpg"
                class="champ_icon">
            <img slot="banTwo" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${banTwo}_0.jpg"
                class="champ_icon">
            <img slot="banThree" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${banThree}_0.jpg"
                class="champ_icon">
            <img slot="pickOne" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${pickOne}_0.jpg"
                class="champ_icon">
            <img slot="pickTwo" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${pickTwo}_0.jpg"
                class="champ_icon">
            <img slot="pickThree" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${pickThree}_0.jpg"
                class="champ_icon">
            <img slot="banFour" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${banFour}_0.jpg"
                class="champ_icon">
            <img slot="banFive" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${banFive}_0.jpg"
                class="champ_icon">
            <img slot="pickFour" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${pickFour}_0.jpg"
                class="champ_icon">
            <img slot="pickFive" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${pickFive}_0.jpg"
                class="champ_icon">
            <img slot="rban1" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickBans.banOne}_0.jpg"
                class="champ_icon">
            <img slot="rban2" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickBans.banTwo}_0.jpg"
                class="champ_icon">
            <img slot="rban3" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickBans.banThree}_0.jpg"
                class="champ_icon">
            <img slot="rpick1" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickBans.pickOne}_0.jpg"
                class="champ_icon">
            <img slot="rpick2" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickBans.pickTwo}_0.jpg"
                class="champ_icon">
            <img slot="rpick3" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickBans.pickThree}_0.jpg"
                class="champ_icon">
            <img slot="rban4" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickBans.banFour}_0.jpg"
                class="champ_icon">
            <img slot="rban5" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickBans.banFive}_0.jpg"
                class="champ_icon">
            <img slot="rpick4" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickBans.pickFour}_0.jpg"
                class="champ_icon">
            <img slot="rpick5" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickBans.pickFive}_0.jpg"
                class="champ_icon">
        </pick-ban>
        `;
  }
  static altChampNames = {
    "Wukong": "MonkeyKing"
  };
  formatDuration = (duration) => {
    const minutesString = String(Math.floor(duration / 60)).padStart(2, "0");
    const secondsString = String(duration % 60).padStart(2, "0");
    return `${minutesString}:${secondsString}`;
  };
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
  formatDate = (date) => {
    const dt = date || /* @__PURE__ */ new Date();
    const y = dt.getUTCFullYear();
    const m = MatchPage.months[dt.getUTCMonth()];
    const d = dt.getUTCDate();
    return `${m} ${d}, ${y}`;
  };
  static drakeIcons = {
    cloudDrake: "Cloud Drake",
    ocenDrake: "Ocean Drake",
    mountainDrake: "Mountain Drake",
    infernalDrake: "Infernal Drake",
    hextechDrake: "Hextech Drake",
    chemtechDrake: "Chemtech Drake",
    elderDrake: "Elder Drake"
  };
  static validDrakes = /* @__PURE__ */ new Set(["Cloud", "Ocean", "Mountain", "Infernal", "Hextech", "Chemtech", "Elder"]);
  countDrakes = (objectives) => {
    var count = 0;
    if (MatchPage.validDrakes.has(objectives.firstDrake)) {
      count += 1;
    }
    if (MatchPage.validDrakes.has(objectives.secondDrake)) {
      count += 1;
    }
    if (MatchPage.validDrakes.has(objectives.thirdDrake)) {
      count += 1;
    }
    if (MatchPage.validDrakes.has(objectives.fourthDrake)) {
      count += 1;
    }
    count += objectives.elderDrakes;
    return `${count}`;
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MatchPage
});
