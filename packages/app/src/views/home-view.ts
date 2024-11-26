import { Auth, Observer } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { Match } from "server/models";
import reset from "../styles/reset.css";

import { formatDate } from "../utils/dates";

export class HomeViewElement extends LitElement {
    src = "/api/matches";

    @state()
    matchIndex = new Array<Match>();

    _authObserver = new Observer<Auth.Model>(
        this,
        "lol:auth"
    );

    _user = new Auth.User();

    connectedCallback() {
        super.connectedCallback();
        this._authObserver.observe(({ user }) => {
            if (user) {
                this._user = user;
            }
            this.hydrate(this.src);
        });
    }

    hydrate(url: string) {
        // fetch(url, {
        //     headers: Auth.headers(this._user)
        // })
        fetch(url)
            .then((res: Response) => {
                if (res.status === 200) return res.json();
                throw `Server responded with status ${res.status}`;
            })
            .catch((err) =>
                console.log("Failed to load match data:", err)
            )
            .then((json: unknown) => {
                if (json) {
                    console.log("Matches:", json);
                    // const { data } = json as { data: Array<Match> };
                    this.matchIndex = json as Array<Match>;
                }
            })
            .catch((err) =>
                console.log("Failed to convert match data:", err)
            );
    }

    render() {
        const matchList = this.matchIndex.map(this.renderItem);

        return html`
        <main class="page">
            <header>
                <h2>Recent Matches</h2>
            </header>
            <dl>
                <div class="row_header">
                    <dt>
                        <h3>
                            Tournament
                        </h3>
                    </dt>
                    <dd>
                        <h3>
                            Match
                        </h3>
                    </dd>
                    <dd>
                        <h3>
                            Date
                        </h3>
                    </dd>
                </div>
                ${matchList}
            </dl>
        </main>
      `;
    }

    renderItem(match: Match) {
        const { tournamentName, date, teamOne, teamTwo } = match;
        // const { _id } = match as unknown as { _id: string };

        return html`
            <div class="row">
                <dt>
                    ${tournamentName}
                </dt>
                <dd>
                    ${teamOne} 
                    vs
                    ${teamTwo}
                </dd>
                <dd>
                <time>
                    ${formatDate(date)}
                </time>
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