import { css, define, html, shadow, Dropdown, Events } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import header from "./styles/header.css.js";

export class GameTabPanelElement extends HTMLElement {
    static template = html`
    <template>
        <div class="tabs">
            <slot id="tab-slot" name="tab">
                <h2>Tab</h2>
            </slot>
        </div>
        <div class="tab-contents">
            <slot id="content-slot" name="content">
                <span>Test Text</span>
            </slot>
        </div>
    </template>
    `;

    static styles = css`
    :host {
        display: flex;
        flex-direction: column;
        // grid-column: 1 / -1;
    }

    .tab {
        display: flex; 
        flex-direction: row; 
        flex-wrap: nowrap;
    }
    `;

    constructor() {
        super();
        shadow(this)
            .template(GameTabPanelElement.template)
            .styles(GameTabPanelElement.styles, reset.styles, header.styles);
    }
}