import expressAsyncHandler from "express-async-handler";

import StudentAnswer from "../models/studentAnswerModel.js";

// @desc add a new submitted assignment
// route POST /users/students
// @access Public
const addAnswer = expressAsyncHandler(async (req, res) => {
    const { studentId, questionNumber, description, answers, submitted, score } = req.body;

    // check if it's a student logged in
    if (!req.user.isAdmin) {
        const assignment = await StudentAnswer.create({
            studentId,
            questionNumber: `Assignment ${questionNumber}`,
            description,
            answers,
            submitted,
            score,
        });

        if (assignment) {
            console.log(`Assignment ${questionNumber} has been submitted.`)
            res.status(200).json({
                studentId: assignment.studentId,
                questionNumber: assignment.questionNumber,
                description: assignment.description,
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

const updateSubmittedAssignment = expressAsyncHandler(async (req, res) => {
    const { assignmentId } = req.params
    console.log('assignment ID: ', assignmentId)
    const assignment = await StudentAnswer.findById(assignmentId)

    console.log('found: ', assignment)

    if (assignment) {
        assignment.studentId = req.body.studentId || assignment.studentId
        assignment.questionNumber = req.body.questionNumber || assignment.questionNumber
        assignment.description = req.body.description || assignment.description
        assignment.answers = req.body.answers || assignment.answers
        assignment.submitted = req.body.submitted || assignment.submitted
        assignment.score = req.body.score || assignment.score

        const updatedAssignment = await assignment.save()

        console.log('updated: ', updatedAssignment)

        res.status(200).json({
            updatedAssignment: assignment
        })

    } else {
        res.status(401)
        throw new Error("Failed to update the assignments")
    }
})

export {
    addAnswer,
    getSubmittedAssignment,
    updateSubmittedAssignment,
}