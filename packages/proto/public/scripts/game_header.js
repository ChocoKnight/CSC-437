import { css, define, html, shadow, Dropdown, Events } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class GameHeaderElement extends HTMLElement {
    static template = html`
    <template>
        <div class="game_overview">
            <slot name="team_one">
                <h2>
                    <a href="">Team One</a>
                </h2>
            </slot>
            <slot name="score">
                <h2>
                    <span>0:0</span>
                </h2>
            </slot>
            <slot name="team_two">
                <h2>
                    <a href="">Team Two</a>
                </h2>
            </slot>
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
        grid-template-columns: repeat(3, 1fr); 
        // gap: 10px; 
    }

    div, 
    .game_overview div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 10px; 
    }
    `;

    constructor() {
        super();
        shadow(this)
            .template(GameHeaderElement.template)
            .styles(GameHeaderElement.styles, reset.styles);
    }

}