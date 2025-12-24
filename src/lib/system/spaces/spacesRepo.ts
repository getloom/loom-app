import { Repo } from "$lib/db/repo";
import type { Space } from "$lib/system/spaces/spacesService";

//TODO replace with a proper logger system
const log = console;

export class SpaceRepo extends Repo {
    /**
	 * The space's directory is not yet created at this point,
	 * so it only returns the `space_id` and expects `init` to be called in the same transaction.
	 */
	async create(name: string, icon: string, view: string): Promise<Space> {
		const data = await this.sql<Space[]>`
			INSERT INTO spaces (name, icon, view) VALUES (
				${name}, ${icon}, ${view}
			) RETURNING space_id
		`;
		return data[0];
	}

    async read(space_id: number): Promise<Space | undefined> {
		log.debug(`[findById] ${space_id}`);
		const data = await this.sql<Space[]>`
			SELECT space_id, name, icon, view, created, updated
			FROM spaces WHERE space_id=${space_id}
		`;
		log.debug('[findById] result', data);
		return data[0];
	}

    async getAll(): Promise<Space[]> {
        log.debug(`[getAll] Spaces`);
		const data = await this.sql<Space[]>`
			SELECT space_id, name, icon, view, created, updated
			FROM spaces;
		`;
		log.debug('[getAll] Spaces result', data);
		return data;   
    }

    async update(
		space_id: number,
		partial: Partial<Pick<Space, 'name' | 'icon' | 'view'>>,
	): Promise<Space> {
		log.debug(`updating data for space: ${space_id}`);
		const data = await this.sql<Space[]>`
			UPDATE spaces
			SET updated=NOW(), ${this.sql(partial as any, ...Object.keys(partial))}
			WHERE space_id=${space_id}
			RETURNING *
		`;
		if (!data.count) throw Error('no space found');
		return data[0];
	}

	async delete(space_id: number): Promise<void> {
		log.debug('[deleteById]', space_id);
		const data = await this.sql`
			DELETE FROM spaces WHERE space_id=${space_id}
		`;
		if (!data.count) throw Error('no space found');
	}

}