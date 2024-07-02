const mockserver = require('mockserver-node');

const serverPort = process.env.PORT || '9091';
const verbose = process.argv.includes('--verbose');

mockserver.start_mockserver({
  serverPort,
  verbose,
});

console.info('Mock Server started on port:', serverPort);
