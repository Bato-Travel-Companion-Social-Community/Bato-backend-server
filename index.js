import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'; // Import cors
import 'dotenv/config';

import { authRouter, postRouter } from './routes/index.js';

const app = express();

// Use CORS to allow all origins or specify a particular origin
app.use(cors()); // This allows all origins. For more control, see the next example.

app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error('Connection error:', error);
    });
