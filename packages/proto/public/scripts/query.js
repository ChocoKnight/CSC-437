import { css, define, html, shadow, Dropdown, Events } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import header from "./styles/header.css.js";

export class QueryElement extends HTMLElement {
    static template = html`
    <template>
        <div class="criteria">
        </div>
    </template>
    `;

    static styles = css`
    :host {
        display: grid;
        grid-column: 1 / -1;
    }

    div {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center; 
        justify-items: left; 
    }
    `;

    constructor() {
        super();
        shadow(this)
            .template(QueryElement.template)
            .styles(QueryElement.styles, reset.styles, header.styles);
    }
}