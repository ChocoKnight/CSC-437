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
var series_exports = {};
__export(series_exports, {
  SeriesPage: () => SeriesPage
});
module.exports = __toCommonJS(series_exports);
var import_server = require("@calpoly/mustang/server");
class SeriesPage {
  data;
  constructor(data) {
    this.data = data;
  }
  render() {
  }
  formatDate = (date) => {
    const dt = date || /* @__PURE__ */ new Date();
    const m = SeriesPage.months[dt.getUTCMonth()];
    const d = dt.getUTCDate();
    return `${d} ${m}`;
  };
  renderBody() {
    const { tournamentName, date, teamOne, teamTwo, games = [] } = this.data;
    const accommodationList = games.map(
      (acc) => this.renderGame(acc)
    );
    return import_server.html`
        <lol-header></lol-header>
        <main class="page">
            <game-header>
                <a slot="team_one" href="">${teamOne}</a>
                <a slot="team_two" href="">${teamTwo}</a>
                <a slot="tournament" href="../tournaments/${tournamentName}.html">${tournamentName}</a>
                <span slot="score" href="">0-0</span>
                <span slot="date">${this.formatDate(date)}</span>
            </game-header>
            <game-tab-panel>
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
  renderGame(game, teamOne, teamTwo) {
    const {
      blueTeam,
      redTeam,
      pickBans,
      blueWin,
      blueFirstBlood,
      blueFirstTower,
      blueHerald,
      blueGrubs,
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
    return import_server.html`
        <team-game-summary>
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
            <img slot="rpick3" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickThree}.jpg"
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
