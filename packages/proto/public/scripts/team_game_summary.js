import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class TeamGameSummaryElement extends HTMLElement {
    static template = html`
    <template>
        <slot name="team-name">
            <h3>Team Name</h3>
        </slot>
        <dl>
            <dt>Kills</dt>
            <dd>
                <slot name="kills">
                    <span>0</span>
                </slot>
            </dd>
            <dt>Towers</dt>
            <dd>
                <slot name="towers">
                    <span>0</span>
                </slot>
            </dd>
            <dt>Grubs</dt>
            <dd>
                <slot name="grubs">
                    <span>0</span>
                </slot>
            </dd>
            <dt>Heralds</dt>
            <dd>
                <slot name="heralds">
                    <span>0</span>
                </slot>
            </dd>
            <dt>Drakes</dt>
            <dd>
                <slot name="drakes">
                    <span>0</span>
                </slot>
            </dd>
            <dt>Barons</dt>
            <dd>
                <slot name="barons">
                    <span>0</span>
                </slot>
            </dd>
            <dt>Gold</dt>
            <dd>
                <slot name="gold">
                    <span>0</span>
                </slot>
            </dd>
        </dl>
        <table>
            <thead>
                <tr>
                    <th>Player</th>
                    <th>Runes/SS</th>
                    <th>Items</th>
                    <th>KDA</th>
                    <th>CS</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </template>
    `;

    static styles = css`
    :host {
      display: contents;
    }

    .blue_side {
    background-color: var(--color-blueside-background);
    }

    .blue_side h3,
    .blue_side h4 {
        color: var(--color-blueside-dark);
        border-style: solid;
        border-bottom: 1;
        border-top: 0;
        border-left: 0;
        border-right: 0;
    }
      `;

    constructor() {
        super();
        shadow(this)
            .template(TeamGameSummaryElement.template)
            .styles(TeamGameSummaryElement.styles, reset.styles);
    }

}