import { css, define, html, shadow, Dropdown, Events } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import header from "./styles/header.css.js";

export class GameHeaderElement extends HTMLElement {
    get src() {
        return this.getAttribute("src");
    }

    static template = html`
    <template>
        <div class="game_overview">
            <h2>
                <slot name="teamOne">
                    <a href="">Team One</a>
                </slot>
            </h2>
            <h2>
                <slot name="score">
                    <span>0-0</a>
                </slot>
            </h2>
            <h2>
                <slot name="teamTwo">
                    <a href="">Team Two</a>
                </slot>
            </h2>
        </div>
        <div>
            <slot name="tournamentName">
                <a href="../">Tournament</a>
            </slot>
        </div>
        <div>
            <slot name="date">
                <span>January 1, 2000 00:00 PST<span>
            </slot>
        </div>
    </template>
    `;

    static styles = css`
    :host {
        display: grid;
        grid-column: 1 / -1;
    }

    .game_overview {
        display: grid;
        grid-template-columns: 1fr 0.25fr 1fr;
        align-items: center; 
        justify-items: center; 
    }      

    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: var(--size-spacing-medium); 
    }
    `;

    constructor() {
        super();
        shadow(this)
            .template(GameHeaderElement.template)
            .styles(GameHeaderElement.styles, reset.styles, header.styles);
    }

    connectedCallback() {
        if (this.src) this.hydrate(this.src);
    }

    hydrate(url) {
        fetch(url)
            .then((res) => {
                if (res.status !== 200) throw `Status: ${res.status}`;
                return res.json();
            })
            .then((json) => this.renderSlots(json))
            .catch((error) =>
                console.log(`Failed to render data ${url}:`, error)
            );
    }

    renderSlots(json) {
        const entries = Object.entries(json);
        const toSlot = ([key, value]) =>
            html`<span slot="${key}">${value}</span>`
        const fragment = entries.map(toSlot);
        this.replaceChildren(...fragment);
    }
}