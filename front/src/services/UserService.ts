"use server";
import { getAuthToken, getStrapiUrl } from "@/lib/api";

export async function loginUserService({identifier, password}: {identifier: string, password: string}): Promise<TStrapiUserApiResponse | TStrapiErrorsApiResponse> {
    try {
        const response = await fetch(getStrapiUrl(`/api/auth/local`), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                identifier,
                password
            }),
            cache: 'no-cache'
        });
        const user: TStrapiUserApiResponse | TStrapiErrorsApiResponse = await response.json();
        return user;
    } catch (error) {
        throw error;
    }
}
export async function getMeUserService(): Promise<IUser | TStrapiErrorsApiResponse | null> {
    const authToken = await getAuthToken();
    if (!authToken) return null;

    try {
        const response = await fetch(getStrapiUrl(`/api/users/me`), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
            cache: 'no-cache'
        });
        const user: IUser | TStrapiErrorsApiResponse = await response.json();
        return user;
    } catch (error) {
        throw error;
    }
}