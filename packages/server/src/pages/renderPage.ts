import { PageParts, renderWithDefaults } from "@calpoly/mustang/server";

const defaults = {
    stylesheets: [
        "/styles/reset.css",
        "/styles/tokens.css",
        "/styles/page.css"
    ],
    styles: [],
    scripts: [
        `import { define } from "@calpoly/mustang";
        import { HeaderElement } from "/scripts/header.js";

        define({
        "lol-header": HeaderElement
        });

        HeaderElement.initializeOnce();
        `
    ],
    googleFontURL: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Play:wght@400;700&display=swap",
    imports: {
        "@calpoly/mustang": "https://unpkg.com/@calpoly/mustang"
    }
};

export default function renderPage(page: PageParts) {
    return renderWithDefaults(page, defaults);
}