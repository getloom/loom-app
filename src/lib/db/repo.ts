import type {PostgresSql} from '$lib/db/postgres.js';

export class Repo {
	constructor(		
		public readonly sql: PostgresSql,
	) {}
}