var fs = require('fs');
var path = require('path');
var consoler = require('consoler');
var sys = require(path.resolve(__dirname,'../package.json'));
var makeTemplate = require('./templates');

exports.fetchLicenses = fetchLicenses;
exports.createReadme =  createReadme;
exports.createFile = createFile;
exports.checkPackage = checkPackage;

function fetchLicenses(license) {
  if (!license) 
    return null;
  try {
    return fs.readFileSync(
      __dirname + '/licenses/' + license
    );
  } catch (e) {
    return null;
  }
}

function createReadme(filename, callback) {
  var dir = process.cwd();
  var pkg = require(dir + '/package.json');
  var locals = {};

  locals.pkg = pkg;
  locals.sys = sys;
  locals.license = fetchLicenses(pkg.license);
  locals.year = new Date().getFullYear();
  locals.apis = null;
  
  if (locals.license) locals.license = locals.license.toString();

  if (pkg.main) try {
    locals.apis = require(path.join(dir, pkg.main));
  } catch (err) {
    return callback(err);
  }

  fs.writeFile(
    path.join(dir, filename), 
    makeTemplate(filename)(locals), 
    callback
  );
}

function createFile(filename, callback) {
  if (filename.indexOf('README') > -1) 
    return createReadme(filename, callback);

  return fs.writeFile(
    path.join(process.cwd(), filename),
    makeTemplate(filename.indexOf('.') === 0 ? filename.substr(1) : filename)(),
    callback
  );
}

function checkPackage(file) {
  var dir = process.cwd();
  return fs.existsSync(path.join(dir, file));
}
