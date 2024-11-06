import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import header from "./styles/header.css.js";

export class PickBanElement extends HTMLElement {
    static template = html`
    <template>
        <div class="pick_ban">
            <div class="blue">
                <slot name="bban1"></slot>
                <slot name="bban2"></slot>
                <slot name="bban3"></slot>
                <slot name="bpick1"></slot>
                <slot name="bpick2"></slot>
                <slot name="bpick3"></slot>
                <slot name="bban4"></slot>
                <slot name="bban5"></slot>
                <slot name="bpick4"></slot>
                <slot name="bpick5"></slot>
            </div>
            <div class="red">
                <slot name="rban1"></slot>
                <slot name="rban2"></slot>
                <slot name="rban3"></slot>
                <slot name="rpick1"></slot>
                <slot name="rpick2"></slot>
                <slot name="rpick3"></slot>
                <slot name="rban4"></slot>
                <slot name="rban5"></slot>
                <slot name="rpick4"></slot>
                <slot name="rpick5"></slot>
            </div>
        </div>
    </template>
    `;

    static styles = css`
    :host {
        display: grid;
        grid-column: 1 / -1;
        text-align: center;
        padding-left: var(--size-spacing-xlarge);
        padding-right: var(--size-spacing-xlarge);
    }

    div {
        align-items: center; 
        justify-items: center;
        // padding: var(--size-spacing-medium); 
    }

    .pick_ban {
        display: grid;
        grid-column: 1 / -1;
        // grid-template-columns: 1fr 1fr;
    }
    
    .blue {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        background: var(--color-blueside-background)
    }
        
    .red {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        background: var(--color-redside-background)
    }

    .ban, .pick {
        display: flex;
        flex-direction: row;
        gap: var(--size-spacing-large);
    }
    `;

    constructor() {
        super();
        shadow(this)
            .template(PickBanElement.template)
            .styles(PickBanElement.styles, reset.styles, header.styles);
    }
}