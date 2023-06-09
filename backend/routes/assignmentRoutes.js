import express from "express";

import { addAnswer } from '../controllers/assignmentController.js';
import protect from "../middleware/protectMiddleware.js";

const assignmentRoutes = express.Router();

// '/users/students' path is connected to this file.
assignmentRoutes.route('/assignments').post(protect, addAnswer);

export default assignmentRoutes;