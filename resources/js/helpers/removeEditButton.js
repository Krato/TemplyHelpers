/**
 * This helper function removes edit button from index on Nova
 */

export function checkNewPage(router) {
    var checkExist = setInterval(function() {
        if (router.currentRoute.name != null) {
            if (router.currentRoute.name == 'index') {
                removeEditFromTables();
            }
            clearInterval(checkExist);
        }
    }, 100);
}

//Removes edit from index pages
function removeEditFromTables() {
    var checkTable = setInterval(function() {
        let table = document.querySelectorAll('.table');

        if (table.length) {
            table[0].classList.add('hidden-edit');
        }

        let items = document.querySelectorAll('.table .td-fit');

        if (items.length) {
            let items = document.querySelectorAll('.table .td-fit');
            for (var i = 0; i < items.length; i++) {
                var elements = items[i].getElementsByTagName('span');
                if (isNode(items[1]) && isElement(elements[1])) {
                    items[i].removeChild(elements[1]);
                }
            }
            clearInterval(checkTable);
        }
    }, 100);
}

function isNode(o) {
    return typeof Node === 'object'
        ? o instanceof Node
        : o &&
              typeof o === 'object' &&
              typeof o.nodeType === 'number' &&
              typeof o.nodeName === 'string';
}

//Returns true if it is a DOM element
function isElement(o) {
    return typeof HTMLElement === 'object'
        ? o instanceof HTMLElement //DOM2
        : o &&
              typeof o === 'object' &&
              o !== null &&
              o.nodeType === 1 &&
              typeof o.nodeName === 'string';
}
