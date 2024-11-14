import { css, define, html, shadow, Dropdown, Events, Observer } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import header from "./styles/header.css.js";

export class HeaderElement extends HTMLElement {
    static uses = define({
        "mu-dropdown": Dropdown.Element
    });

    static template = html`
    <template>
        <header>
            <div class="top_bar">
                <h1>
                    <a href="/">Lens of Legends</a>
                </h1>

                <a slot="actuator">
                    Hello,
                    <span id="userid"></span>
                </a>
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
                <div class="search_container">
                    <form action="/search" method="get">
                        <input type="text" placeholder="Search..." name="search">
                        <button type="submit">Search</button>
                    </form>
                </div>
                <label class="light-mode-switch" autocomplete="off">
                    <input type="checkbox"/>
                    <a> Light Mode </a>
                </label>
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

    .top_bar {
        display: grid;
        grid-template-columns: 1fr 1fr;
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

    get userid() {
        return this._userid.textContent;
    }

    set userid(id) {
        if (id === "anonymous") {
            this._userid.textContent = "";
            this._signout.disabled = true;
        } else {
            this._userid.textContent = id;
            this._signout.disabled = false;
        }
    }

    constructor() {
        super();
        shadow(this)
            .template(HeaderElement.template)
            .styles(HeaderElement.styles, reset.styles, header.styles);

        const light_mode = this.shadowRoot.querySelector(
            ".light-mode-switch"
        );

        light_mode.addEventListener("change", (event) =>
            Events.relay(event, "light-mode", {
                checked: event.target.checked
            })
        );

        this._userid = this.shadowRoot.querySelector("#userid");

        this._signout = this.shadowRoot.querySelector("#signout");

        this._signout.addEventListener("click", (event) =>
            Events.relay(event, "auth:message", ["auth/signout"])
        );
    }

    _authObserver = new Observer(this, "lol:auth");

    get authorization() {
        return (
            this._user?.authenticated && {
                Authorization: `Bearer ${this._user.token}`
            }
        );
    }

    connectedCallback() {
        this._authObserver.observe(({ user }) => {
            if (user && user.username !== this.userid) {
                this.userid = user.username;
            }
        });
    }

    static initializeOnce() {
        function toggleLightMode(page, checked) {
            page.classList.toggle("light-mode", checked);
        }

        document.body.addEventListener("light-mode", (event) =>
            toggleLightMode(event.currentTarget, event.detail.checked)
        );
    }
}