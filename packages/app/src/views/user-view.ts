import { Auth, Observer, View } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { User } from "server/models";
import reset from "../styles/reset.css";
import headings from "../styles/headings.css";
import { Msg } from "../messages";
import { Model } from "../model";

export class UserView extends View<Model, Msg> {
    @property({ attribute: "user-id", reflect: true })
    userId = "";

    @state()
    get user(): User | undefined {
        return this.model.user;
    }

    _authObserver = new Observer<Auth.Model>(
        this,
        "lol:auth"
    );

    _user = new Auth.User();

    constructor() {
        super("lol:model");
    }

    attributeChangedCallback(name: string, old: string | null, value: string | null) {
        super.attributeChangedCallback(name, old, value);
        if (name === "user-id" && old !== value && value) {
            this.dispatchMessage(["user/select", { userId : value}]);
        }
    }

    render() {
        html`
            <main class="page">
                <h1>Hello</h1>
            </main>
        `;
    }

    static styles = [
        reset.styles,
        headings.styles,
    ];
}