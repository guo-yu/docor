var fs = require('fs'),
    optimist = require('optimist'),
    argv = optimist.argv,
    swig = require('swig'),
    consoler = require('consoler'),
    path = require('path'),
    sys = require(__dirname + '/package.json'),
    maker = require('./libs/templates');

// fetch license by name
exports.licenses = function(license) {
    if (!license) return null;
    try {
        return fs.readFileSync(__dirname + '/licenses/' + license);
    } catch (e) {
        return null;
    }
};

// create files
exports.create = function(filename, callback) {
    
    var dir = process.cwd();
    var pkg = require(dir + '/package.json');
    var locals = {};

    locals.pkg = pkg;
    locals.sys = sys;
    locals.license = exports.licenses(pkg.license);
    locals.year = new Date().getFullYear();
    locals.apis = null;

    if (pkg.main) try { locals.apis = require(path.join(dir, pkg.main)); }

    fs.writeFile(path.join(dir, filename), maker(filename)(locals), callback);
};

// check if exist
exports.check = function(file) {
    var dir = process.cwd();
    return fs.existsSync(path.join(dir, file));
};

// cli 
exports.cli = function() {

    consoler.align(7);
    
    var dir = process.cwd();
    var files = ['README.md','LICENSE','.gitignore', '.npmignore'];

    if (argv.c) files.push('README.zh-cn.md');
    if (!exports.check('/package.json')) return consoler.error('package.json not found');

    files.forEach(function(file){
        exports.create(file, function(err){
            if (err) return consoler.error(err);
            return consoler.success(file + ' has been created !');
        });
    });
    
};
