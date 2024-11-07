import { css, html } from "@calpoly/mustang/server";
import { Series, Game, PickBans } from "../models";
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

    formatDate = (date: Date | undefined) => {
        const dt = date || new Date();
        const y = dt.getUTCFullYear();
        const m = SeriesPage.months[dt.getUTCMonth()];
        const d = dt.getUTCDate();

        return `${m} ${d}, ${y}`;
    };

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

    renderGame(game: Game, teamOne: string, teamTwo: string, game_number: number) {
        const {
            blueTeam, redTeam, pickBans, blueWin, blueFirstBlood, blueFirstTower, blueHerald, blueGrubs, redGrubs,
            blueTowers, blueTopPlates, blueMidPlates, blueBotPlates, blueBarons, blueCloudDrakes, blueOceanDrakes, blueMountainDrakes, blueInfernalDrakes, blueHextechDrakes, blueChemtechDrakes, blueElderDrakes,
            redTowers, redTopPlates, redMidPlates, redBotPlates, redBarons, redCloudDrakes, redOceanDrakes, redMountainDrakes, redInfernalDrakes, redHextechDrakes, redChemtechDrakes, redElderDrakes,
            duration
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

    renderPickBan(pickban: PickBans) {
        const {
            blueBanOne, blueBanTwo, blueBanThree, blueBanFour, blueBanFive,
            bluePickOne, bluePickTwo, bluePickThree, bluePickFour, bluePickFive,
            redBanOne, redBanTwo, redBanThree, redBanFour, redBanFive,
            redPickOne, redPickTwo, redPickThree, redPickFour, redPickFive,
        } = pickban;

        return html`
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