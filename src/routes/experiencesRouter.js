import express from 'express';

import { addNewExperience } from '../controllers/experiences/addNewExperience.js';
import { changeExperienceStatus } from '../controllers/experiences/changeExperienceStatus.js'
import { experienceReservation } from '../controllers/experiences/experienceReservation.js'
import { listExperiences } from '../controllers/experiences/listExperiences.js'
import { experienceRating } from '../controllers/experiences/experienceRating.js'
import { getExperience } from '../controllers/experiences/getExperience.js';
import { userAuth } from '../middlewares/userAuth.js';
import { addNewComment } from '../controllers/experiences/addNewComment.js';


const experiencesRouter = express.Router();

experiencesRouter.get('/detail/', getExperience)
experiencesRouter.get('/', listExperiences);
experiencesRouter.post('/newexperience', userAuth, addNewExperience);
experiencesRouter.post('/', addNewComment)
experiencesRouter.patch('/', changeExperienceStatus);
experiencesRouter.post('/reservation', experienceReservation);
experiencesRouter.post('/rate', userAuth, experienceRating);

export { experiencesRouter };
