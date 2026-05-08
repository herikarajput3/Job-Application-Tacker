import express from 'express'
import cors from 'cors'
import applicationRoutes from './routes/applicationRoutes.js'

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/applications", applicationRoutes);

// Test Routes
app.get('/', (req, res) => {
    res.send('API is running...')
})

export default app