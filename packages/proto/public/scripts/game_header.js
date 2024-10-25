import { css, define, html, shadow, Dropdown, Events } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import header from "./styles/header.css.js";

export class GameHeaderElement extends HTMLElement {
    static template = html`
    <template>
        <div class="game_overview">
            <h2>
                <slot name="team_one">
                    <a href="">Team One</a>
                </slot>
            </h2>
            <h2>
                <slot name="score">
                    <span>0-0</a>
                </slot>
            </h2>
            <h2>
                <slot name="team_two">
                    <a href="">Team One</a>
                </slot>
            </h2>
        </div>
        <div>
            <slot name="tournament">
                <a href="">Tournament</a>
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
}