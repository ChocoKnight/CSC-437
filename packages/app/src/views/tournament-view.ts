import { Auth, Observer, View } from "@calpoly/mustang";
// import { css, html, LitElement } from "lit";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Tournament } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import reset from "../styles/reset.css";

// import { formatDate } from "../utils/dates";

export class TournamentView extends View<Model, Msg> {
    @property({ attribute: "tournament-id", reflect: true })
    tournamentId = "";

    // @state()
    // tournamentIndex = new Array<Tournament>();

    @state()
    get tournament(): Tournament | undefined {
        return this.model.tournament;
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
        if (name === "tournament-id" && old !== value && value)
            this.dispatchMessage(["tournament/select", { tournamentId: value }]);
    }

    render() {
        const { league, split, year } = this.tournament || {};
        return html`
        <main class="page">
            <header>
                <h2>Tournaments</h2>
            </header>
            <dl>
                <div class="row_header">
                    <dt>
                        <h3>
                            ${this.tournamentId}
                        </h3>
                    </dt>
                    <dd>
                        <h3>
                            ${league}
                        </h3>
                    </dd> 
                    <dd>
                        <h3>
                            ${split}
                        </h3>
                    </dd> 
                    <dd>
                        <h3>
                            ${year}
                        </h3>
                    </dd> 
                </div>
            </dl>
        </main>  
      `;
    }

    renderItem(tournament: Tournament) {
        const { league, year, split } = tournament;
        // const { _id } = match as unknown as { _id: string };

        return html`
            <div class="row">
                <dt>
                    ${league} ${split} ${year}
                </dt>
                <!-- <dd>
                    ${split} 
                    vs
                    ${split}
                </dd> -->
                <dd>
                    ${year}
                </dd>
            </div>
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