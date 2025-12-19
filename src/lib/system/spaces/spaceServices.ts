export type SpaceId = number;

/**
 * <Vocab name="Space" />s are subdivisions within a <Vocab name="Hub" /> that hold a View.
 * The View is used to interpret, visualize, and manipulate the <Vocab name="Entity" />s connected to the directory or holds a reference to an external application.
 * Each is a Svelte component that conforms to the View interface.
 */
export interface Space {
	space_id: SpaceId;
	name: string;
	icon: string;
	view: string;
	created: Date;
	updated: Date | null;	
}
// FROM LOOM table description, trimed to match v2 expectations
//     Column    |            Type             | Collation | Nullable |                 Default                  
// --------------+-----------------------------+-----------+----------+------------------------------------------
//  space_id     | integer                     |           | not null | nextval('spaces_space_id_seq'::regclass)
//  name         | text                        |           |          | 
//  view         | text                        |           |          | 
//  created      | timestamp without time zone |           | not null | now()
//  updated      | timestamp without time zone |           |          | 
//  icon         | text                        |           | not null | '🖊'::text
// Indexes:
//     "spaces_pkey" PRIMARY KEY, btree (space_id)
//     "spaces_directory_id_idx" btree (directory_id)
// Referenced by:
//     TABLE "entities" CONSTRAINT "entities_space_id_fkey" FOREIGN KEY (space_id) REFERENCES spaces(space_id) ON UPDATE CASCADE ON DELETE CASCADE


// create table if not exists spaces (
// 			space_id serial primary key,
// 			name text,
// 			view text,
// 			icon text,
// 			created timestamp NOT NULL DEFAULT now(),
// 			updated timestamp
// 		)	