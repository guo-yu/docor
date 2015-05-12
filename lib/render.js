import path from 'path'
import swig from 'swig'

const templates = path.resolve(__dirname, '../templates')

export default function(filename) {
  if (!filename)
    return

  return swig.compileFile(
    path.join(templates, filename)
  )
}
