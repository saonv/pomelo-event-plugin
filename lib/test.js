/**
 * Created by saonguyen on 12/22/2015.
 */
var Services = require('./services/eventServices');
var sc = new Services(null, {path: "D:/Work/Project/BidaOnline/ServerCode/Code/game-server/plugins/pomelo-event-plugin/lib/event"});
sc.afterStart();