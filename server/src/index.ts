import express from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth.route';
import foldersRoutes from './routes/folders.route';
import notesRoutes from './routes/notes.route';
import aiRoutes from './routes/ai.route';

const app = express();

// Middleware
app.use(cors({
  origin: config.frontendUrl,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/folders', foldersRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/ai', aiRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Error handling
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
