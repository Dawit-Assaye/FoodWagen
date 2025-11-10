# FoodWagen Monorepo

FoodWagen is a monorepo prepared for the CoreDev Interviews 2025 web assessment. It mirrors the structural patterns of the `africa-cdc` and `kgi` projects—combining shared tooling packages with an apps workspace—and ships with a fully-functional Next.js 14 web experience for managing food items via the provided MockAPI service.

- **Frontend Framework:** Next.js 14 (App Router, TypeScript, React Query)
- **Design System:** Tailwind CSS with enforced `food-` class prefix and reusable UI components in `@foodwagen/ui`
- **Form + Validation:** React Hook Form + Zod schemas fulfilling the assessment’s validation copy and accessibility rules
- **Testing:** Vitest + Testing Library with mocked API interactions
- **Tooling Packages:** Shareable ESLint, Prettier, Tailwind, and TypeScript configs under `tooling/*`

## Repository Layout

```
.
├── apps/
│   └── web/                 # Next.js application implementing FoodWagen UI
├── packages/
│   ├── config/              # Environment helpers (API base URL resolution)
│   ├── types/               # Shared TypeScript models for food & restaurant entities
│   └── ui/                  # Headless + Tailwind-ready UI primitives (buttons, inputs, modals, spinners)
├── tooling/                 # Shareable linting/formatting/Tailwind/TypeScript configs
├── package.json             # Yarn 4 workspace + Turbo pipeline scripts
├── turbo.json               # Pipeline configuration
└── tsconfig.base.json       # Base compiler options reused by workspaces
```

This structure keeps parity with existing monorepos by separating domain packages from application code while centralising linting and formatting controls.

## Getting Started

1. **Install dependencies**
   ```bash
   corepack enable
   yarn install
   ```

2. **Run the web app**
   ```bash
   yarn web:dev
   ```

   Visit `http://localhost:3000` to interact with the FoodWagen dashboard.

3. **Environment Variables (optional)**

   The mock API base URL defaults to `https://6852821e0594059b23cdd834.mockapi.io`. Override it by creating an `.env.local` file inside `apps/web`:

   ```
   NEXT_PUBLIC_FOOD_API_BASE_URL=https://your-custom-endpoint
   ```

## Available Scripts

| Command                | Description                                                                   |
|------------------------|-------------------------------------------------------------------------------|
| `yarn dev`             | Runs all `dev` scripts with Turbo (ideal for multi-app development)          |
| `yarn web:dev`         | Starts the FoodWagen Next.js app only                                         |
| `yarn build`           | Builds every workspace using Turbo                                            |
| `yarn lint`            | Executes ESLint across all packages                                          |
| `yarn format`          | Runs Prettier in check mode across the monorepo                              |
| `yarn test`            | Runs Vitest test suites (component render, interaction, API mocking)         |
| `yarn typecheck`       | Aggregated TypeScript project references type checks                         |

Each workspace (`apps/web`, `packages/*`, `tooling/*`) also exposes local scripts—refer to their `package.json` files for details.

## Assessment Alignment

- **UI & Styling**
  - Tailwind configuration enforces a `food-` prefix for all utility classes.
  - Cards follow mandated class names (`.food-name`, `.food-rating`, `.restaurant-status`, etc.) and include required slide-up + hover animations.
  - Modals render full-width on mobile, centered on desktop, with explicit “Cancel / Add / Update / Delete” button labels and loading states (e.g., “Adding Food…”).

- **Forms & Validation**
  - Inputs honour required `name` attributes (e.g., `food_name`, `restaurant_status`), descriptive placeholders, and label associations.
  - Error messaging follows the provided copy and IDs (`food-name-error`, `restaurant-status-error`, ...). Failed submissions keep the modal open and surface API error messages.

- **Data & State**
  - All API calls go through the shared MockAPI endpoints via a typed data layer in `apps/web/src/features/foods/api.ts`.
  - React Query handles caching, refetching, loading indicators, and mutation flows.
  - Empty states, loading states, and error surfaces match the spec.

- **Testing**
  - Three core scenarios covered:
    1. Component rendering (`FoodCard` displays food + restaurant data).
    2. User interaction (`FoodForm` submission + form reset).
    3. API mocking (`fetchFoods` with mocked `fetch`).

## Next Steps

The project is ready for deployment (e.g., Vercel) once dependencies are installed. Prior to submission:

1. Run `yarn lint`, `yarn test`, and `yarn build`.
2. Configure CI/CD using the existing workspace templates if desired.
3. Deploy `apps/web` to Vercel (or preferred host) targeting the `main` branch.

Happy coding!