# Loom-app

This is the core application that drives Loom's programmable social platform.

## Developing

Once you've cloned the project and installed dependencies with `npm install` start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

You'll also need to make sure you have docker (or other containerization tools) are installed on you system.

The front end is [Svelte-UX](https://svelte-ux.techniq.dev/)

To test locally with a running Keycloak instance, use

```sh
docker compose up keycloak
```


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
