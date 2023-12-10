const swaggerAutogen = require('swagger-autogen')

swaggerAutogen()

const doc = {
  info: {
    title: 'LatamMed API',
    description: 'Medical Appoinments API'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
