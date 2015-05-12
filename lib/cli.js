import fs from 'fs'
import path from 'path'
import consoler from 'consoler'
import * as docor from './docor'

const files = ['README.md', 'LICENSE', '.gitignore', '.npmignore']

let checkPackage = (f) => {
  return fs.existsSync(
    path.join(process.cwd(), f)
  )
}

// Add a `;` to prevent compile error.
// It's a bebel's bug ? XD
export default function() {
  if (!checkPackage('package.json')) 
    return consoler.error('Docor.init(); `package.json` file not found')

  files.forEach((file) => {
    docor.createFile(file, (err) => {
      if (err) 
        return consoler.error(err)

      consoler.success(file + ' created')
    })
  })
}
