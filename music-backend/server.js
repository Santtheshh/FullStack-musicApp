import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import songRouter from './src/routes/songRoute.js';
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import albumRouter from './src/routes/albumRoute.js';

// Initialize app
const app = express();
const port = process.env.PORT || 4000;  
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// Initialize routes
app.use('/api/song', songRouter);
app.use('/api/album',albumRouter)
app.get('/', (req, res) => res.send('API Working'));

// Start server
app.listen(port, () => console.log(`Server listening on port ${port}`));
