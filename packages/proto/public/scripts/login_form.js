import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import header from "./styles/header.css.js";

export class LoginForm extends HTMLElement {
    static template = html`
        <template>
            <form>
                <slot name="title">
                    <h3>Sign in with Username and Password</h3>
                </slot>

                <label>
                    <span>
                        <slot name="username">Username</slot>
                    </span>
                    <input name="username" placeholder="Username" autocomplete="off" />
                </label>

                <label>
                    <span>
                        <slot name="password">Password</slot>
                    </span>
                    <input type="password" name="password" />
                </label>

                <slot name="submit">
                    <button type="submit">Sign In</button>
                </slot>

                <p class="register">
                    Don't have an account? 
                    <a href="./register">
                        Register
                    </a>
                </p>
            </form>
      </template>
    `;

    static styles = css`
    :host {
        display: grid;
        grid-column: 1 / -1;
        text-align: center;
        padding: var(--size-spacing-xlarge);
    }

    form {
        display: flex;
        flex-direction: column;
        // display: grid;
        // grid-template-columns: 1fr 1fr 1fr;
        gap: 1rem;
        width: 100%;
    }

    input {
        padding: 5px; 
    }

    button {
        width: auto;
        align-self: center;
        padding: 0.5rem 1rem;
    }
    `;

    get form() {
        return this.shadowRoot.querySelector("form");
    }

    constructor() {
        super();

        shadow(this)
            .template(LoginForm.template)
            .styles(reset.styles, LoginForm.styles, header.styles);

        this.form.addEventListener("submit", (event) =>
            submitLoginForm(
                event,
                this.getAttribute("api"),
                this.getAttribute("redirect") || "/"
            )
        );
    }
}

function submitLoginForm(event, endpoint, redirect) {
    event.preventDefault();
    const form = event.target.closest("form");
    const data = new FormData(form);
    const method = "POST";
    const headers = {
        "Content-Type": "application/json"
    };
    const body = JSON.stringify(Object.fromEntries(data));

    fetch(endpoint, { method, headers, body })
        .then((res) => {
            if (res.status !== 200)
                throw `Form submission failed: Status ${res.status}`;
            return res.json();
        })
        .then((payload) => {
            const { token } = payload;

            form.dispatchEvent(
                new CustomEvent("auth:message", {
                    bubbles: true,
                    composed: true,
                    detail: ["auth/signin", { token, redirect }]
                })
            );
        })
        .catch((err) => console.log("Error submitting form:", err));
}
