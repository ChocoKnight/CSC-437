import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import header from "./styles/header.css.js";

export class PickBanElement extends HTMLElement {
    static template = html`
    <template>
        <div>
            <div class="blue">
                <slot name="ban1">
                </slot>
            </div>
            <div class="red">
            </div>
        </div>
    </template>
    `;

    static styles = css`
    :host {
        display: grid;
        grid-column: 1 / -1;
    }

    div {
        background-color: var(--color-background-stats)
    }
    
    .blue {
        display: grid;
        // grid-template-columns: 1fr 1fr 1fr 0.25fr 1fr 0.25fr 1fr 1fr 0.25fr 1fr 1fr 0.25fr 1fr 1fr;
    }
    `;

    constructor() {
        super();
        shadow(this)
            .template(PickBanElement.template)
            .styles(PickBanElement.styles, reset.styles, header.styles);
    }
}