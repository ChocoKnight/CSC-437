"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var user_exports = {};
__export(user_exports, {
  UserPage: () => UserPage
});
module.exports = __toCommonJS(user_exports);
var import_server = require("@calpoly/mustang/server");
var import_renderPage = __toESM(require("./renderPage"));
class UserPage {
  data;
  constructor(data) {
    this.data = data;
  }
  render() {
    return (0, import_renderPage.default)({
      body: this.renderBody(),
      scripts: [
        `
            import { define, Auth } from "@calpoly/mustang";
            import { HeaderElement } from "/scripts/header.js";
            import { UserProfileElement } from "/scripts/user.js";
    
            define({
                "lol-header": HeaderElement,
                "user-profile-element": UserProfileElement,
                "mu-auth": Auth.Provider,
            });

            HeaderElement.initializeOnce();
            `
      ],
      styles: []
    });
  }
  renderBody() {
    const base = "/api/travelers";
    const api = this.data ? `${base}/${this.data.username}` : base;
    return import_server.html`<body>
          <mu-auth provides="lol:auth">
            <lol-header></lol-header>
            <main class="page">
                <user-profile-element> </user-profile-element>
            </main>
          </mu-auth>
        </body>`;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserPage
});
