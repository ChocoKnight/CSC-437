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
    return import_server.html`
        <lol-header></lol-header>
        <main class="page">
            <game-header>
                <a slot="team_one" href="">${teamOne}</a>
                <a slot="team_two" href="">${teamTwo}</a>
                <a slot="tournament" href="../tournaments/${tournamentName}.html">${tournamentName}</a>
                <span slot="score" href="">2-0</span>
                <span slot="date">${this.formatDate(date)}</span>
            </game-header>
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
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SeriesPage
});
