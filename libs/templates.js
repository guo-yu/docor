var path = require('path'),
    tpls = path.resolve(__dirname, '../templates/');

exports = module.exports = function(filename) {
    if (!filename) return false;
    return swig.compileFile(path.join(tpls, filename));
};
