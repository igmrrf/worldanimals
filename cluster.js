const cluster = require('cluster');
const os = require('os');

const CPUS = os.cpus();
let numReqs = 0;

EventsListened = [
  'setup',
  'listening',
  'disconnect',
  'online',
  'message',
  'exit',
  'fork',
];

if (cluster.isMaster) {
  console.log(cluster);
  console.log('Master %d is running', process.pid);
  CPUS.forEach(function () {
    cluster.fork();
  });
  cluster.on('setup', function (settings) {
    console.log('Settings: %d', settings);
  });
  cluster.on('fork', function (worker) {
    console.log('Cluster %d has been forked successfully', worker.process.pid);
    console.log('work is dead - %d', worker.isDead());
  });
  cluster.on('listening', function (worker) {
    console.log('Cluster %d connected', worker.process.pid);
  });

  cluster.on('disconnect', function (worker) {
    console.log('Cluster %d disconnected', worker.process.pid);
  });

  cluster.on('message', function (msg) {
    console.log(numReqs);
    if (msg.cmd && msg.cmd === 'notifyRequest') {
      numReqs += 1;
    }
  });

  cluster.on('online', function (worker) {
    console.log('Cluster %d is online', worker.process.pid);
  });

  cluster.on('exit', function (worker, code, signal) {
    if (signal) {
      console.log(`worker was killed by signal: ${signal}`);
    } else if (code !== 0) {
      console.log(`worker exited with error code: ${code}`);
    } else {
      console.log('worker success!');
    }
    if (worker.exitedAfterDisconnect === true) {
      console.log('Oh, it was an intention exit, no worries');
    }
    console.log('Cluster %d is dead', worker.process.pid);
    //Ensuring a new cluster will start if an old one dies
    cluster.fork();
  });
} else {
  require('./index');
}
