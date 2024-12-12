import { Auth, Observer } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { Player } from "server/models";
import reset from "../styles/reset.css";

// import { formatDate } from "../utils/dates";

export class PlayerSearchView extends LitElement {
    src = "/api/players";

    @state()
    playerIndex = new Array<Player>();

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
                console.log("Failed to load Player data:", err)
            )
            .then((json: unknown) => {
                if (json) {
                    console.log("Players:", json);
                    this.playerIndex = json as Array<Player>;
                }
            })
            .catch((err) =>
                console.log("Failed to convert tournament data:", err)
            );
    }

    render() {
        const playerList = this.playerIndex.map(this.renderItem);

        return html`
        <main class="page">
            <header>
                <h2>Players</h2>
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
                            Win Rate 
                        </h3>
                    </dd>
                    <dd>
                        <h3>
                            KDA
                        </h3>
                    </dd>
                    <dd>
                        <h3>
                            Average Kills
                        </h3>
                    </dd>
                    <dd>
                        <h3>
                            Average Deaths
                        </h3>
                    </dd>
                    <dd>
                        <h3>
                            Average Assists
                        </h3>
                    </dd>
                    <dd>
                        <h3>
                            KP%
                        </h3>
                    </dd>
                    <dd>
                        <h3>
                            Damage %
                        </h3>
                    </dd>
                </div>
                ${playerList}
            </dl>
        </main>
      `;
    }

    renderItem(player: Player) {
        const { name, year } = player;
        // const { _id } = match as unknown as { _id: string };
            
        return html`
            <div class="row">
                <dt>
                    ${name}
                </dt>
                <dd>
                    ${year}
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