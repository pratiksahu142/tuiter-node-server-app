import * as tuitsDao from './tuits-dao.js'

const findTuits = async (req, res) => {
  const tuits = await tuitsDao.findTuits();
  res.json(tuits);
}

const createTuit = async (req, res) => {
  const newTuit = req.body;
  newTuit.topic = newTuit.tuit;
  newTuit.userName = 'Tesla';
  newTuit.title = newTuit.tuit;
  newTuit.time = '4h'
  newTuit.image = 'teslalogo.jpeg'
  newTuit.liked = false;
  newTuit.replies = 123;
  newTuit.retuits = 234;
  newTuit.likes = 345;
  newTuit.handle = '@tesla';

  const insertedTuit = await tuitsDao.createTuit(newTuit);
  res.json(insertedTuit);
}

const findTuit = async (req, res) => {
  const tuitdId = req.params.tid;
  const foundTuit = await tuitsDao.findTuit(tuitdId);
  res.json(foundTuit)
}

const deleteTuit = async (req, res) => {
  const tuitdIdToDelete = req.params.tid;
  const status = await tuitsDao.deleteTuit(tuitdIdToDelete);
  res.json(status);
}

const updateTuit = async (req, res) => {
  const tuitdId = req.params.tid;
  const updates = req.body;
  const status = await tuitsDao.updateTuit(tuitdId, updates)
  res.json(status);
}

export default (app) => {
  app.post('/api/tuits', createTuit);
  app.get('/api/tuits', findTuits);
  app.get('/api/tuits/:tid', findTuit);
  app.put('/api/tuits/:tid', updateTuit);
  app.delete('/api/tuits/:tid', deleteTuit);
}


