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

export class TournamentSearchView extends View<Model, Msg> {
    @property({ attribute: "tournament-id", reflect: true })
    tournamentId = "nothing";

    @state()
    get tournaments(): Tournament[] | undefined {
        return this.model.tournaments;
    }

    set tournaments(tournaments: Tournament[] | undefined) {
        this.model.tournaments = tournaments;
        this.requestUpdate();
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
            this.dispatchMessage(["tournaments/select", {}]);
            this.dispatchMessage(["matches/select", {}]);
        }
    }

    render() {
        // const tournamentList = this.tournaments.map(this.renderItem);
        // var tournamentList = [html``];
        // if (this.tournaments) {
        //     tournamentList = this.tournaments.map(this.renderItem);
        // }

        var tournamentList = undefined;
        if (this.match && this.tournaments) {
            tournamentList = this.tournaments.map((tournament) => this.renderItem(tournament, this.match));
        } else {
            tournamentList = html``;
        }

        return html`
        <main class="page">
            <header>
                <h2>Tournaments</h2>
            </header>
                <dl>
                    <div class="row">
                        <dt>
                            Year
                        </dt>
                        <dd>
                            <button @click="${() => this.queryYear(2024, this.tournaments)}">2024</button>
                        </dd>
                        <dd>
                            <button @click="${() => this.queryYear(2025, this.tournaments)}">2025</button>
                        </dd>
                    </div>
                    <div class="row">
                        <dt>
                            Split
                        </dt>
                        <dd>
                            <button @click="${() => this.querySplit("First", this.tournaments)}">First</button> 
                        </dd>
                        <dd>
                            <button @click="${() => this.querySplit("Second", this.tournaments)}">Second</button> 
                        </dd>
                        <dd>
                            <button @click="${() => this.querySplit("Other", this.tournaments)}">Other</button> 
                        </dd>
                    </div>
                    <div class="row">
                        <dt>
                        <button @click="${() => this.reset()}">Reset</button>
                        </dt>
                    </div>
                </dl>
            <dl>
                <div class="row_header">
                    <dt>
                        <h3>
                            Name
                        </h3>
                    </dt>
                    <dd>
                        <h3>
                            Number of Games
                        </h3>
                    </dd>
                    <dd>
                        <h3>
                            First Game
                        </h3>
                    </dd>
                    <dd>
                        <h3>
                            Last Game
                        </h3>
                    </dd>
                </div>
                ${tournamentList}
            </dl>
        </main>
      `;
    }

    queryYear(year: number, tournaments: Tournament[] | undefined) {
        console.log("query year");
        if (tournaments) {
            // Filter tournaments based on the year
            const filteredTournaments = tournaments.filter((tournament) => tournament.year === year);
            // Set the filtered tournaments using the setter
            this.tournaments = filteredTournaments;
        }
    }

    querySplit(split: String, tournaments: Tournament[] | undefined) {
        console.log("query year");
        if (tournaments) {
            var filteredTournaments = tournaments
            if (split === "First") {
                filteredTournaments = tournaments.filter((tournament) => (tournament.split === "Spring" || tournament.split === "Split 1" || tournament.split === "Champ 1" || tournament.split === "Opening"));
            } else if (split === "Second") {
                filteredTournaments = tournaments.filter((tournament) => (tournament.split === "Summer" || tournament.split === "Split 2" || tournament.split === "Champ 2" || tournament.split === "Closing"));
            } else {
                filteredTournaments = tournaments.filter((tournament) => (tournament.split === "N/A" || tournament.split === "BLX Masters" || tournament.split === "Finals" || tournament.split === "Split 3"));
            }

            this.tournaments = filteredTournaments;
        }
    }

    reset() {
        if (this.tournamentId === "") {
            this.tournamentId = "nothing"
        } else {
            this.tournamentId = ""
        }
    }

    renderItem(tournament: Tournament, matches: Match[] | undefined) {
        const { _id, league, year, split } = tournament;
        // const { _id } = match as unknown as { _id: string };

        const tournamentName = split === "N/A" ? `${league} ${year}` : `${league} ${year} ${split}`;

        var filteredMatches = []
        if (matches) {
            filteredMatches = matches.filter(match => match.tournamentName.trim().toLowerCase() === tournamentName.trim().toLowerCase());
            filteredMatches.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            return html`
                <div class="row">
                    <dt>
                        <a href="/app/tournaments/${_id}">${tournamentName}</a>
                    </dt>
                    <dd>
                        ${filteredMatches.length}
                    </dd>
                    <dd>
                        ${formatDate(filteredMatches[0].date)}
                    </dd>
                    <dd>
                        ${formatDate(filteredMatches[filteredMatches.length - 1].date)}
                    </dd>
                </div>
            `;
        }
        return html`
            <div class="row">
                <dt>
                    <a href="/app/tournaments/${_id}">${tournamentName}</a>
                </dt>
                <dd>
                    ${filteredMatches.length}
                </dd>
                <dd>
                    "N/A"
                </dd>
                <dd>
                    "N/A"
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