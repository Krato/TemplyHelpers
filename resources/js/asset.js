/**
 * Nova Temply helpers
 */

import { checkNewPage } from './helpers/removeEditButton';

Nova.booting((Vue, router) => {
    router.beforeEach((to, from, next) => {
        if (from.name == 'create' && to.name == 'detail') {
            let newTo = {
                name: 'index',
                params: {
                    resourceName: from.params.resourceName,
                },
            };
            next(newTo);
        }

        checkNewPage(router);
        next();
    });
});
