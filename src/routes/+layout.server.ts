import { defaultPostgresOptions } from "$lib/db/postgres";
import { SpaceRepo } from "$lib/system/spaces/spacesRepo";
import postgres from "postgres";

export async function load() {
	const spaces = await new SpaceRepo(postgres(defaultPostgresOptions)).getAll();    
    return {spaces: spaces};
}