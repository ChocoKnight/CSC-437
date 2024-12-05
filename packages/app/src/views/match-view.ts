// import { define, View } from "@calpoly/mustang";
import { View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Match } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import reset from "../styles/reset.css";

import { formatDate } from "../utils/dates";

export class MatchView extends View<Model, Msg> {
    @property({ attribute: "match-id", reflect: true })
    matchId = "";

    @state()
    get match(): Match | undefined {
        return this.model.match;
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
        const { matchId, teamOne, teamTwo, tournamentName, date, patch } = this.match || {};

        return html`
        <main class="page">
            <header>
                <h2>Match</h2>
            </header>
            ${matchId}
            ${teamOne}
            ${teamTwo}
            ${tournamentName}
            ${formatDate(date)}
            ${patch}
        </main>  
    `;
    }

    static styles = [
        reset.styles,
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