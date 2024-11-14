import { css, html } from "@calpoly/mustang/server";
import renderPage from "./renderPage"; // generic page renderer

export class LoginPage {
    render() {
        return renderPage({
            scripts: [
                `
              import { define, Auth } from "@calpoly/mustang";
              import { LoginForm } from "/scripts/login_form.js";
      
              define({
                "mu-auth": Auth.Provider,
                "login-form": LoginForm
              })
              `
            ],
            styles: [
                css`
                /* your CSS here */
              `
            ],
            body: html`
              <body>
                <mu-auth provides="lol:auth">
                  <article>
                    <lol-header></lol-header>
                    <main class="page">
                      <login-form api="/auth/login">
                        <h3 slot="title">Sign into Lens of Legends</h3>
                      </login-form>
                    </main>
                  </article>
                </mu-auth>
              </body>
            `
        });
    }
}

// <p class="register">
//                         Or did you want to
//                         <a href="./register">
//                           register as a new user
//                         </a>
//                         ?
//                       </p>