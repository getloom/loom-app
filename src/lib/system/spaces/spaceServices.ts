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