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
                <tr slot="player">
                    <td slot="player_name_champ">
                            <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/Gnar_0.jpg" class="champ_icon">
                            <a href="">Azhi</a>
                        </td>
                        <td slot="runes_summoner_spells">
                            <img src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/GraspOfTheUndying/GraspOfTheUndying.png"
                                class="rune">
                            <img src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7201_Precision.png"
                                class="rune">
                            <img src="https://ddragon.leagueoflegends.com/cdn/14.20.1/img/spell/SummonerFlash.png"
                                class="summoner_spell">
                            <img src="https://ddragon.leagueoflegends.com/cdn/14.20.1/img/spell/SummonerTeleport.png"
                                class="summoner_spell">
                        </td>
                        <td slot="items">
                            <img src="https://ddragon.leagueoflegends.com/cdn/14.20.1/img/item/1057.png" class="item">
                            <img src="https://ddragon.leagueoflegends.com/cdn/14.20.1/img/item/1031.png" class="item">
                            <img src="https://ddragon.leagueoflegends.com/cdn/14.20.1/img/item/1055.png" class="item">
                            <img src="https://ddragon.leagueoflegends.com/cdn/14.20.1/img/item/3078.png" class="item">
                            <img src="https://ddragon.leagueoflegends.com/cdn/14.20.1/img/item/3053.png" class="item">
                            <img src="https://ddragon.leagueoflegends.com/cdn/14.20.1/img/item/3047.png" class="item">
                        </td>
                        <td slot="KDA">
                            3/0/12
                        </td>
                        <td slot="CS">
                            227
                        </td>
                    </tr>
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