import { Auth, History, Switch, define } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { LensOfLegendsHeaderElement } from "./components/lol-header";
import { HomeViewElement } from "./views/home-view";

const routes = [
    {
        path: "/app/tour/:id",
        view: (params: Switch.Params) => html`
        <tour-view tour-id=${params.id}></tour-view>
      `
    },
    {
        path: "/app",
        view: () => html`
        <home-view></home-view>
      `
    },
    {
        path: "/",
        redirect: "/app"
    }
];

class AppElement extends LitElement {
    protected render() {
        return html`
        <mu-switch></mu-switch>
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
    "mu-history": History.Provider,
    "mu-switch": class AppSwitch extends Switch.Element {
        constructor() {
            super(routes, "lol:history")
        }
    },
    "lol-app": AppElement,
    "lol-header": LensOfLegendsHeaderElement,
    "home-view": HomeViewElement
});