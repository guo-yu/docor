var fs = require('fs');
var path = require('path');
var render = require('./render');
var templates = path.resolve(__dirname, '../templates');
var sys = require(path.resolve(__dirname, '../package.json'));

exports.createFile = createFile;
exports.fetchLicenses = fetchLicenses;

function fetchLicenses(license) {
  if (!license)
    return null;
  try {
    return fs.readFileSync(
      path.join(templates, 'licenses', license)
    );
  } catch (e) {
    return null;
  }
}

function createFile(filename, callback) {
  var cwd = process.cwd();
  var pkg = require(cwd + '/package.json');

  var locals = {};
  locals.pkg = pkg;
  locals.sys = sys;
  locals.year = (new Date().getFullYear());
  locals.apis = null;

  if (filename.indexOf('README') > -1 || filename.indexOf('LICENSE') > -1)
    locals.license = fetchLicenses(pkg.license);

  if (pkg.name)
    pkg.parsedName = parseName(pkg.name);

  if (locals.license)
    locals.license = locals.license.toString();

  if (pkg.main) {
    try {
      locals.apis = require(path.join(cwd, pkg.main));
    } catch (err) {
      // just ignore the error
    }
  }

  return fs.writeFile(
    path.join(cwd, filename),
    render(filename.indexOf('.') === 0 ? filename.substr(1) : filename)(locals),
    callback
  );
}

function parseName(str) {
  if (str.indexOf('-') === 0)
    return str;
  var token = str.split('-');
  if (!token.length)
    return str;

  for (var i = token.length - 1; i >= 0; i--) {
    (function(index){
      if (index === 0)
        return;
      token[index] = token[index].charAt(0).toUpperCase() + token[index].substr(1)
    })(i);
  };

  return token.join('');
}
