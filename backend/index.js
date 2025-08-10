
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const routes = require('./routes');
app.use(express.json());
app.use('/api', routes);

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Ezra Church Group Management API',
    version: '1.0.0',
    description: 'API documentation for Ezra backend',
  },
  servers: [
    { url: 'http://localhost:' + port + '/api' }
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes.js', './routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('Hello from Express backend!');
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
  console.log(`Swagger UI available at http://localhost:${port}/swagger`);
});
