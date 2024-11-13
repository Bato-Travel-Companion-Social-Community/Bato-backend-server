import { Router } from 'express';
import { signin, signup } from '../controllers/index.js';

const authRouter = Router();

authRouter.post('/signup', (req, res) => {
    res.send('signup');
});
authRouter.post('/signin', (req, res) => {
    res.send('signin');
});


export default authRouter;