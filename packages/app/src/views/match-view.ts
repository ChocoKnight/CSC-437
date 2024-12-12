import { define, Form, View, History } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Match, Game, Objectives } from "server/models";
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
                    ${this.findWinLoss(this.game, this.match)}
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
            <div>
                <a href="/app/matches/edit/${this.matchId}">Edit</a>
            </div>
            ${gameList}
        </main>  
    `;
    }

    findObjectiveCounts(objective: Objectives) {
        var dragons: number = objective.infernalDragons + objective.mountainDragons + objective.oceanDragons + objective.cloudDragons + objective.hextechDragons + objective.chemtechDragons + objective.elderDragons
        return [objective.towers, objective.plates, objective.voidGrubs, objective.riftHearlds, objective.baronNashors, dragons]
    }

    findWinLoss(games: Game[] | undefined, match: Match | undefined) {
        var teamOne: string = ""
        if (match) {
            teamOne = match.teamOne;
        } else {
            return html`0 - 0`;
        }

        if (games) {
            var gamesPlayed = games.length
            var teamOneWins = 0;
            games.forEach((game) => {
                const { blueTeam, blueWin } = game;

                var teamOneSide: string = ""
                if (teamOne === blueTeam) {
                    teamOneSide = "Blue Side"
                } else {
                    teamOneSide = "Red Side"
                }

                if (blueWin && (teamOneSide === "Blue Side")) {
                    teamOneWins += 1;
                }
            });

            return html`
            <span>${teamOneWins} - ${gamesPlayed - teamOneWins}</span>
            `;
        } else {
            return html`0 - 0`;
        }
    }

    renderGame(game: Game, match: Match | undefined) {
        var teamOne: string = ""
        if (match) {
            teamOne = match.teamOne;
        } else {
            return html``;
        }

        const { gameName, blueTeam, bluePickBans, redPickBans, blueWin,
            blueObjectives, redObjectives, duration } = game;

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

        var teamOneObjectiveCounts = []
        var teamTwoObjectiveCounts = []
        if (teamOneSide === "Blue Side") {
            teamOneObjectiveCounts = this.findObjectiveCounts(blueObjectives)
            teamTwoObjectiveCounts = this.findObjectiveCounts(redObjectives)
        } else {
            teamOneObjectiveCounts = this.findObjectiveCounts(redObjectives)
            teamTwoObjectiveCounts = this.findObjectiveCounts(blueObjectives)
        }

        return html`
        <div class = "game">
            <h2>
                Game ${gameName[gameName.length - 1]}
            </h2>
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
                <h2>
                    Picks and Bans
                </h2>
                <div class="pick_ban">
                    <div class="blue">
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${bluePickBans.banOne}_0.jpg" class="grayscale">
                        <span></span>
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${bluePickBans.banTwo}_0.jpg" class="grayscale">
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${bluePickBans.banThree}_0.jpg" class="grayscale">
                        <span></span>
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${bluePickBans.pickOne}_0.jpg" class="champ_icon">
                        <span></span>
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${bluePickBans.pickTwo}_0.jpg" class="champ_icon">
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${bluePickBans.pickThree}_0.jpg" class="champ_icon">
                        <span></span>
                        <span></span>
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${bluePickBans.banFour}_0.jpg" class="grayscale">
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${bluePickBans.banFive}_0.jpg" class="grayscale">
                        <span></span>
                        <span></span>
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${bluePickBans.pickFour}_0.jpg" class="champ_icon">
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${bluePickBans.pickFive}_0.jpg" class="champ_icon">
                        <span></span>
                    </div>
                    <div class="red">
                        <span></span>
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickBans.banOne}_0.jpg" class="grayscale">
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickBans.banTwo}_0.jpg" class="grayscale">
                        <span></span>
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickBans.banThree}_0.jpg" class="grayscale">
                        <span></span>
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickBans.pickOne}_0.jpg" class="champ_icon">
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickBans.pickTwo}_0.jpg" class="champ_icon">
                        <span></span>
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickBans.pickThree}_0.jpg" class="champ_icon">
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickBans.banFour}_0.jpg" class="grayscale">
                        <span></span>
                        <span></span>
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickBans.banFive}_0.jpg" class="grayscale">
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickBans.pickFour}_0.jpg" class="champ_icon">
                        <span></span>
                        <span></span>
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${redPickBans.pickFive}_0.jpg" class="champ_icon">
                    </div>
                </div>
            </div>

            <div class = "objectives">
                <h2>Objectives</h2>
                <!-- <section class="objective">
                    <span>0</span>
                    <h4>Kills</h4>
                    <span>0</span>
                </section> -->

                <section class="objective">
                    <span>${teamOneObjectiveCounts[0]}</span>
                    <h4>Towers</h4>
                    <span>${teamTwoObjectiveCounts[0]}</span>
                </section>

                <section class="objective">
                    <span>${teamOneObjectiveCounts[1]}</span>
                    <h4>Plates</h4>
                    <span>${teamTwoObjectiveCounts[1]}</span>
                </section>

                <section class="objective">
                    <span>${teamOneObjectiveCounts[2]}</span>
                    <h4>Void Grubs</h4>
                    <span>${teamTwoObjectiveCounts[2]}</span>
                </section>

                <section class="objective">
                    <span>${teamOneObjectiveCounts[3]}</span>
                    <h4>Rift Heralds</h4>
                    <span>${teamTwoObjectiveCounts[3]}</span>
                </section>

                <section class="objective">
                    <span>${teamOneObjectiveCounts[4]}</span>
                    <h4>Baron Nashtors</h4>
                    <span>${teamTwoObjectiveCounts[4]}</span>
                </section>

                <section class="objective">
                    <span>${teamOneObjectiveCounts[5]}</span>
                    <h4>Drakes</h4>
                    <span>${teamTwoObjectiveCounts[5]}</span>
                </section>

                <!-- <section class="objective">
                    <span>0</span>
                    <h4>Total Gold</h4>
                    <span>0</span>
                </section> -->
            </div>
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

        .game {
            display: block; /* Ensure the rows stack vertically */
            width: 100%;
            border: solid; 
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
        }

        .objective {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            align-items: center; 
            text-align: center; 
            justify-items: center; 
        }

        .pick_ban {
            display: grid;
            grid-column: 1 / -1;
            // grid-template-columns: 1fr 1fr;
        }

        .blue, .red {
            display: grid;
            gap: var(--size-spacing-medium);
        }
        
        .blue {
            grid-template-columns: 1fr 0.25fr 1fr 1fr 0.25fr 1fr 0.25fr 1fr 1fr 0.25fr 0.25fr 1fr 1fr 0.25fr 0.25fr 1fr 1fr 0.25fr;
            background: var(--color-blueside-background)
        }
            
        .red {
            grid-template-columns: 0.25fr 1fr 1fr 0.25fr 1fr 0.25fr 1fr 1fr 0.25fr 1fr 1fr 0.25fr 0.25fr 1fr 1fr 0.25fr 0.25fr 1fr;
            background: var(--color-redside-background)
        }

        .ban, .pick {
            display: flex;
            flex-direction: row;
            gap: var(--size-spacing-large);
        }

        .grayscale {
            filter: grayscale(80%) !important;
            /* transition: filter 0.3s ease; */
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

export class MatchEdit extends View<Model, Msg> {
    static uses = define({
        "mu-form": Form.Element,
    });

    @property({ attribute: "match-id", reflect: true })
    matchId = "";

    @state()
    get match(): Match | undefined {
        return this.model.match;
    }

    constructor() {
        super("lol:model");
    }

    render() {
        return html`
          <main class="page">
                <mu-form
                    .init=${this.match}
                    @mu-form:submit=${this._handleSubmit}>
                    <label>
                        <span>Team One</span>
                        <input name="teamOne" />
                    </label>
                    <label>
                        <span>Team Two</span>
                        <input name="teamTwo" />
                    </label>
                    <label>
                        <span>patch</span>
                        <input name="patch" />
                    </label>
                    <label>
                        <span>date</span>
                        <input name="date" />
                    </label>
                </mu-form>
          </main>`;
    }

    _handleSubmit(event: Form.SubmitEvent<Match>) {
        this.dispatchMessage([
            "match/save",
            {
                matchId: this.matchId,
                match: event.detail,
                onSuccess: () =>
                    History.dispatch(this, "history/navigate", {
                        href: `/app/matches/${this.matchId} `
                    }),
                onFailure: (error: Error) =>
                    console.log("ERROR:", error)
            }
        ]);
    }
}