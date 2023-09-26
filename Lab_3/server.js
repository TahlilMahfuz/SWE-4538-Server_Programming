const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import the authentication routes
const authRoutes = require('./routes/authRoutes');

app.use('/', authRoutes);

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
