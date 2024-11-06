import { css, define, html, shadow, Dropdown, Events } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import header from "./styles/header.css.js";

export class GameTabPanelElement extends HTMLElement {
    static template = html`
    <template>
        <div class="game_tabs">
            <ul>
                <li class="tab_link" onclick="openPage('summary', this)" id="defaultOpen">
                    <a href="#">Summary</a>
                </li>
                <li class="tab_link" onclick="openPage('game1', this)">
                    <a href="#">Game 1</a>
                </li>
                <li class="tab_link" onclick="openPage('game2', this)">
                    <a href="#">Game 2</a>
                </li>
                <li class="tab_link" onclick="openPage('game3', this)">
                    <a href="#">Game 3</a>
                </li>
                <li class="tab_link" onclick="openPage('game4', this)">
                    <a href="#">Game 4</a>
                </li>
                <li class="tab_link" onclick="openPage('game5', this)">
                    <a href="#">Game 5</a>
                </li>
            </ul>
        </div>
        <div>
            <div class="tab_content" id="summary">
                <slot name="summary"></slot>
            </div>
            <div class="tab_content" id="game1">
                <slot name="game1"></slot>
            </div>
            <div class="tab_content" id="game2">
                <slot name="game2"></slot>
            </div>
            <div class="tab_content" id="game3">
                <slot name="game3"></slot>
            </div>
            <div class="tab_content" id="game4">
                <slot name="game4"></slot>
            </div>
            <div class="tab_content" id="game5">
                <slot name="game5"></slot>
            </div>
        </div>
    </template>
    `;

    static styles = css`
    :host {
        display: grid;
        grid-column: 1 / -1;
    }

    .game_tabs ul {
        flex-direction: row;
        padding: 0;
        margin: 0;
    }

    .game_tabs ul li {
        padding: var(--size-spacing-xlarge);
    }
    `;

    constructor() {
        super();
        shadow(this)
            .template(GameTabPanelElement.template)
            .styles(GameTabPanelElement.styles, reset.styles, header.styles);
    }

    static initializeOnce() {
        function openPage(pageName, elmnt) {
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tab_content");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tab_link");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].style.backgroundColor = "";
            }
            document.getElementById(pageName).style.display = "block";
            elmnt.style.backgroundColor = "var(--color-text-important)";
        }
    }
}