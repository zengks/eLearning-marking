import expressAsyncHandler from "express-async-handler";

import StudentAnswer from "../models/studentAnswerModel.js";

// @desc add a new submitted assignment
// route POST /users/students
// @access Public
const addAnswer = expressAsyncHandler(async (req, res) => {
    const { studentId, questionNumber, answers, submitted, score } = req.body;

    // check if it's a student logged in
    if (!req.user.isAdmin) {
        const assignment = await StudentAnswer.create({
            studentId,
            questionNumber: `Assignment ${questionNumber}`,
            answers,
            submitted,
            score,
        });

        if (assignment) {
            console.log(`Assignment ${questionNumber} has been submitted.`)
            res.status(200).json({
                studentId: assignment.studentId,
                questionNumber: assignment.questionNumber,
                answers: assignment.answers,
                submitted: assignment.submitted
            })
        }
    } else {
        res.status(401);
        throw new Error("Invalid user")
    }
})

const getSubmittedAssignment = expressAsyncHandler(async (req, res) => {
    const assignments = await StudentAnswer.find();
    if (assignments) {
        res.status(200).json({
            submittedAssignment: assignments
        })
    } else {
        res.status(401)
        throw new Error("Failed to retrieve submitted assignments")
    }
})

export {
    addAnswer,
    getSubmittedAssignment,
}