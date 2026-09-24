# Nuxt Minimal Starter

## Valanalys

The Helsingborg 2026 election analysis is generated from the `Personroster`
sheet in the source workbook. The website only reads the generated JSON file
at `public/data/val-2026-helsingborg.json`.

To regenerate it after replacing the source workbook:

```bash
python scripts/convert-valanalys.py "path/to/Valanalys ME.xlsx" public/data/val-2026-helsingborg.json
```

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
