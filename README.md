# Mars Cantina Tycoon

Mars Cantina Tycoon is a 2D top‑down management and simulation game built with
[Phaser 3](https://phaser.io/) and [Vite](https://vitejs.dev/). You own a
cantina on the red planet and must design the interior, manage power and
utilities, serve customers and turn a profit. The codebase is written in
TypeScript and uses data‑driven definitions for furniture, recipes and
customers.

## How to run locally

The project uses Node.js and npm. To clone the repository, install
dependencies and start a development server:

```sh
# 1. Clone the repo
git clone https://github.com/<your-username>/mars-cantina-tycoon.git
cd mars-cantina-tycoon

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
# Then open http://localhost:5173 in your browser
```

### Build & preview production

To create an optimised production build and preview it locally:

```sh
npm run build
npm run preview
```

The preview server runs on port 4173 by default.

## GitHub Pages deployment

This repository is configured to automatically deploy the production build to
GitHub Pages whenever you push to `main`. The CI workflow in
`.github/workflows/ci.yml` installs dependencies, lints the code, runs unit
tests with [Vitest](https://vitest.dev/) and smoke tests with
[Playwright](https://playwright.dev/), builds the project and publishes the
`dist` folder as a Pages artifact. The live game will be available at:

```
https://<your-username>.github.io/mars-cantina-tycoon/
```

If you change the repository name or publish under an organisation account,
update the `base` option in `vite.config.ts` to match the new path. In CI you
can set the `BASE_PATH` environment variable to override the base at build
time without editing the source.

## Scripts

| Command          | Description                                                        |
|------------------|--------------------------------------------------------------------|
| `npm run dev`    | Start a hot‑reloading development server via Vite                  |
| `npm run build`  | Produce a minified production build                                |
| `npm run preview`| Preview the production build locally                               |
| `npm test`       | Run unit tests with Vitest                                         |
| `npm run lint`   | Lint the source code with ESLint                                   |
| `npm run format` | Format the codebase with Prettier                                  |
| `npm run test:e2e` | Run smoke end‑to‑end tests with Playwright                       |

## Project structure

```
├── assets/                 # CC0 art assets used in the game
├── src/
│   ├── scenes/             # Phaser scenes (Boot, Preload, Menu, Game, HUD)
│   ├── build/              # Build‑mode controllers and UI (stubs)
│   ├── service/            # Service‑mode systems (stubs)
│   ├── core/               # Core systems: grid, economy, pathfinding, power, save
│   ├── data/               # JSON data definitions for furniture, recipes, customers
│   └── main.ts             # Entry point that bootstraps the Phaser game
├── tests/                  # Unit and end‑to‑end tests
├── index.html              # Vite entry HTML
└── ...
```

### Data‑driven design

Furniture, recipes and customers live in `src/data/*.json`. These objects are
loaded by the game at runtime and validated against their expected schema.
Adding new furniture or drinks is as simple as editing the JSON files and
supplying the corresponding sprite in `assets/furniture/`.

## Testing

Unit tests use Vitest and run in a jsdom environment. The test runner is
configured in `vite.config.ts`. To execute the test suite:

```sh
npm test
```

End‑to‑end tests use Playwright. The smoke test defined in
`tests/e2e/basic.spec.ts` builds the project, starts a preview server and
verifies that the game loads and renders a canvas element. Run these tests
with:

```sh
npm run test:e2e
```

## Linting & formatting

The codebase adheres to a strict style using ESLint and Prettier. The ESLint
configuration lives in `.eslintrc.cjs` and extends the recommended rule sets
for JavaScript, TypeScript and Prettier integration. Prettier options are
defined in `.prettierrc.json`. To lint or format the code:

```sh
npm run lint
npm run format
```

## Assets & credits

All art assets are stored in the `assets/` directory. Only [CC0] licensed
artwork is used. Where no suitable free asset was found, simple vector
placeholders are drawn at runtime. See `CREDITS.md` for a list of asset
sources and licences.