export type AccountId = number;

/**
 * <Vocab name="Account" />s are the representation of users within the Loom framework.
 */
export interface Account {
	account_id: AccountId;
	username: string;
	password: string;
	created: Date;
	updated: Date | null;	
}