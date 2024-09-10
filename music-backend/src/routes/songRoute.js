
import express from 'express';
import SongController from '../controllers/SongController.js';
import upload from '../middleware/multer.js';


const songRouter = express.Router();


const { addSong, listSong,removeSong } = SongController;

songRouter.post('/add', upload.fields([{name:'image',maxCount:1},{name:'audio',maxCount:1}]) ,addSong);
songRouter.get('/list', listSong);
songRouter.post('/remove', removeSong);

export default songRouter;