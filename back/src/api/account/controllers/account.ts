/**
 * account controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::account.account', ({ strapi }) => ({
    async findUserAccounts(ctx) {
        try {
            const userId = ctx.state.user.id;
            const entries = await strapi.entityService.findMany('api::account.account', {
                filters: {
                    users_permissions_user: {
                      id: userId
                    }
                }
            });
            return this.transformResponse(entries)
        } catch (error) {
            return ctx.internalServerError();
        }
    },
    async findOneUserAccount(ctx) {
        try {
            const { accountId } = ctx.request.params;
            if (!accountId) return ctx.badRequest('Parameters is missing !');
            const userId = ctx.state.user.id;

            const entry = await strapi.entityService.findOne('api::account.account', accountId, {
                populate: {
                    users_permissions_user: true
                }
            });
            if (entry && entry.users_permissions_user.id !== userId) return ctx.forbidden();
            return this.transformResponse(entry)
        } catch (error) {
            return ctx.internalServerError();
        }
    },
    async deposit(ctx) {
        try {
            const userId = ctx.state.user.id;
            const { accountId, amountDeposit } = ctx.request.body;
            if (!accountId || !amountDeposit) return ctx.badRequest('Parameters is missing !');
            const account = await strapi.entityService.findOne('api::account.account', accountId, {
                fields: ['balance'],
                // fields: ['balance','users_permissions_user'],
                populate: {
                    users_permissions_user: true
                }
            });
            const newAmount = account.balance + amountDeposit;
            if (!account) return ctx.notFound();
            if (account.users_permissions_user.id !== userId) return ctx.forbidden();
            const entry = await strapi.entityService.update('api::account.account', accountId, {
                data: {
                    balance: newAmount.toFixed(2)
                }
            });
            await strapi.entityService.create('api::transaction.transaction', {
              data: {
                type: "deposit",
                amount: amountDeposit,
                account_debtor: accountId
              },
              populate: {
                account_debtor: true,
                account_creditor: true
              }
            })
            return this.transformResponse(entry)
        } catch (error) {
            return ctx.internalServerError();
        }
    },
    async withdrawal(ctx) {
        try {
            const userId = ctx.state.user.id;
            const { accountId, amountWithdrawal } = ctx.request.body;
            if (!accountId || !amountWithdrawal) return ctx.badRequest('Parameters is missing !');
            const account = await strapi.entityService.findOne('api::account.account', accountId, {
                fields: ['balance'],
                populate: {
                    users_permissions_user: true
                }
            });
            if (!account) return ctx.notFound();
            if (account.users_permissions_user.id !== userId) return ctx.forbidden();
            const newAmount = account.balance - amountWithdrawal;
            if (newAmount < 0) return ctx.badRequest('Vous ne pouvez pas être à découvert');
            const entry = await strapi.entityService.update('api::account.account', accountId, {
                data: {
                    balance: newAmount.toFixed(2)
                }
            });
            await strapi.entityService.create('api::transaction.transaction', {
              data: {
                type: "withdrawal",
                amount: amountWithdrawal,
                account_creditor: accountId
              },
              populate: {
                account_debtor: true,
                account_creditor: true
              }
            })
            return this.transformResponse(entry)
        } catch (error) {
            return ctx.internalServerError();
        }
    },
    async transferBetweenUserAccount(ctx) {
        try {
            const { accountIdFrom, accountIdTo, amountTransfer } = ctx.request.body;
            if (!accountIdFrom || !accountIdTo || !amountTransfer) return ctx.badRequest('Parameters is missing !');
            const userId = ctx.state.user.id;
            const accountUsers = await strapi.entityService.findMany('api::account.account', {
                filters: {
                    users_permissions_user: {
                        id: userId
                    }
                }
            });
            const accountFrom = accountUsers.find((account) => account.id === accountIdFrom);
            const accountTo = accountUsers.find((account) => account.id === accountIdTo);
            if (!accountFrom || !accountTo) return ctx.notFound();
            const newAmountAccountFrom = accountFrom.balance - amountTransfer;
            const newAmountAccountTo = accountTo.balance + amountTransfer;
            if (newAmountAccountFrom < 0) return ctx.badRequest(`Vous ne pouvez pas être à découverts !`);
            const entryAccountFrom = await strapi.entityService.update('api::account.account', accountIdFrom, {
                data: {
                    balance: newAmountAccountFrom.toFixed(2)
                }
            });
            const entryAccountTo = await strapi.entityService.update('api::account.account', accountIdTo, {
                data: {
                    balance: newAmountAccountTo.toFixed(2)
                }
            });
            await strapi.entityService.create('api::transaction.transaction', {
              data: {
                type: "transfer",
                amount: amountTransfer,
                account_debtor: accountIdTo,
                account_creditor: accountIdFrom,
              },
              populate: {
                account_debtor: true,
                account_creditor: true
              }
            });
            const newAccounts = await strapi.entityService.findMany('api::account.account', {
                filters: {
                    $and: [
                        {
                            $or: [
                                {
                                    id: { $eq: accountIdFrom}
                                },
                                {
                                    id: { $eq: accountIdTo}
                                },
                            ]
                        },
                        {
                            users_permissions_user: {
                                id: userId
                            }
                        }
                    ]
                }
            });
            return this.transformResponse(newAccounts)
        } catch (error) {
            return ctx.internalServerError();
        }
    },
    // TODO
    async userTransactions(ctx) {
        try {
            const { accountId } = ctx.request.params;
            const userId = ctx.state.user.id;

            const entry = await strapi.entityService.findOne('api::account.account', accountId, {
                populate: {
                    users_permissions_user: true
                }
            });
            if (entry && entry.users_permissions_user.id !== userId) return ctx.forbidden();
            return this.transformResponse(entry)
        } catch (error) {
            return ctx.internalServerError();
        }
    },
}));
