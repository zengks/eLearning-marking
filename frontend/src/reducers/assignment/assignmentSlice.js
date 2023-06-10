import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    submittedAssignment: {
        studentId: "",
        questionNumber: "",
        description: "",
        answers: "",
        submitted: false,
        score: "Not Marked Yet",
    }
}

const assignmentSlice = createSlice({
    name: "assignment",
    initialState,
    reducers: {
        submitAssignment: (state, action) => {
            state.submittedAssignment = action.payload;
        },
    }
})

export const { submitAssignment } = assignmentSlice.actions;

export default assignmentSlice.reducers;