import { css, html, shadow } from "@calpoly/mustang";

export class PlayerGameSummaryElement extends HTMLElement {
    static template = html`<template>
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
                <slot name="item">
                    <img src="https://ddragon.leagueoflegends.com/cdn/14.20.1/img/item/1057.png" class="item">
                </slot>
                <img src="https://ddragon.leagueoflegends.com/cdn/14.20.1/img/item/1031.png" class="item">
                <img src="https://ddragon.leagueoflegends.com/cdn/14.20.1/img/item/1055.png" class="item">
                <img src="https://ddragon.leagueoflegends.com/cdn/14.20.1/img/item/3078.png" class="item">
                <img src="https://ddragon.leagueoflegends.com/cdn/14.20.1/img/item/3053.png" class="item">
                <img src="https://ddragon.leagueoflegends.com/cdn/14.20.1/img/item/3047.png" class="item">
            </td>
            <td slot="KDA">
                KDA
            </td>
            <td slot="CS">
                CS
            </td>
        </tr>
      </template>
    `;

    static styles = css``;

    constructor() {
        super();
        shadow(this)
            .template(PlayerGameSummaryElement.template)
            .styles(
                PlayerGameSummaryElement.styles, 
                reset.styles, 
                icon.styles, 
                headings.styles
            );
    }
}