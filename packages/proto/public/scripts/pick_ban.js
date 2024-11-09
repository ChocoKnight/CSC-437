import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import header from "./styles/header.css.js";

export class PickBanElement extends HTMLElement {
    get src() {
        return this.getAttribute("src");
    }

    static template = html`
    <template>
        <div class="pick_ban">
            <div class="blue">
                <slot name="banOne">
                    <span>One</span>
                </slot>
                <slot name="banTwo"><span>One</span></slot>
                <slot name="banThree"><span>One</span></slot>
                <slot name="pickOne"><span>One</span></slot>
                <slot name="pickTwo"><span>One</span></slot>
                <slot name="pickThree"><span>One</span></slot>
                <slot name="banFour"><span>One</span></slot>
                <slot name="banFive"><span>One</span></slot>
                <slot name="pickFour"><span>One</span></slot>
                <slot name="pickFive"><span>One</span></slot>
            </div>
            <div class="red">
                <slot name="rban1"><span>One</span></slot>
                <slot name="rban2"><span>One</span></slot>
                <slot name="rban3"><span>One</span></slot>
                <slot name="rpick1"><span>One</span></slot>
                <slot name="rpick2"><span>One</span></slot>
                <slot name="rpick3"><span>One</span></slot>
                <slot name="rban4"><span>One</span></slot>
                <slot name="rban5"><span>One</span></slot>
                <slot name="rpick4"><span>One</span></slot>
                <slot name="rpick5"><span>One</span></slot>
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

    connectedCallback() {
        if (this.src) this.hydrate(this.src);
    }

    hydrate(url) {
        fetch(url)
            .then((res) => {
                if (res.status !== 200) throw `Status: ${res.status}`;
                return res.json();
            })
            .then((json) => this.renderSlots(json))
            .catch((error) =>
                console.log(`Failed to render data ${url}:`, error)
            );
    }

    renderSlots(json) {
        const entries = Object.entries(json);
        const toSlot = ([key, value]) =>
            html`<img slot="${key}" src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${value}_0.jpg" class="champ_icon">`
        const fragment = entries.map(toSlot);
        this.replaceChildren(...fragment);
    }
}