import { css, define, html, shadow, Dropdown, Events } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import header from "./styles/header.css.js";

export class GameTabPanelElement extends HTMLElement {
    static template = html`
    <template>
        <div class="game_tabs">
            <ul>
                <li class="tab">
                    <a href="#">Summary</a>
                </li>
                <li class="tab">
                    <a href="#">Game 1</a>
                </li>
                <li class="tab">
                    <a href="#">Game 2</a>
                </li>
                <li class="tab">
                    <a href="#">Game 3</a>
                </li>
                <li class="tab">
                    <a href="#">Game 4</a>
                </li>
                <li class="tab">
                    <a href="#">Game 5</a>
                </li>
            </ul>
        </div>
        <div class="tab_content">
            <slot name="summary"></slot>
            <slot name="game1"></slot>
            <slot name="game2"></slot>
            <slot name="game3"></slot>
            <slot name="game4"></slot>
            <slot name="game5"></slot>
        </div>
    </template>
    `;

    static styles = css`
    :host {
        display: grid;
        grid-column: 1 / -1;
    }

    .game_tabs ul {
        flex-direction: row;
        padding: 0;
        margin: 0;
    }

    .game_tabs ul li {
        padding: var(--size-spacing-xlarge);
    }
    `;

    constructor() {
        super();
        shadow(this)
            .template(GameTabPanelElement.template)
            .styles(GameTabPanelElement.styles, reset.styles, header.styles);
    }
}