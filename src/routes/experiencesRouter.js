import express from 'express';

import { addNewExperience } from '../controllers/experiences/addNewExperience.js';
import { changeExperienceStatus } from '../controllers/experiences/changeExperienceStatus.js'
import { experienceReservation } from '../controllers/experiences/experienceReservation.js'
import { listExperiences } from '../controllers/experiences/listExperiences.js'


const experiencesRouter = express.Router();

experiencesRouter.get('/', listExperiences);
experiencesRouter.post('/', addNewExperience);
experiencesRouter.patch('/:id', changeExperienceStatus);
experiencesRouter.post('/reservation', experienceReservation);

export { experiencesRouter };
