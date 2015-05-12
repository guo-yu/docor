'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _consoler = require('consoler');

var _consoler2 = _interopRequireDefault(_consoler);

var _docor = require('./docor');

var _docor2 = _interopRequireDefault(_docor);

var files = ['README.md', 'LICENSE', '.gitignore', '.npmignore'];

var checkPackage = (function (file) {
  return _fs2['default'].existsSync(_path2['default'].join(process.cwd(), file));
})(function () {
  if (!checkPackage('package.json')) return _consoler2['default'].error('Docor.init(); `package.json` file not found');

  files.forEach(function (file) {
    _docor2['default'].createFile(file, function (err) {
      if (err) return _consoler2['default'].error(err);

      _consoler2['default'].success(file + ' created');
    });
  });
})();
//# sourceMappingURL=cli.js.map