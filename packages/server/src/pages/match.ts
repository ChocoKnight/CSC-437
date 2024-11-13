import { css, html } from "@calpoly/mustang/server";
import { Match, Game, PickBan, Objectives} from "../models";
import renderPage from "./renderPage"; // generic page renderer

export class MatchPage {
    data: Match;

    constructor(data: Match) {
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
        const { tournamentName, date, teamOne, teamTwo, games } = this.data;

        var game_num: number = 1;
        const gameList = games.map((game) =>
            this.renderGame(game, teamOne, teamTwo, game_num),
            game_num += 1
        );

        const { matchId } = this.data;
        const api = `/api/matches/${matchId}`;

        // <a slot="teamOne" href="">${teamOne}</a>
        // <a slot="teamTwo" href="">${teamTwo}</a>
        // <a slot="tournamentName" href="../tournaments/${tournamentName.replace(/\s+/g, '').toLowerCase()}.html">${tournamentName}</a>
        // <span slot="score" href="">0-0</span>
        // <span slot="date">${this.formatDate(date)}</span>      

        return html`
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

    renderPickBan(bluePickBans: PickBan, redPickBans: PickBan ) {
        const {
            banOne, banTwo, banThree, banFour, banFive, pickOne, pickTwo, pickThree, pickFour, pickFive 
        } = bluePickBans;

        const { matchId } = this.data;
        const api = `/api/match/${matchId}`;

        return html` 
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
    }

    formatDuration = (duration : number) => {
        const minutesString = String(Math.floor(duration / 60)).padStart(2, '0');
        const secondsString = String(duration % 60).padStart(2, '0');

        return `${minutesString}:${secondsString}`;
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
        const m = MatchPage.months[dt.getUTCMonth()];
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

    static validDrakes = new Set<String>(["Cloud", "Ocean", "Mountain", "Infernal", "Hextech", "Chemtech", "Elder"]);

    countDrakes = (objectives: Objectives) => {
        var count : number = 0;

        if (MatchPage.validDrakes.has(objectives.firstDrake)) {
            count += 1
        }

        if (MatchPage.validDrakes.has(objectives.secondDrake)) {
            count += 1
        }

        if (MatchPage.validDrakes.has(objectives.thirdDrake)) {
            count += 1
        }

        if (MatchPage.validDrakes.has(objectives.fourthDrake)) {
            count += 1
        }

        count += objectives.elderDrakes

        return `${count}`;
    }
}