/**
 * Created by saonguyen on 12/21/2015.
 */
var fs = require('fs');
var path = require('path');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var Events = function(app, opts)
{
    this.app = app;
    this.opts = opts;
    this.map = {};
}

util.inherits(Events, EventEmitter);

module.exports = Events;

var pro = Events.prototype;

pro.afterStart = function(cb)
{
    // Load Path
    this.load();
}

pro.load = function()
{
    var path = this.opts.path;
    if (!isDir(path))
        throw new Error('No Directory');
    this.loadPath(path);
}

pro.loadPath = function(path)
{
    if (path.charAt(path.length - 1) != '/')
        path = path + '/';
    var items = fs.readdirSync(path),
        m;
    for (var item in items)
    {
        var filePath = path + items[item];
        if (isDir(filePath))
            this.loadPath(filePath);
        else if (isFile(filePath) && checkFileType(filePath, ".js"))
        {
            m = this.loadFile(filePath);
            if (m.type && typeof m.type == 'string' && m.process && typeof m.process == 'function')
                this.on(m.type, m.process);
        }
    }
}

pro.loadFile = function(file)
{
    return requireUncached(file);
}

var isDir = function(path)
{
    return fs.statSync(path).isDirectory();
}
var isFile = function(path) {
    return fs.statSync(path).isFile();
};
var checkFileType = function(fn, suffix) {
    if(suffix.charAt(0) !== '.') {
        suffix = '.' + suffix;
    }

    if(fn.length <= suffix.length) {
        return false;
    }

    var str = fn.substring(fn.length - suffix.length).toLowerCase();
    suffix = suffix.toLowerCase();
    return str === suffix;
};

var requireUncached = function(module){
    delete require.cache[require.resolve(module)]
    return require(module)
}