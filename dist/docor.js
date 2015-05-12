'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.fetchLicenses = fetchLicenses;
exports.createFile = createFile;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

var sys = require(_path2['default'].resolve(__dirname, '../package.json'));
var templates = _path2['default'].resolve(__dirname, '../templates');

function fetchLicenses(license) {
  if (!license) return null;

  license = license.toString().toLowerCase();

  try {
    return _fs2['default'].readFileSync(_path2['default'].join(templates, 'licenses', license));
  } catch (e) {
    return null;
  }
}

function createFile(filename, callback) {
  var cwd = process.cwd();
  var pkg = require(_path2['default'].join(cwd, 'package.json'));

  var locals = {
    pkg: pkg,
    sys: sys,
    'year': new Date().getFullYear(),
    'apis': null };

  if (filename.indexOf('README') > -1 || filename.indexOf('LICENSE') > -1) locals.license = fetchLicenses(pkg.license);

  if (pkg.name) pkg.parsedName = parseName(pkg.name);

  if (locals.license) locals.license = locals.license.toString();

  if (pkg.main) {
    try {
      locals.apis = require(_path2['default'].join(cwd, pkg.main));
    } catch (err) {}
  }

  return _fs2['default'].writeFile(_path2['default'].join(cwd, filename), _render2['default'](filename.indexOf('.') === 0 ? filename.substr(1) : filename)(locals), callback);
}

function parseName(str) {
  if (str.indexOf('-') === 0) return str;

  var token = str.split('-');

  if (!token.length) return str;

  for (var i = token.length - 1; i >= 0; i--) {
    (function (index) {
      if (index === 0) return;

      token[index] = token[index].charAt(0).toUpperCase() + token[index].substr(1);
    })(i);
  }

  return token.join('');
}

// just ignore the error
//# sourceMappingURL=docor.js.map