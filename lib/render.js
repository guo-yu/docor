var path = require('path');
var swig = require('swig');
var templates = path.resolve(__dirname, '../templates');

module.exports = render;

function render(filename) {
  if (!filename)
    return;

  return swig.compileFile(
    path.join(templates, filename)
  );
}
