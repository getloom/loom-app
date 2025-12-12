# Concepts
This doc tracks some of the core vocabulary from the Loom v1 project and describes how it has (or hasn't changed) in v2

## Accounts, Actors, Roles, Policies, Assignments

Where Loom previously managed all of these concepts, this work has now been off-loaded to Keycloak.

Accounts are made and managed via Keycloak.

Actors no longer exist as a concept in the system. While an interesting & ambitious idea, they introduced too much complexity.

Roles, policies & assignements are now also all made and managed via Keycloak.

## Hubs & Spaces

The original concept for Hubs was to cover a perceived use case where an organization grew large enough that it needed to start budding/subdividing.

Essentially if your org reached a certain size, you might want a new Hub, where admins have full control over it, but it draws on the same user database as the original, solving the problem that oftens happens in communities where users are lost in the shuffle of having to make a new account.

It also introduced a lot of complexity up front to solve a problem that no Loom community ever encountered.

Instead, I think the idea of a Hub should be coterminous with a single Loom container(or subdomain, or DB context) and then in a future state, we can build infra that leverages Keycloak's federation to allow for new Loom hubs to be spun up, but within the same instance and drawing from a similar user pool.

So in that case, the first core data model that Loom needs to deal with is Spaces.

Spaces in this case though I think will be mostly the same. They have a name, an icon, and either they will encompose a small, Svelte component that draws on the lightweight Entity/Tie system, or they will point out to an off-Loom service that has been configured to A) run in a container & B) talk to the Keycloak instance.

## Entities & Ties
<TBD>