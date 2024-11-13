import { Router } from 'express';
import { signin, signup, signout } from '../controllers';

const authRouter = Router();

authRouter.post('/signup', (req, res) => {
    res.send('signup');
});
authRouter.post('/signin', (req, res) => {
    res.send('signin');
});
authRouter.post('/signout', (req, res) => {
    res.send('signout');
});