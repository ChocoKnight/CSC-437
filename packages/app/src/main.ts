import { Auth, History, Store, Switch, define } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";
import { css, html, LitElement } from "lit";
import { LensOfLegendsHeaderElement } from "./components/lol-header";
import { HomeViewElement } from "./views/home-view";
import { TournamentSearchView } from "./views/tournament-search-view";
import { TournamentView } from "./views/tournament-view";
import { ChampionSearchView } from "./views/champion-search-view";
import { TeamSearchView } from "./views/team-search-view";
// import { TeamView } from "./views/team-view";
import { PlayerSearchView } from "./views/player-serach-view";
import { MatchView, MatchEdit } from "./views/match-view";

const routes = [
    {
        path: "/app/matches/edit/:id",
        view: (params: Switch.Params) => html`
        <match-edit match-id=${params.id}></match-edit>
        `
    },
    {
        path: "/app/matches/:id",
        view: (params: Switch.Params) => html`
            <match-view match-id=${params.id}></match-view>
        `
    },
    {
        path: "/app/tournaments/:id",
        view: (params: Switch.Params) => html`
            <tournament-view tournament-id=${params.id}></tournament-view>
        `
    },
    {
        path: "/app/tournaments",
        view: () => html`
        <tournament-search-view></tournament-search-view>
      `
    },
    {
        path: "/app/tournaments/",
        redirect: "/app/tournaments"
    },
    {
        path: "/app/champions",
        view: () => html`
        <champion-search-view></champion-search-view>
        `
    },
    {
        path: "/app/champions/",
        redirect: "/app/champions"
    },
    {
        path: "/app/teams/:id",
        view: (params: Switch.Params) => html`
        <team-view team-id=${params.id}></team-view>
        `
    },
    {
        path: "/app/teams",
        view: () => html`
        <team-search-view></team-search-view>
      `
    },
    {
        path: "/app/teams/",
        redirect: "/app/teams"
    },
    {
        path: "/app/players",
        view: () => html`
        <player-search-view></player-search-view>
      `
    },
    {
        path: "/app/players/",
        redirect: "/app/teams"
    },
    {
        path: "/app/",
        view: () => html`
        <home-view></home-view>
      `
    },
    {
        path: "/app",
        view: () => html`<home-view></home-view>`
    },
    {
        path: "/",
        redirect: "/app"
    }
];

class AppElement extends LitElement {
    protected render() {
        return html`
        <mu-switch></mu-switch>
        `;
    }

    static styles = [
        css`
          :host {
            display: grid;
            grid-column: 1 / -1;
          }
        `
    ];

    connectedCallback(): void {
        super.connectedCallback();
        LensOfLegendsHeaderElement.initializeOnce();
    }
}

define({
    "mu-auth": Auth.Provider,
    "mu-history": History.Provider,
    "mu-store": class AppStore extends Store.Provider<Model,Msg> {
        constructor() {
        super(update, init, "lol:auth");
        }
    },
    "mu-switch": class AppSwitch extends Switch.Element {
        constructor() {
            super(routes, "lol:history", "lol:auth")
        }
    },
    "lol-app": AppElement,
    "lol-header": LensOfLegendsHeaderElement,
    "home-view": HomeViewElement,
    "tournament-search-view": TournamentSearchView,
    "tournament-view": TournamentView,
    "champion-search-view": ChampionSearchView,
    "team-search-view": TeamSearchView,
    // "team-view": TeamView,
    "player-search-view": PlayerSearchView,
    "match-view": MatchView,
    "match-edit": MatchEdit,
});