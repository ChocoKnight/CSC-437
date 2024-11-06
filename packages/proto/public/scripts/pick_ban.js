import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import header from "./styles/header.css.js";

export class PickBanElement extends HTMLElement {
    static template = html`
    <template>
        <h2>
            Pick and Bans
        </h2>
        <div class="pick_ban">
            <div class="ban1">
                <div class="blue">
                    <slot name="bban1"></slot>
                    <slot name="bban2"></slot>
                    <slot name="bban3"></slot>
                </div>
                <div class="red">
                    <slot name="rban1"></slot>
                    <slot name="rban2"></slot>
                    <slot name="rban3"></slot>
                </div>
            </div>
            <div class="pick1">
                <div class="blue">
                    <slot name="bpick1"></slot>
                    <slot name="bpick2"></slot>
                    <slot name="bpick3"></slot>
                </div>
                <div class="red">
                    <slot name="rpick1"></slot>
                    <slot name="rpick2"></slot>
                    <slot name="rpick3"></slot>
                </div>
            </div>
            <div class="ban2">
                <div class="blue">
                    <slot name="bban4"></slot>
                    <slot name="bban5"></slot>
                </div>
                <div class="red">
                    <slot name="rban4"></slot>
                    <slot name="rban5"></slot>
                </div>
            </div>
            <div class="pick2">
                <div class="blue">
                    <slot name="bpick4"></slot>
                    <slot name="bpick5"></slot>
                </div>
                <div class="red">
                    <slot name="rpick4"></slot>
                    <slot name="rpick5"></slot>
                </div>
            </div>
        </div>
    </template>
    `;

    static styles = css`
    :host {
        display: grid;
        grid-column: 1 / -1;
        align-items: center; 
        justify-items: center;
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
        grid-template-columns: 3fr 3fr 3fr 3fr;
    }
    
    .blue {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        background: var(--color-blueside-background)
    }
        
    .red {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        background: var(--color-redside-background)
    }

    .ban_phase_1, .pick_phase_1 {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
    `;

    constructor() {
        super();
        shadow(this)
            .template(PickBanElement.template)
            .styles(PickBanElement.styles, reset.styles, header.styles);
    }
}