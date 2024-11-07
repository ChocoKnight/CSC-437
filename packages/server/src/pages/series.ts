import { css, html } from "@calpoly/mustang/server";
import { Series, Game, PickBan, Objectives} from "../models";
import renderPage from "./renderPage"; // generic page renderer

export class SeriesPage {
    data: Series;

    constructor(data: Series) {
        this.data = data;
    }

    render() {
        return renderPage({
            body: this.renderBody(),
            stylesheets: [],
            styles: [
            ],
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
        const { tournamentName, date, teamOne, teamTwo, games = [] } = this.data;

        var game_num: number = 1;
        const gameList = games.map((game) =>
            this.renderGame(game, teamOne, teamTwo, game_num),
            game_num += 1
        );

        return html`
        <lol-header></lol-header>
        <main class="page">
            <game-header>
                <a slot="team_one" href="">${teamOne}</a>
                <a slot="team_two" href="">${teamTwo}</a>
                <a slot="tournament" href="../tournaments/${tournamentName.replace(/\s+/g, '').toLowerCase()}.html">${tournamentName}</a>
                <span slot="score" href="">0-0</span>
                <span slot="date">${this.formatDate(date)}</span>
            </game-header>
            <game-tab-panel>
                ${gameList}
            </game-tab-panel>
        </main>
        `;
    }

    renderGame(game: Game, teamOne: string, teamTwo: string, game_number: number) {
        const {
            blueTeam, redTeam, bluePickBans, redPickBans, blueWin, blueFirstBlood, blueFirstTower, blueObjectives, redObjectives, duration
        } = game;

        if (teamOne === blueTeam) {
            var teamOneSide: string = "Blue Side";
            var teamTwoSide: string = "Red Side";
        } else {
            var teamOneSide: string = "Red Side";
            var teamTwoSide: string = "Blue Side";
        }

        if ((blueWin && teamOneSide === "Blue Side") || (!blueWin && teamOneSide === "Red Side")) {
            var score: string = "W - L"
        } else {
            var score: string = "L - W"
        }

        return html`
        <team-game-summary slot="game${game_number}">
            <span slot="team_one_side">${teamOneSide}</span>
            <span slot="score">${score}</span>
            <span slot="team_two_side">${teamTwoSide}</span>

            ${this.renderPickBan(bluePickBans, redPickBans)}

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

    renderPickBan(bluePickBan: PickBan, redPickBan: PickBan ) {
        return html`
        <pick-ban slot="pick_ban">
            <img slot="bban1" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${bluePickBan.banOne}_0.jpg"
                class="champ_icon">
            <img slot="bban2" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${bluePickBan.banTwo}_0.jpg"
                class="champ_icon">
            <img slot="bban3" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${bluePickBan.banThree}_0.jpg"
                class="champ_icon">
            <img slot="bpick1" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${bluePickBan.pickOne}_0.jpg"
                class="champ_icon">
            <img slot="bpick2" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${bluePickBan.pickTwo}_0.jpg"
                class="champ_icon">
            <img slot="bpick3" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${bluePickBan.pickThree}_0.jpg"
                class="champ_icon">
            <img slot="bban4" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${bluePickBan.banFour}_0.jpg"
                class="champ_icon">
            <img slot="bban5" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${bluePickBan.banFive}_0.jpg"
                class="champ_icon">
            <img slot="bpick4" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${bluePickBan.pickFour}_0.jpg"
                class="champ_icon">
            <img slot="bpick5" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${bluePickBan.pickFive}_0.jpg"
                class="champ_icon">
            <img slot="rban1" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickBan.banOne}_0.jpg"
                class="champ_icon">
            <img slot="rban2" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickBan.banTwo}_0.jpg"
                class="champ_icon">
            <img slot="rban3" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickBan.banThree}_0.jpg"
                class="champ_icon">
            <img slot="rpick1" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickBan.pickOne}_0.jpg"
                class="champ_icon">
            <img slot="rpick2" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickBan.pickTwo}_0.jpg"
                class="champ_icon">
            <img slot="rpick3" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickBan.pickThree}_0.jpg"
                class="champ_icon">
            <img slot="rban4" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickBan.banFour}_0.jpg"
                class="champ_icon">
            <img slot="rban5" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickBan.banFive}_0.jpg"
                class="champ_icon">
            <img slot="rpick4" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickBan.pickFour}_0.jpg"
                class="champ_icon">
            <img slot="rpick5" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickBan.pickFive}_0.jpg"
                class="champ_icon">
        </pick-ban>
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

    formatDate = (date: Date | undefined) => {
        const dt = date || new Date();
        const y = dt.getUTCFullYear();
        const m = SeriesPage.months[dt.getUTCMonth()];
        const d = dt.getUTCDate();

        return `${m} ${d}, ${y}`;
    };

    static drakeIcons = {
        cloudDrake : "Cloud Drake",
        ocenDrake : "Ocean Drake",
        mountainDrake : "Mountain Drake",
        infernalDrake : "Infernal Drake",
        hextechDrake : "Hextech Drake",
        chemtechDrake : "Chemtech Drake",
        elderDrake : "Elder Drake",
    }

    static validDrakes = new Set<String>(["Cloud Drake", "Ocean Drake", "Mountain Drake", "Infernal Drake", "Hextech Drake", "Chemtech Drake"]);

    countDrakes = (objectives: Objectives) => {
        var count : number = 0;

        if (SeriesPage.validDrakes.has(objectives.firstDrake)) {
            count += 1
        }

        if (SeriesPage.validDrakes.has(objectives.secondDrake)) {
            count += 1
        }

        if (SeriesPage.validDrakes.has(objectives.thirdDrake)) {
            count += 1
        }

        if (SeriesPage.validDrakes.has(objectives.fourthDrake)) {
            count += 1
        }

        count += objectives.elderDrakes

        return `${count}`;
    }
}