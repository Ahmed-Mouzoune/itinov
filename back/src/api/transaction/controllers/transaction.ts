/**
 * transaction controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::transaction.transaction', ({ strapi }) => ({
    async findTransactionsUser(ctx) {
        try {
            const userId = ctx.state.user.id;
            const entries = await strapi.entityService.findMany('api::transaction.transaction', {
                filters: {
                  $or: [
                      {
                          account_debtor: {
                              users_permissions_user: {
                                id: userId
                              }
                          }
                      },
                      {
                          account_creditor: {
                              users_permissions_user: {
                                id: userId
                              }
                          }
                      },
                  ]
                },
                populate: {
                    account_debtor: true,
                    account_creditor: true
                },
                sort: { createdAt: 'desc' }
            });
            return this.transformResponse(entries)
        } catch (error) {
            return ctx.internalServerError();
        }
    }
}));
