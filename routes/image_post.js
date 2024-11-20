import { Router } from 'express';
import { getImagePosts } from '../controllers/index.js';


const postRouter = Router();

postRouter.get('/get_image_posts', getImagePosts);



export default postRouter;