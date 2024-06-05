"use server"
import { TStrapiAccountsApiResponse } from "@/interfaces/collections/account";
import { getAuthToken, getStrapiUrl } from "@/lib/api";
import { revalidateTag } from "next/cache";

export async function revalidateFindUserAccounts() {
    revalidateTag('collectionAccounts')
}

export async function findUserAccountService(): Promise<TStrapiAccountsApiResponse | TStrapiErrorsApiResponse> {
    try {
        const response = await fetch(getStrapiUrl(`/api/accounts/findUserAccounts`), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`,
            },
            cache: 'no-cache',
            next: { tags: ['collectionAccounts'] }
        });
        const accounts: TStrapiAccountsApiResponse | TStrapiErrorsApiResponse = await response.json();
        return accounts;
    } catch (error) {
        console.error('Erreur:', error);
        throw error;
    }
}

export async function depositAccountService({amountDeposit, accountId}: {amountDeposit: number, accountId: number}): Promise<TStrapiAccountsApiResponse | TStrapiErrorsApiResponse> {
    try {
        const response = await fetch(getStrapiUrl(`/api/accounts/deposit`), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`,  
            },
            body: JSON.stringify({
                amountDeposit,
                accountId
            })
        });
        const account: TStrapiAccountsApiResponse | TStrapiErrorsApiResponse = await response.json();
        return account;
    } catch (error) {
        console.error('Erreur:', error);
        throw error;
    }
}
export async function withdrawalAccountService({amountWithdrawal, accountId}: {amountWithdrawal: number, accountId: number}): Promise<TStrapiAccountsApiResponse | TStrapiErrorsApiResponse> {
    try {
        const response = await fetch(getStrapiUrl(`/api/accounts/withdrawal`), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`,  
            },
            body: JSON.stringify({
                amountWithdrawal,
                accountId
            })
        });
        const account: TStrapiAccountsApiResponse | TStrapiErrorsApiResponse = await response.json();
        return account;
    } catch (error) {
        console.error('Erreur:', error);
        throw error;
    }
}

export async function transferBetweenUserAccountService({accountIdFrom, accountIdTo, amountTransfer}: {accountIdFrom: number, accountIdTo: number, amountTransfer: number}): Promise<TStrapiAccountsApiResponse | TStrapiErrorsApiResponse> {
    try {
        const response = await fetch(getStrapiUrl(`/api/accounts/transferBetweenUserAccount`), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`,  
            },
            body: JSON.stringify({
                accountIdFrom,
                accountIdTo,
                amountTransfer
            })
        });
        const accounts: TStrapiAccountsApiResponse | TStrapiErrorsApiResponse = await response.json();
        return accounts;
    } catch (error) {
        console.error('Erreur:', error);
        throw error;
    }
}

