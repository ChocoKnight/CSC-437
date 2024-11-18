import { css, define, html, shadow, Form, InputArray, Observer } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import header from "./styles/header.css.js";

export class UserProfileElement extends HTMLElement {
    static uses = define({
        "mu-form": Form.Element,
        "input-array": InputArray.Element
    });

    get src() {
        return this.getAttribute("src");
    }

    static template = html`
    <template>
        <section class="view">
            <button id="edit">Edit</button>
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
            <dl>
           
        </section>
        <mu-form class="edit">
            <label>
                <span>Favorite Teams</span>
                    <input-array name="favoriteTeams">
                        <span slot="label-add">Add a team</span>
                    </input-array>
            </label>
            <label>
                <span>Favorite Champions</span>
                    <input-array name="favoriteChampions">
                        <span slot="label-add">Add a champion</span>
                    </input-array>
            </label>
        </mu-form>
    </template>`;

    static styles = css`
    :host {
        display: grid;
        grid-column: 1 / -1;
        padding: var(--size-spacing-xlarge);
    }

    :host([mode="edit"]),
    :host([mode="new"]) {
        --display-view-none: none;
    }

    :host([mode="view"]) {
        --display-editor-none: none;
    }

    section.view {
        display: var(--display-view-none, grid);
    }
        
    mu-form.edit {
        display: var(--display-editor-none, grid);
    }

    section {
        display: grid;
        grid-column: 1 / -1;
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

    get mode() {
        return this.getAttribute("mode");
    }

    set mode(m) {
        this.setAttribute("mode", m);
    }

    get editButton() {
        return this.shadowRoot.getElementById("edit");
    }

    constructor() {
        super();
        shadow(this)
            .template(UserProfileElement.template)
            .styles(
                reset.styles,
                header.styles,
                UserProfileElement.styles
            );

        this.addEventListener("mu-form:submit", (event) =>
            this.submit(this.src, event.detail)
        );

        this.mode = "view";
        this.editButton.addEventListener(
            "click",
            () => (this.mode = "edit")
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

    get form() {
        return this.shadowRoot.querySelector("mu-form.edit");
    }

    hydrate(url) {
        fetch(url, { headers: this.authorization })
            .then((res) => {
                if (res.status !== 200) throw `Status: ${res.status}`;
                return res.json();
            })
            .then((json) => {
                this.renderSlots(json);
                this.form.init = json;
            })
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

    submit(url, json) {
        const method = this.mode === "new" ? "POST" : "PUT";

        fetch(url, { method, headers: { "Content-Type": "application/json", ...this.authorization }, body: JSON.stringify(json) })
            .then((res) => {
                if (res.status !== (this.mode === "new" ? 201 : 200))
                    throw `Status: ${res.status}`;
                return res.json();
            })
            .then((json) => {
                this.renderSlots(json);
                this.form.init = json;
                this.mode = "view";
            })
            .catch((error) => {
                console.log(`Failed to submit ${url}:`, error);
            });
    }

}