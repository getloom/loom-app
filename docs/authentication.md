# Authentication

## Local Solution
Loom relies on a local Postgresql DB with an accounts table for initially managing accounts

You can
- Sign up for an account via the /signup route
- Sign in to existing accounts via the /signin route

In general though this flow will be deprecated in favor of assuming a prior existing SSO/Auth provider that can be integrated with via OIDC.

It will assume the existance of at least one user with the role of `founder` to assign the initial admin role to.

## SSO & OIDC

The authentication system for Loom would someday like to depend on a the open source project [Keycloak](https://github.com/keycloak/keycloak)

Ideally it would be compatable with any OAuth2/OIDC provider, but we're starting with a Keycloak integration since that's what we use.

The core use case involves the following:

- Managing user account creation (i.e. invites) & upkeep
- Managing user roles