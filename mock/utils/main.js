const clearAllExpectations = require('./clearAllExpectations');
const { addRestExpectations } = require('./addRestExpectations');

async function setup() {
  await clearAllExpectations();

  await addRestExpectations([
    {
      method: 'GET',
      path: '/api/buildings',
      statusCode: 200,
      responseFile: 'buildings.json',
      delayMs: 10,
      remainingTimes: 1,
      unlimited: true,
    }, {
      method: 'GET',
      path: '/api/buildings/[0-9]+',
      statusCode: 200,
      responseFile: 'building.json',
      delayMs: 10,
      unlimited: true,
    },
    {
      method: 'POST',
      path: '/api/buildings',
      statusCode: 201,
      responseFile: 'new-building.json',
      delayMs: 10,
      unlimited: true,
    },
    {
      method: 'POST',
      path: '/api/buildings/[0-9]+/lifts',
      statusCode: 200,
      responseFile: 'lift.json',
      delayMs: 10,
      remainingTimes: 1,
      unlimited: true,
    },
    {
      method: 'GET',
      path: '/api/buildings/[0-9]+',
      statusCode: 200,
      responseFile: 'building.json',
      delayMs: 10,
      remainingTimes: 1,
      unlimited: true,
    },
  ]);

  console.info('Mock data loaded');
}
setup();
