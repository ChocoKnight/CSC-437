import { LitElement, css, html } from "lit";
import reset from "../styles/reset.css";
import headings from "../styles/headings.css";

export class LensOfLegendsHeaderElement extends LitElement {
    render() {
        return html`
        <header>
            <div class="top_bar">
                <h1>
                    <a href="/">Lens of Legends</a>
                </h1>

                <mu-dropdown>
                    <a slot="actuator">
                        <h3 id="userid"></h3>
                    </a>

                    <menu>
                        <li class="when-signed-out">
                            <a href="/login">Sign In</a>
                        </li>

                        <li class="when-signed-in">
                            <a href="/users/">Profile</a>
                        </li>
                        <li class="when-signed-in">
                            <a id="signout">Sign Out</a>
                        </li>
                    </menu>
                </mu-dropdown>  
            </div>
            <div class="nav_bar">
                <ul>
                    <li>
                        <a href="/tournaments/tournaments.html">Tournaments</a>
                    </li>
                    <li>
                        <a href="/teams/teams.html">Teams</a>
                    </li>
                    <li>
                        <a href="/players/players.html">Players</a>
                    </li>
                    <li>
                        <a href="/champions/champions.html">Champions</a>
                    </li>
                </ul>
                <label class="light-mode-switch" autocomplete="off">
                    <input type="checkbox"/>
                    <a> Light Mode </a>
                </label>
            </div>
        </header>`;
    }

    static styles = [
        reset.styles,
        headings.styles,
        css`
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

        header h1, .nav_bar, mu-dropdown {
            padding-left: var(--size-spacing-xlarge);
            padding-right: var(--size-spacing-xlarge);
        }

        .top_bar {
            display: grid;
            grid-template-columns: 1fr 1fr;
        }

        mu-dropdown {
            justify-self: end;
            align-self: center;
        }

        a[slot="actuator"] {
            color: var(--color-link-inverted);
            cursor: pointer;
        }

        #userid:empty::before {
            content: "Summoner";
        }

        menu {
            background: var(--color-background-header);
        }

        menu a {
            color: var(--color-link);
            cursor: pointer;
            text-decoration: underline;
            text-align: right;
        }

        .nav_bar {
            background-color: var(--color-background-nav);
        }

        .nav_bar ul {
            flex-direction: row;
            padding: 0;
            margin: 0;
        }

        .nav_bar ul li {
            margin: var(--size-spacing-medium);
        }

        .search_container{
            display: flex;
            flex-direction: column;
            align-items: end;
        }

        .search_container {
            display: flex;
            align-items: right;
        }

        .search_container input[type="text"] {
            padding: 5px; 
        }

        .search_container button {
            padding: 5px 10px; /* Add padding to button */
            margin-left: var(--size-spacing-small);
        }
        `
    ] 
}