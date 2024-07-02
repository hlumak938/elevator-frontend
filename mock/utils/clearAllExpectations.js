const { mockServerClient } = require('mockserver-client');

async function clearAll() {
  await mockServerClient('localhost', 7080)
    .clear({
      httpRequest: {
        path: '/api/.*',
      },
    });
}

module.exports = clearAll;
