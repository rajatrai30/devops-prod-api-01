import express from 'express';
import logger from '#config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import usersRoutes from '#routes/auth.routes.js';
import securityMiddleware from './middleware/security.middleware.js';
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  morgan('combined', {
    stream: { write: message => logger.info(message.trim()) },
  })
);

// Security middleware
app.use(securityMiddleware);

// Default route
app.get('/', (req, res) => {
  logger.info('Hello from Acquisitions!');
  res.status(200).send('Hello from Acquisitions');
});

// for health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// for api status
app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Acquistion Api is running!' });
});

app.use('/api/auth', usersRoutes); //api/auth/sign-in or sign-up mei jaayega

// app.get('/payment', (req, res) => {
//     res.status(200).send('Hello from Payment')
// })

export default app;
