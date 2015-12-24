/**
 * Created by saonguyen on 12/21/2015.
 */
var Events = require('../services/eventServices');
module.exports = function(app, opts)
{
    var event = new Event(app, opts);
    app.set('plugin_eventServices', event);
    event.name = '__event_services__';
    return event;
}
