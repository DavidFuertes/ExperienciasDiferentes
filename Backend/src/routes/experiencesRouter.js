import express from 'express';

import { addNewExperience } from '../controllers/experiences/addNewExperience.js';
import { changeExperienceStatus } from '../controllers/experiences/changeExperienceStatus.js';
import { experienceReservation } from '../controllers/experiences/experienceReservation.js';
import { listExperiences } from '../controllers/experiences/listExperiences.js';
import { experienceRating } from '../controllers/experiences/experienceRating.js';
import { getExperience } from '../controllers/experiences/getExperience.js';
import { userAuth } from '../middlewares/userAuth.js';
import { addNewComment } from '../controllers/experiences/addNewComment.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';
import { editExperience } from '../controllers/experiences/editExperience.js';
import { listExperiences1 } from '../controllers/experiences/listExperiences1.js';

const experiencesRouter = express.Router();

experiencesRouter.patch('/edit/', userAuth, editExperience);
experiencesRouter.get('/detail/', userAuth, getExperience);

experiencesRouter.get('/', listExperiences1);
experiencesRouter.post(
    '/newexperience',
    userAuth,
    adminMiddleware,
    addNewExperience,
);
experiencesRouter.post('/', userAuth, addNewComment);
experiencesRouter.patch('/', userAuth, changeExperienceStatus);
experiencesRouter.post('/reservation', userAuth, experienceReservation);
experiencesRouter.post('/rate', userAuth, experienceRating);

export { experiencesRouter };
