const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: 'API documentation for the Library system',
        },
        servers: [
            {
                url: 'http://localhost:3030',
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const specs = swaggerJSDoc(options);

module.exports = {
    swaggerUi,
    specs
};
