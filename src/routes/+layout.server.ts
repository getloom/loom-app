import { defaultPostgresOptions } from "$lib/db/postgres.server";
import { AccountRepo } from "$lib/system/accounts/accountsRepo";
import postgres from "postgres";

export async function load() {
    const users = await new AccountRepo(postgres(defaultPostgresOptions)).getAll();    
    return {users: users};
}