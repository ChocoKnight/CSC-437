import { css, html, shadow } from "@calpoly/mustang";

export class PlayerGameSummaryElement extends HTMLElement {
    static template = html`<template>
        <tr>
            <td>
                <slot name="champion">
                    <a href="">Champion Image</a>
                </slot>
                <slot name="player_name">
                    <a href="">Player Name</a>
                </slot>
            </td>
            <td>
                <slot name="primary_rune">
                    <span>Rune</span>
                </slot>
                <slot name="secondary_rune">
                    <span>Rune</span>
                </slot>
                <slot name="primary_summoner">
                    <span>Summoner</span>
                </slot>
                <slot name="seconday_summoner">
                    <span>Summoner</span>
                </slot>
            </td>
            <td>
                <slot name="item_1"></slot>
                <slot name="item_2"></slot>
                <slot name="item_3"></slot>
                <slot name="item_4"></slot>
                <slot name="item_5"></slot>
                <slot name="item_6"></slot>
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