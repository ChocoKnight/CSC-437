import { css, html } from "@calpoly/mustang/server";
import { Series, Champion } from "../models";
// import renderPage from "./renderPage"; // generic page renderer

export class SeriesPage {
    data: Series;

    constructor(data: Series) {
        this.data = data;
    }

    render() {
        // return renderPage({
        //     body: this.renderBody(),
        //     // add more parts here later
        // });
    }

    formatDate = (date: Date | undefined) => {
        const dt = date || new Date();
        const m = SeriesPage.months[dt.getUTCMonth()];
        const d = dt.getUTCDate();

        return `${d} ${m}`;
    };

    renderBody() {
        const { tournamentName, date, teamOne, teamTwo, games = [] } = this.data;
        return html`
        <lol-header></lol-header>
        <main class="page">
            <game-header>
                <a slot="team_one" href="">${teamOne}</a>
                <a slot="team_two" href="">${teamTwo}</a>
                <a slot="tournament" href="../tournaments/${tournamentName}.html">${tournamentName}</a>
                <span slot="score" href="">2-0</span>
                <span slot="date">${this.formatDate(date)}</span>
            </game-header>
        </main>
        `;
    }

    static months = [
        "January",
        "Febuary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
}