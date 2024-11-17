import { css, define, html, shadow, Form, InputArray, Observer } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import header from "./styles/header.css.js";

export class UserProfileElement extends HTMLElement {
    // static uses = define({
    //     "mu-form": Form.Element,
    //     "input-array": InputArray.Element
    // });

    static template = html`
    <template>
        <h2> User </h2>
    </template>`;

    static styles = css`
    :host {
    }
  `;

    constructor() {
        super();
        shadow(this)
            .template(UserProfileElement.template)
            .styles(
                reset.styles,
                header.styles,
                UserProfileElement.styles
            );
    }
}