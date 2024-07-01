# Polar Edge

## Description

Polar Edge is a scouting application for _FIRST_ Robotics Competition, built by Team 3506, YETI Robotics.

## Installation

This project uses Supabase for database/backend services, and Next.js for frontend.

### Prerequisites

-   [Node.js](https://nodejs.org/en/download/package-manager) (installed using nvm is even better)
-   [Docker Desktop](https://www.docker.com/products/docker-desktop/) — This requires WSL on Windows devices. Windows install instructions can be found [here](https://docs.docker.com/desktop/install/windows-install/)
-   [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started)

### Setting Up the Project

Once the prerequisites have been installed, create a file in the root directory named `.env.local`. This file will store private keys and other items required for the application to function. Copy the content from `.env.example` and past it into `.env.local`. To get the keys required for Discord OAuth to work, you will need to join the YETI Scouting Discord team. The anon key can be found in your terminal after running `supabase start`. If supabase is already running, you will need to restart after updating the Discord OAuth keys.

Once keys are set up, you will need to run:

```bash
npm install # this installs the project's dependencies
```

Once completed, run

```bash
npm run dev
```

The server should now be running on `localhost:3000`!

## Storybook

This project uses Storybook for component development. This allows us to run interaction and accessibility tests on the components we develop. To use Storybook, run:

```bash
npm run storybook
```

The Storybook server should now be running on `localhost:6006`.
