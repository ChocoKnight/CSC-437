import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class TeamGameSummaryElement extends HTMLElement {
    static template = html`<template>
        <span slot="team_name">PSG Talon</span>
        <span slot="kills">Kills 20</span>
        <span slot="towers">Towers 10</span>
        <span slot="grubs">Grubs 2</span>
        <span slot="heralds">Heralds 1</span>
        <span slot="drakes">Drakes 2</span>
        <span slot="barons">Barons 1</span>
        <span slot="gold">Gold 54.1k</span>
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

    static styles = css``;

    constructor() {
        super();
        shadow(this)
            .template(TeamGameSummaryElement.template)
            .styles(TeamGameSummaryElement.styles, reset.styles);
    }

    static initializeOnce() {
    }
}