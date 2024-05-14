const dotenv = require('dotenv').config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env' });;

const express = require('express');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const http = require('http');
const { errorHandler } = require('./middleware/errorMiddleware');

const port = process.env.PORT || 3500;

const app = express();

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());


app.use('/api/resources', require('./routes/resourcesRoutes.js'));
app.use('/api/microservices', require('./routes/microservicesRoutes.js'));

app.use(errorHandler);
const server = http.createServer(app);

server.listen(port, () => console.log(`Express Server started on port ${port}`));
