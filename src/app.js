import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello from Acquisitions');
});

// app.get('/payment', (req, res) => {
//     res.status(200).send('Hello from Payment')
// })

export default app;
