import { Router } from 'express';
import { getProfileDetails} from '../controllers/index.js';

const profileRouter = Router();

profileRouter.get('/get_my_profile_details', getProfileDetails);




export default profileRouter;