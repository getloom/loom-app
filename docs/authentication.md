# Authentication

## Local Solution
Loom relies on a local Postgresql DB with an accounts table for initially managing accounts

You can
- Sign up for an account via the /signup route
- Sign in to existing accounts via the /signin route

## SSO & OIDC

The authentication system for Loom would someday like to depend on a the open source project [Keycloak](https://github.com/keycloak/keycloak)

The core use case involves the following:

- Managing user account creation & upkeep
- Managing user roles