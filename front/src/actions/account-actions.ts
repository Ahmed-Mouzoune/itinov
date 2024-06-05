"use server";
import { depositAccountService, revalidateFindUserAccounts, transferBetweenUserAccountService, withdrawalAccountService } from "@/services/AccountService";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

const schemaDeposit = z.object({
    amountDeposit: z
      .number()
      .min(10, {
        message: "The minimum deposit is 10 €",
      }),
    accountId: z
      .number()
      .min(1, {
        message: "accountId must have at least 1",
      })
      .max(1000, {
        message: "accountId must be between 1 and 100",
      }),
});
const schemaWithdrawal = z.object({
    amountWithdrawal: z
      .number()
      .min(1, {
        message: "The minimum withdrawal is 1 €",
      }),
    accountId: z
      .number()
      .min(1, {
        message: "accountId must have at least 1",
      })
      .max(1000, {
        message: "accountId must be between 1 and 100",
      }),
});
const schemaTransferBetweenUserAccounts = z.object({
    amountTransfer: z
      .number()
      .min(1, {
        message: "The minimum transfer is 1 €",
      }),
    accountIdFrom: z
      .number()
      .min(1, {
        message: "accountIdFrom must have at least 1",
      })
      .max(1000, {
        message: "accountIdFrom must be between 1 and 100",
      }),
    accountIdTo: z
      .number()
      .min(1, {
        message: "accountIdTo must have at least 1",
      })
      .max(1000, {
        message: "accountIdTo must be between 1 and 100",
      }),
});

export async function depositAccountAction(prevState: any, formData: FormData) {
    const validatedFields = schemaDeposit.safeParse({
        amountDeposit: Number(formData.get("amountDeposit")),
        accountId: Number(formData.get("accountId")),
    });
    if (!validatedFields.success) {
      return {
        // ...prevState,
        zodErrors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to deposit.",
      };
    }
    const responseData = await depositAccountService(validatedFields.data);
    if (!responseData) {
      return {
        // ...prevState,
        strapiErrors: null,
        zodErrors: null,
        message: "Ops! Something went wrong. Please try again.",
      };
    }
  
    if ('error' in responseData) {
      return {
        // ...prevState,
        strapiErrors: responseData.error,
        zodErrors: null,
        message: "Failed to Login.",
      };
    }
    await revalidateFindUserAccounts();
    return responseData;
}
export async function withdrawalAccountAction(prevState: any, formData: FormData) {
    const validatedFields = schemaWithdrawal.safeParse({
        amountWithdrawal: Number(formData.get("amountWithdrawal")),
        accountId: Number(formData.get("accountId")),
    });
    if (!validatedFields.success) {
      return {
        ...prevState,
        zodErrors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Login.",
      };
    }
    const responseData = await withdrawalAccountService(validatedFields.data);
    if (!responseData) {
      return {
        ...prevState,
        strapiErrors: null,
        zodErrors: null,
        message: "Ops! Something went wrong. Please try again.",
      };
    }
  
    if ('error' in responseData) {
      return {
        ...prevState,
        strapiErrors: responseData.error,
        zodErrors: null,
        message: "Failed to Login.",
      };
    }
    await revalidateFindUserAccounts();
    return responseData;
}
export async function transferBetweenUserAccountAction(prevState: any, formData: FormData) {
    const validatedFields = schemaTransferBetweenUserAccounts.safeParse({
        amountTransfer: Number(formData.get("amountTransfer")),
        accountIdFrom: Number(formData.get("accountIdFrom")),
        accountIdTo: Number(formData.get("accountIdTo"))
    });
    if (!validatedFields.success) {
      return {
        ...prevState,
        zodErrors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Login.",
      };
    }
    const responseData = await transferBetweenUserAccountService(validatedFields.data);
    if (!responseData) {
      return {
        ...prevState,
        strapiErrors: null,
        zodErrors: null,
        message: "Ops! Something went wrong. Please try again.",
      };
    }
  
    if ('error' in responseData) {
      return {
        ...prevState,
        strapiErrors: responseData.error,
        zodErrors: null,
        message: "Failed to Login.",
      };
    }
    await revalidateFindUserAccounts();
    return responseData;
}