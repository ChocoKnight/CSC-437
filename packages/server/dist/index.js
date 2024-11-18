"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_express = __toESM(require("express"));
var import_auth = require("./pages/auth");
var import_match = require("./pages/match");
var import_match_svc = __toESM(require("./services/match-svc"));
var import_match2 = __toESM(require("./routes/match"));
var import_user = require("./pages/user");
var import_user_svc = __toESM(require("./services/user-svc"));
var import_user2 = __toESM(require("./routes/user"));
var import_auth2 = __toESM(require("./routes/auth"));
var import_mongo = require("./services/mongo");
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
(0, import_mongo.connect)("LoL");
const staticDir = process.env.STATIC || "public";
app.use(import_express.default.static(staticDir));
app.use(import_express.default.json());
app.use("/auth", import_auth2.default);
app.use("/api/users", import_auth2.authenticateUser, import_user2.default);
app.use("/api/matches", import_match2.default);
app.get("/login", (req, res) => {
  const page = new import_auth.LoginPage();
  res.set("Content-Type", "text/html").send(page.render());
});
app.get("/users/:username", (req, res) => {
  const { username } = req.params;
  import_user_svc.default.get(username).then((data) => {
    const page = new import_user.UserPage(data);
    res.set("Content-Type", "text/html").send(page.render());
  });
});
app.get("/matches/:matchId", (req, res) => {
  const { matchId } = req.params;
  import_match_svc.default.get(matchId).then((data) => {
    res.set("Content-Type", "text/html").send(new import_match.MatchPage(data).render());
  });
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
