import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class TeamGameSummaryElement extends HTMLElement {
    static template = html`
    <template>
        <slot name="team_name">
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
                <tr>
                    <td><slot name="top_player_name">Top Name</slot></td>
                    <td><slot name="top_runes">Top Runes</slot></td>
                    <td><slot name="top_items">Top Items</slot></td>
                    <td><slot name="top_kda">Top KDA</slot></td>
                    <td><slot name="top_cs">Top CS</slot></td>
                </tr>
                <tr>
                    <td><slot name="jungle_player_name"></slot></td>
                    <td><slot name="jungle_runes"></slot></td>
                    <td><slot name="jungle_items"></slot></td>
                    <td><slot name="jungle_kda"></slot></td>
                    <td><slot name="jungle_cs"></slot></td>
                </tr>
            </tbody>
        </table>
    </template>
    `;

    static styles = css`
    :host {
      display: contents;
    }

    dl {
        display: grid;
        grid-template-columns: max-content auto auto auto auto auto;
        align-items: center;
    }

    dt {
        grid-column: 1;
        padding: var(--size-spacing-medium);
    }
      `;

    constructor() {
        super();
        shadow(this)
            .template(TeamGameSummaryElement.template)
            .styles(TeamGameSummaryElement.styles, reset.styles);
    }

}