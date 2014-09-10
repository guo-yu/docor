var fs = require('fs');
var path = require('path');
var render = require('./render');
var sys = require(path.resolve(__dirname, '../package.json'));
var templates = path.resolve(__dirname, '../templates');

exports.createFile = createFile;
exports.fetchLicenses = fetchLicenses;
exports.createReadme = createReadme;

function fetchLicenses(license) {
  if (!license)
    return null;
  try {
    return fs.readFileSync(
      path.join(templates, 'licenses', license)
    );
  } catch (e) {
    console.log(e)
    return null;
  }
}

function createReadme(filename, callback) {
  var cwd = process.cwd();
  var pkg = require(cwd + '/package.json');

  var locals = {};
  locals.pkg = pkg;
  locals.sys = sys;
  locals.license = fetchLicenses(pkg.license);
  locals.year = (new Date().getFullYear());
  locals.apis = null;

  console.log(locals.sys);

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
    render(filename)(locals),
    callback
  );
}

function createFile(filename, callback) {
  if (filename.indexOf('README') > -1)
    return createReadme(filename, callback);

  return fs.writeFile(
    path.join(process.cwd(), filename),
    render(filename.indexOf('.') === 0 ? filename.substr(1) : filename)(),
    callback
  );
}
