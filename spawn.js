/**
 * The spawn function is a much better choice
 * when the size of the data expected from the command is large,
 * because that data will be streamed with the standard IO objects.
 */

const { spawn } = require('child_process')

const pwd = spawn('pwd')

pwd.on('exit', (code, signal) => {
  console.log('pwd process exited with code', code, 'and signal', signal)
})

pwd.stdout.on('data', data => {
  console.log('pwd data', data.toString('utf-8'))
})

pwd.stderr.on('data', err => console.log('err in child process', err))

const wc = spawn('wc')

process.stdin.pipe(wc.stdin)
wc.stdout.on('data', data => console.log('wc data', data.toString('utf-8')))

const find = spawn('find', ['.', '-type', 'f'])
find.stdout.pipe(wc.stdin)

wc.stdout.on('data', data =>
  console.log('wc find data', data.toString('utf-8'))
)

const findInherit = spawn('find . -type f | wc -l', {
  stdio: 'inherit',
  shell: true,
})
