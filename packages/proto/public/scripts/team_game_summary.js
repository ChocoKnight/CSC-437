import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import header from "./styles/header.css.js";

export class TeamGameSummaryElement extends HTMLElement {
    static template = html`
    <template>
        <div class="game_overview">
            <span>
                <slot name="team_one_side">
                    Blue Side
                </slot>
            </span>
            <h4>
                <slot name="score">
                    <span>W - L</a>
                </slot>
            </h4>
            <span>
                <slot name="team_two_side">
                    Red Side
                </slot>
            </span>
        </div>

        <div>
            <slot class="middle" name="duration">
                <span>00:00</a>
            </slot>
        </div>
        
        <div>
            <h2>
                Pick and Bans
            </h2>
            <slot name="pick_ban"></slot>
        </div>
        
        <div>
            <h2>Objectives</h2>

            <section class="objective">
                <slot name="blue_kills">
                    <span>0</span>
                </slot>
                <h4>Kills</h4>
                <slot name="blue_kills">
                    <span>0</span>
                </slot>
            </section>

            <section class="objective">
                <slot name="blue_towers">
                    <span>0</span>
                </slot>
                <h4>Towers</h4>
                <slot name="red_towers">
                    <span>0</span>
                </slot>
            </section>

            <section class="objective">
                <slot name="blue_grubs">
                    <span>0</span>
                </slot>
                <h4>Void Grubs</h4>
                <slot name="red_grubs">
                    <span>0</span>
                </slot>
            </section>

            <section class="objective">
                <slot name="blue_heralds">
                    <span>0</span>
                </slot>
                <h4>Rift Heralds</h4>
                <slot name="red_heralds">
                    <span>0</span>
                </slot>
            </section>

            <section class="objective">
                <slot name="blue_barons">
                    <span>0</span>
                </slot>
                <h4>Baron Nashtors</h4>
                <slot name="red_barons">
                    <span>0</span>
                </slot>
            </section>

            <section class="objective">
                <slot name="blue_drakes">
                    <span>0</span>
                </slot>
                <h4>Drakes</h4>
                <slot name="red_drakes">
                    <span>0</span>
                </slot>
            </section>

            <section class="objective">
                <slot name="blue_gold">
                    <span>0</span>
                </slot>
                <h4>Total Gold</h4>
                <slot name="red_gold">
                    <span>0</span>
                </slot>
            </section>
        </div>

        <div>
            <h2>Player Performance</h2>
        </div>
    </template>
    `;

    static styles = css`
    :host {
        box-sizing: border-box;
        display: grid;
        grid-column: 1 / -1;
        // padding: var(--size-spacing-medium);
        // border: solid;
    }

    .game_overview {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        align-items: center; 
        justify-items: center; 
    }
    
    .middle {
        display: grid;
        grid-column: 1 / -1;
        align-items: center; 
        justify-items: center; 
    }

    .objective {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        align-items: center; 
        justify-items: center; 
    }

    h2 {
        padding-bottom: var(--size-spacing-large);
    }

    div {
        // padding-bottom: var(--size-spacing-xlarge);
        text-align: center;
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
            .styles(TeamGameSummaryElement.styles, reset.styles, header.styles);
    }

}