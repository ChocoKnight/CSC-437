// import { define, View } from "@calpoly/mustang";
import { View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Match, Game, Objectives, PickBan } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import reset from "../styles/reset.css";
import headings from "../styles/headings.css";

import { formatDate } from "../utils/dates";

export class MatchView extends View<Model, Msg> {
    @property({ attribute: "match-id", reflect: true })
    matchId = "";

    @state()
    get match(): Match | undefined {
        return this.model.match;
    }

    @state()
    get game(): Game[] | undefined {
        return this.model.games;
    }

    constructor() {
        super("lol:model");
    }

    attributeChangedCallback(name: string, old: string | null, value: string | null) {
        super.attributeChangedCallback(name, old, value);
        if (name === "match-id" && old !== value && value) {
            this.dispatchMessage(["match/select", { matchId: value }]);
        }
    }

    render() {
        const { teamOne, teamTwo, tournamentName, date, patch } = this.match || {};

        // console.log("match - ", this.match)
        // console.log("games - ", this.game)

        var gameList = undefined;
        if (this.match && this.game) {
            gameList = this.game.map((game) => this.renderGame(game, this.match));
        } else {
            gameList = html``;
        }

        return html`
        <main class="page">
            <div class="match_overview">
                <h2>
                    <a href="">${teamOne}</a>
                </h2>
                <h2>
                    <span>0-0</span>
                </h2>
                <h2>
                    <a href="">${teamTwo}</a>
                </h2>
            </div>
            <div>
                <a href="">${tournamentName}</a>
            </div>
            <div>
                <span>Patch - ${patch}</span>
            </div>
            <div>
                <span>${formatDate(date)}</span>
            </div>
            ${gameList}
        </main>  
    `;
    }

    renderGame(game: Game, match: Match | undefined) {
        var teamOne: string = ""
        if (match) {
            teamOne = match.teamOne;
        } else {
            return html``;
        }

        const { blueTeam, redTeam, bluePickBans, redPickBans, blueWin,
            blueFirstBlood, blueFirstTower, blueObjectives, redObjectives, duration } = game;

        var teamOneSide: string = ""
        var teamTwoSide: string = ""
        if (teamOne === blueTeam) {
            teamOneSide = "Blue Side"
            teamTwoSide = "Red Side"
        } else {
            teamOneSide = "Red Side"
            teamTwoSide = "Blue Side"
        }

        var score: string = "";
        if (blueWin && (teamOneSide === "Blue Side")) {
            score = "W - L"
        } else {
            score = "L - W"
        }

        var minutes = Math.floor(duration / 60);
        var seconds = "";
        if (duration % 60 < 10) {
            seconds = `0${duration % 60}`;
        } else {
            seconds = `${duration % 60}`;
        }

        return html`
            <div class="game_overview">
                <span>
                    ${teamOneSide}
                </span>
                <h4>
                    ${score}
                </h4>
                <span>
                    ${teamTwoSide}
                </span>
            </div>
            <div>
                <slot class="middle" name="duration">
                    <span>${minutes}:${seconds}</span>
                </slot>
            </div>

            <div class = "objectives">
                <h2>Objectives</h2>
                <section class="objective">
                    <span>0</span>
                    <h4>Kills</h4>
                    <span>0</span>
                </section>

                <section class="objective">
                    <span>0</span>
                    </slot>
                    <h4>Towers</h4>
                    <span>0</span>
                </section>

                <section class="objective">
                    <span>0</span>
                    <h4>Void Grubs</h4>
                    <span>0</span>
                </section>

                <section class="objective">
                    <span>0</span>
                    <h4>Rift Heralds</h4>
                    <span>0</span>
                </section>

                <section class="objective">
                    <span>0</span>
                    <h4>Baron Nashtors</h4>
                    <span>0</span>
                </section>

                <section class="objective">
                    <span>0</span>
                    <h4>Drakes</h4>
                    <span>0</span>
                </section>

                <section class="objective">
                    <span>0</span>
                    <h4>Total Gold</h4>
                    <span>0</span>
                </section>
            </div>
          `;
    }

    static styles = [
        reset.styles,
        headings.styles,
        css`
        :host {
            display: grid;
            grid-column: 1 / -1;
        }

        .page {
            padding-top: var(--size-spacing-medium);
            padding-left: var(--size-spacing-xlarge);
            padding-right: var(--size-spacing-xlarge);
            align-items: center;
        }

        dl {
            display: block; /* Ensure the rows stack vertically */
            width: 100%;
            border: solid;
        }

        .row_header {
            color: var(--color-text-important);
            /* border: solid; */
        }

        .row_header, .row {
            display: flex; /* Use flexbox for the layout */
            justify-content: space-evenly; /* Evenly distribute the space */
            align-items: center; /* Align items vertically */
            margin-bottom: 10px;
        }
        
        dt, dd {
            flex: 1;
            margin-left: var(--size-spacing-medium);
            margin-right: var(--size-spacing-medium);
        }

        .match_overview {
            display: grid;
            grid-template-columns: 1fr 0.25fr 1fr;
            align-items: center; 
            justify-items: center; 
        }

        .game_overview {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            align-items: center; 
            justify-items: center; 
        }
        
        .middle {
            display: grid;
            grid-column: 1 / -1;
            align-items: center; 
            justify-items: center; 
        }

        .objectives {
            display: grid;
            grid-column: 1 / -1;
            gap: 10px; /* Adds spacing between elements */
        }

        .objective {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            align-items: center; 
            text-align: center; 
            justify-items: center; 
        }

        h2 {
            padding-bottom: var(--size-spacing-large);
        }

        div {
            display: flex;
            flex-direction: row;
            align-items: center;
            text-align: center;
            justify-content: center;
            padding: var(--size-spacing-medium); 
        }
        `
    ];
}