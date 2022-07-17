import Db from '#db';
import { Router } from 'express';
import { pluralTexts } from '#root/dictionaries.js';
import Controller from '#endpoints/Controller.js';

const schema = {
  author: String,
  title: String,
  content: String,
  'picture?': String, // optional field
};

await Db.setSchema('posts/$uid', schema);

const router = new Router();

const context = {
  schema,
  fileField: 'picture',
  url: 'posts',
  pluralText: pluralTexts.posts,
};

router.post('/posts/', Controller.create.bind(context));
router.get('/posts/', Controller.getAll.bind(context));
router.get('/posts/:id/', Controller.getByID.bind(context));
router.put('/posts/', Controller.update.bind(context));
router.delete('/posts/:id/', Controller.remove.bind(context));

export default router;
