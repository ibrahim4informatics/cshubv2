import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on  http://${process.env.HOST}:${process.env.PORT || 3000}`);
});