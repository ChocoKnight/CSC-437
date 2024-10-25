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
            </div>
        </header>
    </template>
    `;

    // <nav>
    //             <p><slot> Unnamed Tour </slot></p>
    //             <mu-dropdown>
    //             <menu>
    //                 <li>Hello, traveler</li>
    //                 <li>
    //                 <label class="dark-mode-switch">
    //                     <input type="checkbox" />
    //                     Dark Mode
    //                 </label>
    //                 </li>
    //             </menu>
    //             </mu-dropdown>
    //         </nav>

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

    // nav {
    //     display: flex;
    //     flex-direction: column;
    //     flex-basis: max-content;
    //     align-items: end;
    // }
    `;

    constructor() {
        super();
        shadow(this)
            .template(HeaderElement.template)
            .styles(HeaderElement.styles, reset.styles, header.styles);

        // const dm = this.shadowRoot.querySelector(
        //     ".dark-mode-switch"
        // );

        // dm.addEventListener("click", (event) =>
        //     Events.relay(event, "dark-mode", {
        //         checked: event.target.checked
        //     })
        // );
    }

    // static initializeOnce() {
    //     function toggleDarkMode(page, checked) {
    //         page.classList.toggle("dark-mode", checked);
    //     }

    //     document.body.addEventListener("dark-mode", (event) =>
    //         toggleDarkMode(event.currentTarget, event.detail.checked)
    //     );
    // }
}