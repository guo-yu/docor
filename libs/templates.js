var path = require('path'),
    swig = require('swig'),
    tpls = path.resolve(__dirname, '../templates/');

exports = module.exports = function(filename) {
    if (!filename) return false;
    return swig.compileFile(path.join(tpls, filename));
};
