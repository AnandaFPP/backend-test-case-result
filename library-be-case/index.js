const express = require('express');
require('dotenv').config();
const createError = require('http-errors')
const app = express();
const mainRouter = require('./src/routes/index')
const { swaggerUi, specs } = require("./src/helper/swaggerConfig");

const PORT = 3030;

app.use(express.json());
app.use('/api', mainRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.all('*', (req, res, next) => {
  next(new createError.NotFound())
})

app.use((err, req, res, next) => {
  const messageError = err.message || "internal server error"
  const statusCode = err.status || 500

  res.status(statusCode).json({
    message: messageError
  })

})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})