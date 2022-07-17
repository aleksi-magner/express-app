import 'dotenv/config';

import Db from '#db';
import express from 'express';
import fileUpload from 'express-fileupload';
import posts from '#endpoints/routes/posts.js';
import { defaultConfig } from '#root/dictionaries.js';

const app = express();

// Parsing the body of POST requests in json format
app.use(express.json());

// Working with files from client
app.use(express.static(defaultConfig.static));
app.use(fileUpload({}));

// Endpoints
app.use('/api', posts);

try {
  await Db.connect();

  app.listen(process.env.PORT || defaultConfig.port);
} catch (error) {
  console.error(error);
}
