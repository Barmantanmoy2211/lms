import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import * as dynamooose from 'dynamoose';
import courseRoute  from './routes/courseRoute';

/* ROUTES IMPORTS */

// CONFIGURATION
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
    dynamooose.aws.ddb.local();
}

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy());
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// ROUTES
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/courses", courseRoute);

// Server
const port = process.env.PORT || 3000;
if(!isProduction) {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    })
}