import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';

dotenv.config();

const app = express();
app.use(express.json());

connectDB().then(() => {
    app.listen(process.env.API_PORT, () => {
        console.log(`Server is running on port ${process.env.API_PORT}`);
      });
}).catch((error) => {
    console.error("Failed to connect to the database:", error);
});


