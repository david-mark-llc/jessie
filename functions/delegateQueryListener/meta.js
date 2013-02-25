/*
Group:
DOM Events
*/

/**
 * @method delegateQueryListener
 * @public
 * @description Delegates blah
 * @param {Element} el The element to delegate to
 * @param {String} eventType The event type i.e. 'click'
 * @param {String} selector The selector/query to look up
 * @param {Function} fn The listener
 * @example
 * jessie.delegateQueryListener(document.getElementById('whatever', 'click', '.yeah', function(e, currentTarget) {}))
 * @author Adam Silver
 */