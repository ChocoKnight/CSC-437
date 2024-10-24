import { css, define, html, shadow, Dropdown, Events } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class HeaderElement extends HTMLElement {
    static template = html`
    <template>
        <header>
            <h1>Lens of Legends</h1>
        </header>
    </template>
    `;

    static styles = css`
    :host {
      display: grid;
      grid-column: 1 / -1;
    }

    `;

    constructor() {
        super();
        shadow(this)
            .template(HeaderElement.template)
            .styles(HeaderElement.styles, reset.styles);
    }

}