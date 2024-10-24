import { css, define, html, shadow, Dropdown, Events } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class HeaderElement extends HTMLElement {
    static uses = define({
        "mu-dropdown": Dropdown.Element
    });

    static template = html`
    <template>
        <header>
            <h1>Lens of Legends</h1>
            <div class="nav_bar">
                <a href="tournaments/tournaments.html">Tournaments</a>
                <a href="teams/teams.html">Teams</a>
                <a href="players/players.html">Players</a>
                <a href="champions/champions.html">Champions</a>
            </div>
            <nav>
                <p><slot> Unnamed Tour </slot></p>
                <mu-dropdown>
                <menu>
                    <li>Hello, traveler</li>
                    <li>
                    <label class="dark-mode-switch">
                        <input type="checkbox" />
                        Dark Mode
                    </label>
                    </li>
                </menu>
                </mu-dropdown>
            </nav>
        </header>
    </template>
    `;

    static styles = css`
    :host {
      display: grid;
      grid-column: 1 / -1;
    }

    nav {
      display: flex;
      flex-direction: column;
      flex-basis: max-content;
      align-items: end;
    }   

    `;

    constructor() {
        super();
        shadow(this)
            .template(HeaderElement.template)
            .styles(HeaderElement.styles, reset.styles);
        const dm = this.shadowRoot.querySelector(
            ".dark-mode-switch"
        );

        dm.addEventListener("click", (event) =>
            Events.relay(event, "dark-mode", {
                checked: event.target.checked
            })
        );
    }

    static initializeOnce() {
        function toggleDarkMode(page, checked) {
            page.classList.toggle("dark-mode", checked);
        }

        document.body.addEventListener("dark-mode", (event) =>
            toggleDarkMode(event.currentTarget, event.detail.checked)
        );
    }

}