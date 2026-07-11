# Hello Again Challenge

A small loyalty app built with React Native and Expo. Users can sign in/out, view their profile and points balance, browse and redeem rewards, and scan a coupon QR code to receive points.

https://github.com/user-attachments/assets/3d95ecfc-e736-4d3f-b95e-ec7e8ec5518f

## Run locally

1. Install dependencies:

   ```bash
   bun install
   ```

2. Create native folders:

   ```bash
   bun prebuild
   ```

3. Install and run the build:

   For iOS:

   ```bash
   bun ios
   ```

   Or for Android:

   ```bash
   bun android
   ```

## Tooling

- Expo and Expo Router for the application and navigation
- TanStack Query for server state, caching, and request invalidation
- Axios for API requests
- Jotai and Expo SecureStore for local state and storage
- NativeWind, Tailwind CSS, and react-native-css for styling
- Reanimated and Expo Haptics for interaction feedback
- Expo Camera for QR code scanning
- React Native Render HTML for reward descriptions

## AI tooling

Agents:

- Codex 5.6

Skills:

- Native Data Fetching
- Tailwind Setup
- Expo UI

## Development overview

1. Initialize the Expo project.
2. Setup Biome.js for linting and formatting.
3. (Prompt) Add basic Nativewind setup.
4. (Prompt) Add TanStack Query + Axios. Looking at the available endpoints - setup the api foundation and helpers (queries/hooks).
5. Manual adjustments followed by AI code review.
6. (Prompt) Create basic components: text, input, button, page, etc.
7. (Prompt) Implement login screen (layout + logic).
8. Use Jotai to handle local session state, update api headers and save the token to the storage.
9. (Prompt) Do a code review.
10. (Prompt) Start building the home screen. Add logout button and build a user profile card.
11. Review and refine.
12. (Prompt) Build number component to "animate" number value when it is changing.
13. (Prompt) Add "Score" and "Scan Code" cards.
14. Manual adjustments followed by AI code review.
15. (Prompt) Add pull-to-refresh.
16. (Prompt) Implement loading bounties/rewards.
17. (Prompt) Add react-native-html to parse reward descriptions.
18. Review and refine.
19. (Prompt) Add QR code scanning using Expo Camera and a native form sheet screen.
20. Camera permissions adjustments.
21. Refactor, polish and AI code review.
22. (Prompt) Add minimal E2E tests with Maestro.
