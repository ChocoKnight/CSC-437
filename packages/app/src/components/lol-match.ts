import { Auth, Observer } from "@calpoly/mustang";
import { LitElement, css, html } from "lit";
import reset from "../styles/reset.css";
import headings from "../styles/headings.css";

export class MatchViewHeaderElement extends LitElement {
    render() {
        return html`
        <div class="game_overview">
            <h2>
                <slot name="teamOne">
                    <a href="">Team One</a>
                </slot>
            </h2>
            <h2>
                <slot name="score">
                    <span>0-0</span>
                </slot>
            </h2>
            <h2>
                <slot name="teamTwo">
                    <a href="">Team Two</a>
                </slot>
            </h2>
        </div>
        <div>
            <slot name="tournamentName">
                <a href="../">Tournament</a>
            </slot>
        </div>
        <div>
            <slot name="date">
                <span>January 1, 2000 00:00 PST</span>
            </slot>
        </div>
        `;
    }

    static styles = [
        reset.styles,
        headings.styles,
        css`
        :host {
            display: grid;
            grid-column: 1 / -1;
        }

        .game_overview {
            display: grid;
            grid-template-columns: 1fr 0.25fr 1fr;
            align-items: center; 
            justify-items: center; 
        }      

        div {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            padding: var(--size-spacing-medium); 
        }
        `
    ]

    _authObserver = new Observer(this, "lol:auth");

    _user = new Auth.User();
}