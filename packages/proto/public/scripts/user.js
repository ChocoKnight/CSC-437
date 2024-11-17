import { css, define, html, shadow, Form, InputArray, Observer } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import header from "./styles/header.css.js";

export class UserProfileElement extends HTMLElement {
    // static uses = define({
    //     "mu-form": Form.Element,
    //     "input-array": InputArray.Element
    // });

    get src() {
        return this.getAttribute("src");
    }

    static template = html`
    <template>
        <dl>
            <dt>
                <h3>Username</h3>
            </dt>
            <dd>
                <slot name="username">Username</slot>
            <dd>
            <dt>
                <h3>Favorite Teams</h3>
            </dt>
            <dd>
                <slot name="favoriteTeams">Teams</slot>
            <dd>
            <dt>
                <h3>Favorite Champions</h3>
            </dt>
            <dd>
                <slot name="favoriteChampions">Champions</slot>
            <dd>
    </template>`;

    static styles = css`
    :host {
        display: grid;
        grid-column: 1 / -1;
        padding: var(--size-spacing-xlarge);
    }

    dl {
        display: grid;
        grid-column: 1 / span 4;
        grid-row: 5 / auto;
        grid-template-columns: subgrid;
        gap: 0 var(--size-spacing-xlarge);
        align-items: baseline;
    }

    dt {
        grid-column: 1 / span 2;
        justify-self: end;
    }

    dd {
        grid-column: 3 / -1;
    }
  `;

    constructor() {
        super();
        shadow(this)
            .template(UserProfileElement.template)
            .styles(
                reset.styles,
                header.styles,
                UserProfileElement.styles
            );
    }

    _authObserver = new Observer(this, "lol:auth");

    get authorization() {
        return (
            this._user?.authenticated && {
                Authorization: `Bearer ${this._user.token}`
            }
        );
    }

    connectedCallback() {
        this._authObserver.observe(({ user }) => {
            console.log("Authenticated user:", user);
            this._user = user;
            if (this.src && this.mode !== "new")
                this.hydrate(this.src);
        });
    }

    hydrate(url) {
        fetch(url, { headers: this.authorization })
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
        // const toSlot = ([key, value]) =>
        //     html`<span slot="${key}">${value}</span>`

        const toSlot = ([key, value]) => {
            switch (typeof value) {
                case "object":
                    if (Array.isArray(value))
                        return html`<ul slot="${key}">
                    ${value.map((s) => html`<li>${s}</li>`)}
                  </ul>`;
                default:
                    return html`<span slot="${key}">${value}</span>`;
            }
        };

        const fragment = entries.map(toSlot);
        this.replaceChildren(...fragment);
    }
}