import express from 'express';
import albumController from '../controllers/albumController.js';
import upload from '../middleware/multer.js';


const {addAlbums, listAlbums, removeAlbum}= albumController;

const albumRouter = express.Router();   

albumRouter.post('/add',upload.single('image'),addAlbums);
albumRouter.get('/list',listAlbums);
albumRouter.post('/remove',removeAlbum);

export default albumRouter;