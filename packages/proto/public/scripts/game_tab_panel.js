import { css, define, html, shadow, Dropdown, Events } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import header from "./styles/header.css.js";

export class GameTabPanelElement extends HTMLElement {
    static template = html`
    <template>
        <div class="game_tabs">
            <ul>
                <li class="tab1">
                    <a href="#">Summary</a>
                </li>
                <li class="tab2">
                    <a href="#">Game 1</a>
                </li>
                <li class="tab3">
                    <a href="#">Game 2</a>
                </li>
                <li class="tab4">
                    <a href="#">Game 3</a>
                </li>
                <li class="tab5">
                    <a href="#">Game 4</a>
                </li>
                <li class="tab6">
                    <a href="#">Game 5</a>
                </li>
            </ul>
        </div>
        <div class="tab_content">
        </div>
    </template>
    `;

    static styles = css`
    :host {
        display: grid;
        grid-column: 1 / -1;
        padding-left: var(--size-spacing-xlarge);
        padding-right: var(--size-spacing-xlarge);
    }
    `;

    constructor() {
        super();
        shadow(this)
            .template(GameTabPanelElement.template)
            .styles(GameTabPanelElement.styles, reset.styles, header.styles);
    }
}