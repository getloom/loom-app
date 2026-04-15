import type { AccountId } from "./accountsService";

export interface ServerAccount {
    account_id: AccountId;
    username: string;
    password: string;
    salt: string;	
    created: Date;
    updated: Date | null;	
}