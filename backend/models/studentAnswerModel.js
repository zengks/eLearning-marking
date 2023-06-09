import mongoose from "mongoose";

const studentAnswerSchema = mongoose.Schema({
    studentId: {
        type: String,
        required: true,
    },
    questionNumber: {
        type: String,
        required: true,
    },
    answers: {
        type: String,
        required: true,
    },
    submitted: {
        type: Boolean,
        required: true,
        default: false,
    },
    score: {
        type: String,
        required: true,
        default: "Not Marked Yet",
    }
}, {
    timestamps: true,
})

const StudentAnswer = mongoose.model('StudentAnswer', studentAnswerSchema);

export default StudentAnswer;