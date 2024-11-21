import { Auth, Observer } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { state } from "lit/decorators.js";
// import { Match } from "server/models";
import { Match } from "../../../server/src/models";
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
        fetch(url, {
            headers: Auth.headers(this._user)
        })
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
                    const { data } = json as { data: Array<Match> };
                    this.matchIndex = data;
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
          <dl>${matchList}</dl>
        </main>
      `;
    }

    renderItem(match: Match) {
        const { tournamentName, date, teamOne, teamTwo } = match;
        const { _id } = match as unknown as { _id: string };

        return html`
            <dt>
                ${tournamentName}
            </dt>
            <dt>
                <a href="/app/tour/${_id}">
                    ${teamOne} 
                    vs
                    ${teamTwo}
                </a> 
            </dt>
            <dt>
              <time>
                ${formatDate(date)}
              </time>
            </dt>
          `;
    }

    static styles = [
        reset.styles,
        css`
          :host {
            display: contents;
            padding-left: var(--size-spacing-xlarge);
            padding-right: var(--size-spacing-xlarge);
          }
        `
    ];
}