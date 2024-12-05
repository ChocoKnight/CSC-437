import { Auth, define, Dropdown, Events, Observer } from "@calpoly/mustang";
import { LitElement, css, html } from "lit";
import reset from "../styles/reset.css";
import headings from "../styles/headings.css";

function toggleLightMode(ev: InputEvent) {
    const target = ev.target as HTMLInputElement;
    const checked = target.checked;

    Events.relay(ev, "light-mode", { checked });
}

function signOut(ev: MouseEvent) {
    Events.relay(ev, "auth:message", ["auth/signout"]);
}

export class MatchViewElement extends LitElement {
    static uses = define({
        "drop-down": Dropdown.Element
    });

    render() {
        return html`
        <header>
            <div class="top_bar">
                <h1>
                    <a href="/">Lens of Legends</a>
                </h1>

                <drop-down>
                    <a slot="actuator">
                        <h3 id="userid"></h3>
                    </a>

                    <menu>
                        <li class="when-signed-out">
                            <a href="/app/login">Sign In</a>
                        </li>

                        <li class="when-signed-in">
                            <a href="/app/users/">Profile</a>
                        </li>
                        <li class="when-signed-in">
                            <a id="signout" @click=${signOut}>Sign Out</a>
                        </li>
                    </menu>
                </drop-down>
            </div>
            <div class="nav_bar">
                <ul>
                    <li>
                        <a href="/app/tournaments">Tournaments</a>
                    </li>
                    <li>
                        <a href="/app/teams">Teams</a>
                    </li>
                    <li>
                        <a href="/app/players">Players</a>
                    </li>
                    <li>
                        <a href="/app/champions">Champions</a>
                    </li>
                </ul>

                <label @change=${toggleLightMode}>
                    <input type="checkbox" autocomplete="off" />
                    Light Mode
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

        header h1, .nav_bar, drop-down {
            padding-left: var(--size-spacing-xlarge);
            padding-right: var(--size-spacing-xlarge);
        }

        .top_bar {
            display: grid;
            grid-template-columns: 1fr 1fr;
        }

        drop-down {
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

    _authObserver = new Observer(this, "lol:auth");

    _user = new Auth.User();

    // get authorization() {
    //     return (
    //         this._user?.authenticated && {
    //             Authorization: `Bearer ${this._user.token}`
    //         }
    //     );
    // }

    // connectedCallback() {
    //     super.connectedCallback();

    //     this._authObserver.observe(({ user }) => {
    //         if (user && user.username !== this.userid) {
    //             this.userid = user.username;
    //         }
    //     });
    // }

    static initializeOnce() {
        function toggleLightMode(page: HTMLElement, checked: boolean) {
            page.classList.toggle("light-mode", checked);
        }

        document.body.addEventListener("light-mode", (event) =>
            toggleLightMode(
                event.currentTarget as HTMLElement,
                (event as CustomEvent).detail?.checked)
        );
    }
}