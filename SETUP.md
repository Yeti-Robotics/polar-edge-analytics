# Setup instructions

## Node.js installation

Head on over to the [node.js](https://nodejs.org) website and download the LTS version of node.js and run the installer

## NVM installation (optional)

For users that want to upgrade their node.js installation more easily, check out [NVM](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) to more easily upgrade your nodejs version


## Docker Desktop installation

[Docker Desktop](https://www.docker.com/products/docker-desktop/) — This requires WSL on Windows devices. Windows install instructions can be found [here](https://docs.docker.com/desktop/install/windows-install/)

## Supabase installation

[Supabase CLI](https://supabase.com/docs/guides/cli/getting-started) installation instructions are here.

Note that for Windows users, the CLI must be installed
within WSL, so use the Linux installation instructions. 

## Project setup

### Create environment file

Copy the `.env.example` file, and rename it to `.env.development` 

**DO NOT COMMIT THIS FILE PUBLICLY**, as it will contain sensitive keys

### Discord Application Creation

Navigation to the [Discord Developer Portal](https://discord.com/developers/applications) and sign in with your discord account, then click on the new application button

<img src="./docs/setup/new_application.png" />

You can name this application anything you want, we've named it YETI Scouting

You will then be taken to the application screen. Click on OAuth2, and copy the values in client information, as shown below.

<img src="./docs/setup/oauth2.png" />

In your environment file, replace `SUPABASE_AUTH_DISCORD_CLIENT_ID` with your Discord Client ID and `SUPABASE_AUTH_DISCORD_SECRET` with you Discord Client secret

Under the **redirects** section, click add redirect, and then
copy  `NEXT_PUBLIC_SUPABASE_REDIRECT_URL` value from your environment file into the URL box. This will be the URL that discord redirects to after authorizing a user.

### Supabase startup

Open a terminal and run `supabase start`

The first time you run this command, it will take some time for Docker to setup the containers needed to run the scouting site

Once it's done, however, you will see an output similar to the following: 

```
Started supabase local development setup.

         API URL: http://127.0.0.1:54321
     GraphQL URL: http://127.0.0.1:54321/graphql/v1
  S3 Storage URL: http://127.0.0.1:54321/storage/v1/s3
          DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
      Studio URL: http://127.0.0.1:54323
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
   S3 Access Key: 625729a08b95bf1b7ff351a663f3a23c
   S3 Secret Key: 850181e4652dd023b7a98c58ae0d2d34bd487ee0cc3254aed6eda37307425907
       S3 Region: local
```

In your environment file:

Copy the following output values to your environment file:
`DB URL` to `POSTGRES_URL`
`anon key` to `NEXT_PUBLIC_SUPABASE_ANON_KEY`
`API URL` to `NEXT_PUBLIC_SUPABASE_URL`

To stop running supabase, type `supabase stop` into your terminal.

### Run the scouting site

Once supabase is setup and running, in the project's root directory, run:

```bash
npm install # this installs the project's dependencies
```

Once completed, run

```bash
npm run dev
```

The server should now be running on `localhost:3000`!

#### Storybook

This project uses Storybook for component development. This allows us to run interaction and accessibility tests on the components we develop. To use Storybook, run:

```bash
npm run storybook
```

The Storybook server should now be running on `localhost:6006`.