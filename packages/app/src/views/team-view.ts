// import { define, View } from "@calpoly/mustang";
import { View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Team } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import reset from "../styles/reset.css";
import headings from "../styles/headings.css";

// import { formatDate } from "../utils/dates";

export class TeamView extends View<Model, Msg> {
    @property({ attribute: "team-id", reflect: true })
    teamId = "";

    @state()
    get team(): Team | undefined {
        return this.model.team;
    }

    constructor() {
        super("lol:model");
    }

    attributeChangedCallback(name: string, old: string | null, value: string | null) {
        super.attributeChangedCallback(name, old, value);
        if (name === "team-id" && old !== value && value) {
            this.dispatchMessage(["teams/select", { teamId: value }]);
        }
    }

    render() {
        const { name, year } = this.team || {};

        return html`
        <main class="page">
            <h2>
                ${name}
            </h2>
            <h2>
                ${year}
            </h2>
        </main>  
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
            filter: grayscale(50%) !important;
            transition: filter 0.3s ease;
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