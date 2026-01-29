import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Database Connection
connectDB();

// Routes
import authRoutes from './routes/authRoutes';
import dealRoutes from './routes/dealRoutes';
import claimRoutes from './routes/claimRoutes';

app.use('/api/auth', authRoutes);
app.use('/api/deals', dealRoutes);
app.use('/api/claims', claimRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
