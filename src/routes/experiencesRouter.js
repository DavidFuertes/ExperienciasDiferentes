import express from 'express';

import { addNewExperience } from '../controllers/experiences/addNewExperience.js';
import { changeExperienceStatus } from '../controllers/experiences/changeExperienceStatus.js'
import { experienceReservation } from '../controllers/experiences/experienceReservation.js'
import { listExperiences } from '../controllers/experiences/listExperiences.js'
import { experienceRating } from '../controllers/experiences/experienceRating.js'
import { getExperience } from '../controllers/experiences/getExperience.js';
import { userAuth } from '../middlewares/userAuth.js';


const experiencesRouter = express.Router();

experiencesRouter.get('/experience/:id', getExperience)
experiencesRouter.get('/', listExperiences);
experiencesRouter.post('/', addNewExperience);
experiencesRouter.patch('/:id', changeExperienceStatus);
experiencesRouter.post('/reservation', experienceReservation);
experiencesRouter.post('/rate', userAuth, experienceRating);

export { experiencesRouter };
