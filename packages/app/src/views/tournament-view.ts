import { Auth, Observer, View } from "@calpoly/mustang";
// import { css, html, LitElement } from "lit";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Tournament, Match } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import reset from "../styles/reset.css";
import headings from "../styles/headings.css";

import { formatDate } from "../utils/dates";

export class TournamentView extends View<Model, Msg> {
    @property({ attribute: "tournament-id", reflect: true })
    tournamentId = "";

    @state()
    get tournament(): Tournament | undefined {
        return this.model.tournament;
    }

    @state()
    get match(): Match[] | undefined {
        return this.model.matches;
    }

    _authObserver = new Observer<Auth.Model>(
        this,
        "lol:auth"
    );

    _user = new Auth.User();

    constructor() {
        super("lol:model");
    }

    attributeChangedCallback(name: string, old: string | null, value: string | null) {
        super.attributeChangedCallback(name, old, value);
        if (name === "tournament-id" && old !== value && value) {
            this.dispatchMessage(["tournament/select", { tournamentId: value }]);
        }
    }

    render() {
        const { league, split, year } = this.tournament || {};

        var matchList = undefined;
        var numMatches = 0
        if (this.match === undefined) {
            matchList = [].map(this.renderItem);
        } else {
            this.match.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            matchList = this.match.map(this.renderItem);

            numMatches = this.match.length
        }

        var tournamentName: string = "";
        if (split === "N/A") {
            tournamentName = `${league} ${year}`;
        } else {
            tournamentName = `${league} ${year} ${split}`;
        }

        return html`
        <main class="page">
            <header>
                <h2>${tournamentName}</h2>
            </header>
            <dl>
                <div class="row">
                    <dt>
                        <h3>Number of Matches</h3>
                    </dt>
                    <dd>
                        ${numMatches}
                    </dd>
                </div>
            </dl>
            <header>
                <h2>Match List</h2>
            </header>
            <dl>
                <div class="row_header">
                    <dt>
                        <h3>
                            Match
                        </h3>
                    </dt>
                    <dd>
                        <h3>
                            Games Played
                        </h3>
                    </dd> 
                    <dd>
                        <h3>
                            Date
                        </h3>
                    </dd> 
                    <dd>
                        <h3>
                            Patch
                        </h3>
                    </dd> 
                </div>
                ${matchList}
            </dl>
        </main>  
      `;
    }

    renderItem(match: Match) {
        const { date, teamOne, teamTwo, games, patch, _id } = match;

        return html`
            <div class="row">
                <dt>
                    <a href="/app/matches/${_id}">
                        ${teamOne} 
                        vs
                        ${teamTwo}
                    </a> 
                </dt>
                <dd>
                    ${games.length}
                </dd>
                <dd>
                    <time>
                        ${formatDate(date)}
                    </time>
                </dd>
                <dd>
                    ${patch}
                </dd>
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
        `
    ];
}