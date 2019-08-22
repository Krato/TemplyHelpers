/**
 * Nova Temply helpers
 */
import { checkNewPage } from './helpers/removeEditButton';

async function fetchAsyncConfigs () {
  // await response of fetch call
  let response = await fetch('/api/v1/nova-config');
  // only proceed once promise is resolved
  let data = await response.json();
  // only proceed once second promise is resolved
  return data;
}

var resources;
var domain = window.location.hostname

if (domain != 'temply.on' && domain != 'templyapp.com') {
    startNovaRouterModifications()
} 

function startNovaRouterModifications() {

    //Hide edit button by css
    let body = document.body;
    body.classList.add("hidden-edit");

    if (localStorage.getItem("temply.edit-link-resources") === null) {
        fetchAsyncConfigs()
        .then(data => {
            resources = data;
            localStorage.setItem("temply.edit-link-resources", resources);
            
        })
        .catch(reason => console.log(reason.message))
    } else {
        resources = localStorage.getItem("temply.edit-link-resources")
    }

    

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

            if (resources.includes(from.params.resourceName)) {
                if (from.name == 'index' && to.name == 'detail') {
                    let newTo = {
                        name : 'edit',
                        params: {
                            resourceName: to.params.resourceName,
                            resourceId: to.params.resourceId.toString()
                        }
                    }
                    next(newTo)
                }
            }
            checkNewPage(router);
            next();
        });

    });

}


