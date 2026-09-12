# Loom-app

This is the core template that drives Loom's programmable social platform applications.

It provides the core styling & OAuth2 integrations, as well as a DB migrations framework.

## Developing

Before you start developing, you'll first need to make sure you have a keycloak instance & postgres to work with locally.

You'll need to make sure you have docker (or other containerization tools) are installed on you system.

To test locally with a running Keycloak instance & Postgres DB, use

```sh
docker compose up -d
```
Then follow the instructions below for setting up Keycloak sign-in locally

Once you've cloned the project and installed dependencies with `npm install` start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Make a copy of the .env.example file to have local env variables setup. The defaults should work with the docker-compose stack.

Run
```sh
npm run db:migrate
```
to get your DB schema up to date.




### Setting up Keycloak sign-in locally

To use "Sign in with Keycloak", you need to create import a realm and create a client by hand

1. `docker compose up`, then open the Keycloak admin console at `http://localhost:8080` and log in with `admin`/`admin`.
2. Use these commands at dir root to set the default "loom" realm & roles 
```
TOKEN=$(curl -sf -X POST \
  "http://localhost:8080/realms/master/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "client_id=admin-cli&username=admin&password=admin&grant_type=password" \
  | jq -r '.access_token')

curl -sf -X POST \
  "http://localhost:8080/admin/realms" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "@realm-export.json"

```
3. In that realm, create a confidential client with the client ID matching `OIDC_CLIENTID` (`loom-app` by default), with:
   - **Valid redirect URI**: `http://localhost:5173/auth/keycloak/callback` (the SvelteKit dev server's default port)
   - **Valid post logout redirect URI**: `http://localhost:5173/signin`
   - A dedicated scope that maps realm roles
4. Copy the client's secret (Keycloak admin console → client → Credentials tab) into `OIDC_SECRET` in your `.env`.
5. Set `COOKIE_KEYS` in your `.env` to three `__`-delimited secrets in the form `latest_secret_<random>__older_secret_<random>__oldest_secret_<random>` — these back the encrypted Keycloak session cookie. See `docs/authentication.md` for details.
6. Configure an original user in the keycloak loom realm as well for initial admin testing purposes.


## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

To build a test docker image, run

```sh
npm run build:image
```

And then test it runs with

```sh
docker run -p 3000:3000 loom-app
```

To test that it runs properly alongside keycloak you can use

```sh
docker compose up
```

## Production

Loom utilizes Docker, docker-compose, & the OCI format for production deployments.

Once you've built your image, you can use the following command to test a full production stack locally.

We recommend following this guide for getting set up on Docker: https://linuxiac.com/how-to-install-docker-on-linux-mint-21/

```
docker compose up
```

## Dependencies

Keycloak

Postgresql
