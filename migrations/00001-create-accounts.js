export const up = async (sql) => {
	await sql`
        create table if not exists accounts (
			account_id serial primary key,
			username text UNIQUE,
			password text,
			salt text,			
			created timestamp NOT NULL DEFAULT now(),
			updated timestamp
		)	
	`;
};