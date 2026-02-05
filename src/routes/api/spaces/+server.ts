import { defaultPostgresOptions } from '$lib/db/postgres.server';
import { SpaceRepo } from '$lib/system/spaces/spacesRepo.js';
import type { Space } from '$lib/system/spaces/spacesService.js';
import postgres from 'postgres';

//TODO
// seems like the most "Svelte" way to do this is to make this a page that returns results
// then make some post return work in the SpaceNavActions that confirms data and closes the display
// ideally it should also update the data underneath?
// it might also just be better to trigger a full page refresh on submission or something
// probably better to start with the API though for backend behavior, add some tests, then connect the front end stub to backend logic
export async function POST({request}): Promise<Space> {
    console.log(request);
    console.log("inside the api spaces routes")
	//needed input is name, icon & view type
    const {name, icon, view} = await request.json();
    //spin up the db
    const space = await new SpaceRepo(postgres(defaultPostgresOptions)).create(name, icon, view);
    return space;
}