const { resolve } = require('path');
const { readFileSync } = require('fs');
const { mockServerClient } = require('mockserver-client');

const addRestExpectations = async (expectations) => {
  await mockServerClient('localhost', 7080)
    .mockAnyResponse(expectations.map(({
      method, path, queryStringParameters, statusCode, responseFile, delayMs, remainingTimes, unlimited, response,
    }) => ({
      httpRequest: {
        method,
        path,
        queryStringParameters,
      },
      httpResponse: {
        statusCode: statusCode || 200,
        headers: {
          'Content-Type': ['application/json; charset=utf-8'],
        },
        body: {
          json: response || readFileSync(resolve(__dirname, 'data', responseFile), 'utf-8'),
        },
        delay: {
          timeUnit: 'MILLISECONDS',
          value: delayMs || 0,
        },
      },
      times: {
        remainingTimes,
        unlimited: unlimited || false,
      },
    })));
};

module.exports = {
  addRestExpectations,
};
