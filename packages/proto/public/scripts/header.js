import { css, define, html, shadow, Dropdown, Events } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import header from "./styles/header.css.js";

export class HeaderElement extends HTMLElement {
    static uses = define({
        "mu-dropdown": Dropdown.Element
    });

    static template = html`
    <template>
        <header>
            <div>
                <h1>
                    <a href="/packages/proto/public/index.html">Lens of Legends</a>
                </h1>
            </div>
            <div class="nav_bar">
                <ul>
                    <li>
                        <a href="/packages/proto/public/tournaments/tournaments.html">Tournaments</a>
                    </li>
                    <li>
                        <a href="/packages/proto/public/teams/teams.html">Teams</a>
                    </li>
                    <li>
                        <a href="/packages/proto/public/players/players.html">Players</a>
                    </li>
                    <li>
                        <a href="/packages/proto/public/champions/champions.html">Champions</a>
                    </li>
                </ul>
                <div class="search_container">
                    <form action="/search" method="get">
                        <input type="text" placeholder="Search..." name="search">
                        <button type="submit">Search</button>
                    </form>
                </div>
            </div>
        </header>
    </template>
    `;

    static styles = css`
    :host {
        display: grid;
        position: sticky;
        top: 0;
        grid-column: 1 / -1;
    }

    header {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: bottom;
        justify-content: space-between;
        padding: var(--size-spacing-medium);
        background-color: var(--color-background-header);
        color: var(--color-text-inverted);
        width: auto;
        padding: 0;
    }

    header h1, .nav_bar {
        padding-left: var(--size-spacing-xlarge);
        padding-right: var(--size-spacing-xlarge);
    }

    .nav_bar {
        background-color: var(--color-background-nav);
    }

    .search_container{
        display: flex;
        flex-direction: column;
        align-items: end;
    }

    .nav_bar ul {
        flex-direction: row;
        padding: 0;
        margin: 0;
    }

    .nav_bar ul li {
        margin: var(--size-spacing-medium);
    }

    .search_container {
        display: flex;
        align-items: right; /* Center the search input and button */
    }

    .search_container input[type="text"] {
        padding: 5px; 
    }

    .search_container button {
        padding: 5px 10px; /* Add padding to button */
        margin-left: var(--size-spacing-small);
    }
    `;

    constructor() {
        super();
        shadow(this)
            .template(HeaderElement.template)
            .styles(HeaderElement.styles, reset.styles, header.styles);
    }
}