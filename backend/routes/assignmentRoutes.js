import express from "express";

import { addAnswer, getSubmittedAssignment } from '../controllers/assignmentController.js';
import protect from "../middleware/protectMiddleware.js";

const assignmentRoutes = express.Router();

// '/users/students' path is connected to this file.
assignmentRoutes.route('/assignments')
    .get(protect, getSubmittedAssignment)
    .post(protect, addAnswer);

export default assignmentRoutes;