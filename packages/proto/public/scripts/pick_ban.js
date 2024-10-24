import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class PickBanElement extends HTMLElement {
    static template = html`
    <template>
        
    </template>
    `;

    static styles = css`
    :host {
      display: contents;
    }

    dl {
    display: grid;
    grid-template-columns: max-content auto auto auto auto auto;
    align-items: center;
    }

    dt {
        grid-column: 1;
        padding: var(--size-spacing-medium);
    }
      `;

    constructor() {
        super();
        shadow(this)
            .template(PickBanElement.template)
            .styles(PickBanElement.styles, reset.styles);
    }

}