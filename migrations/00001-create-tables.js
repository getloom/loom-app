export const up = async (sql) => {
	await sql`
        create table if not exists spaces (
			space_id serial primary key,
			name text,
			view text,
			icon text,
			created timestamp NOT NULL DEFAULT now(),
			updated timestamp
		)	
	`;
};