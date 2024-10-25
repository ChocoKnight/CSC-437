import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import header from "./styles/header.css.js";

export class PickBanPhaseElement extends HTMLElement {
    static template = html`
    <template>
        <div>
            <slot class="champ" name="champ1">
            </slot>
            <slot name="champ2">
            </slot>
        </div>
    </template>
    `;

    static styles = css`
    :host {
        display: grid;
        grid-column: 1 / -1;
    }

    ::slotted(.champ) {
        width:50%;
    }
    `;

    constructor() {
        super();
        shadow(this)
            .template(PickBanPhaseElement.template)
            .styles(PickBanPhaseElement.styles, reset.styles, header.styles);
    }
}