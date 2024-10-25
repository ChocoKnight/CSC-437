import { css } from "@calpoly/mustang";

const styles = css`
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        // font-family: var(--font-family-display);
    }

    h1 {
        font-size: var(--size-type-xxlarge);
        font-weight: var(--font-weight-bold);
    }

    h2 {
        font-size: var(--size-type-xlarge);
        font-weight: var(--font-weight-bold);
    }

    h3 {
        font-size: var(--size-type-large);
        font-weight: var(--font-weight-normal);
        font-style: oblique;
    }

    h4 {
        font-size: var(--size-type-mlarge);
        font-weight: var(--font-weight-bold);
    }

    h5 {
        font-size: var(--size-type-body);
        font-weight: var(--font-weight-bold);
    }

    h6 {
        font-size: var(--size-type-body);
        font-weight: var(--font-weight-normal);
        font-style: italic;
    }

    header a {
        color: var(--color-link);
    }

    a:link {
        text-decoration: none;
    }

    a:visited {
        text-decoration: none;
    }

    a:hover {
        text-decoration: none;
        color: var(--color-text-important);
    }

    a:active {
        text-decoration: none;
    }
    `;

export default { styles };