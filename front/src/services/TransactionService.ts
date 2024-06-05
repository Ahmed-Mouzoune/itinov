"use server"
import { getAuthToken, getStrapiUrl } from "@/lib/api";
import { revalidateTag } from "next/cache";


const API_BASE_URL = getStrapiUrl(); // Remplacez par l'URL de votre API

export async function revalidateFindTransactionsUser() {
  revalidateTag('collectionAccounts')
}

export async function findTransactionsUserService(): Promise<TStrapiTransactionsApiResponse | TStrapiErrorsApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/transactions/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      cache: 'no-cache',
      next: { tags: ['collectionTransactions'] }
    });
    const transactions: TStrapiTransactionsApiResponse = await response.json();
    return transactions;
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
}