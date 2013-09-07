var fs = require('fs'),
    optimist = require('optimist'),
    argv = optimist.argv,
    swig = require('swig'),
    consoler = require('consoler'),
    path = require('path'),
    sys = require(__dirname + '/package.json');

var tplMap = {
    readme: swig.compileFile(__dirname + '/tpl/readme.md'),
    readmeZhcn: swig.compileFile(__dirname + '/tpl/readme.zh-cn.md'),
    license: swig.compileFile(__dirname + '/tpl/license.md'),
    ignore: function() {
        return fs.readFileSync(__dirname + '/tpl/ignore');
    }
}

// fetch license by name
exports.licenses = function(license) {
    if (license) {
        try {
            return fs.readFileSync(__dirname + '/licenses/' + license);
        } catch (e) {
            return null;
        }
    } else {
        return null;
    }
}

// create files
exports.create = function(type, filename, cb) {
    var dir = process.cwd(),
        pkg = require(dir + '/package.json'),
        locals = {
            pkg: pkg,
            license: exports.licenses(pkg.license),
            year: new Date().getFullYear(),
            sys: sys
        };
    if (pkg.main) {
        try {
            locals.apis = require(path.join(dir, pkg.main))
        } catch (e) {
            locals.apis = [];
        }
    }
    fs.writeFile(path.join(dir, filename), tplMap[type](locals), function(err) {
        cb(err);
    });
}

// cli 
exports.cli = function() {
    var dir = process.cwd();
    consoler.align(7);
    var readme = { 
        type: 'readme',
        filename: 'README.md'
    };
    if (argv.c) { 
        readme.type = 'readmeZhcn';
        if (typeof(argv.c) != 'boolean') {
            readme.filename = argv.c.toString();
        }
    }
    fs.readFile(dir + '/package.json', function(err, pkg) {
        if (!err) {
            exports.create(readme.type, readme.filename, function(err) {
                if (!err) {
                    consoler.success(readme.filename + ' created.');
                } else {
                    consoler.error('Opps:');
                    console.log(err);
                }
            });
            exports.create('license', 'LICENSE', function(err) {
                if (!err) {
                    consoler.success('LICENSE' + ' created.');
                } else {
                    consoler.error('Opps:');
                    console.log(err);
                }
            });
            exports.create('ignore', '.gitignore', function(err) {
                if (!err) {
                    consoler.success('.gitignore' + ' created.');
                } else {
                    consoler.error('Opps:');
                    console.log(err);
                }
            });
            exports.create('ignore', '.npmignore', function(err) {
                if (!err) {
                    consoler.success('.npmignore' + ' created.');
                } else {
                    consoler.error('Opps:');
                    console.log(err);
                }
            });
        } else {
            consoler.log('404', 'package.json not found')
        }
    });
}