/**
 * The exec function is a good choice if you need to use the shell syntax and
 * if the size of the data expected from the command is small.
 * (Remember, exec will buffer the whole data in memory before returning it.)
 */
const { exec } = require('child_process')

exec('find . -type f | wc -l', (err, stdout, _) => {
  if (err) return console.log('exec find err', err)

  console.log('number of files', stdout)
})

exec('ls -al', (err, stdout, _) => {
  if (err) return console.log('exec ls error', err)

  console.log('list of files', stdout)
})
