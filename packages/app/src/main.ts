import { Auth, define } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { LensOfLegendsHeaderElement } from "./components/lol-header";
import { HomeViewElement } from "./views/home-view";

class AppElement extends LitElement {
    static uses = define({
        "home-view": HomeViewElement
    });

    protected render() {
        return html`
        <home-view></home-view>
        `;
    }

    static styles = [
        css`
          :host {
            display: grid;
            grid-column: 1 / -1;
          }
        `
    ];

    connectedCallback(): void {
        super.connectedCallback();
        LensOfLegendsHeaderElement.initializeOnce();
    }
}

define({
    "mu-auth": Auth.Provider,
    "lol-app": AppElement,
    "lol-header": LensOfLegendsHeaderElement
});