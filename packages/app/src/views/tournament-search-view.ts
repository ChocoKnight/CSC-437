import { Auth, Observer } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { Tournament } from "server/models";
import reset from "../styles/reset.css";
import headings from "../styles/headings.css";

// import { formatDate } from "../utils/dates";

export class TournamentSearchView extends LitElement {
    src = "/api/tournaments";

    @state()
    tournamentIndex = new Array<Tournament>();

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
        fetch(url)
            .then((res: Response) => {
                if (res.status === 200) return res.json();
                throw `Server responded with status ${res.status}`;
            })
            .catch((err) =>
                console.log("Failed to load Tournament data:", err)
            )
            .then((json: unknown) => {
                if (json) {
                    console.log("Tournaments:", json);
                    // const { data } = json as { data: Array<Match> };
                    this.tournamentIndex = json as Array<Tournament>;
                }
            })
            .catch((err) =>
                console.log("Failed to convert tournament data:", err)
            );
    }

    render() {
        const tournamentList = this.tournamentIndex.map(this.renderItem);

        return html`
        <main class="page">
            <header>
                <h2>Tournaments</h2>
            </header>
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
                            Average Duration
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

    renderItem(tournament: Tournament) {
        const { _id, league, year, split } = tournament;
        // const { _id } = match as unknown as { _id: string };

        var tournamentName = `${league} ${split} ${year}`;
        if (split === "N/A") {
            tournamentName = `${league} ${year}`
        }
            
        return html`
            <div class="row">
                <dt>
                    <a href="/app/tournaments/${_id}">${tournamentName}</a>
                </dt>
                <dd>
                    ${_id}
                </dd>
                <dd>
                    ${year}
                </dd>
                <dd>
                    ${year}
                </dd>
                <dd>
                    ${year}
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