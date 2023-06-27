import { splitApi } from "../splitApi";

const BASE_URL = '/users/students'

export const studentAnswerSlice = splitApi.injectEndpoints({
    endpoints: (build) => ({
        addAnswer: build.mutation({
            query(body) {
                return {
                    url: `${BASE_URL}/assignments`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: ['Assignment']
        }),
        getAssignments: build.query({
            query: () => ({
                url: `${BASE_URL}/assignments`,
                method: 'GET'
            }),
            providesTags: ['Assignment']
        }),
        updateAssignment: build.mutation({
            query(assignment) {
                return {
                    url: `${BASE_URL}/assignments/${assignment._id}`,
                    method: 'PUT',
                    body: assignment,
                }
            },
            invalidatesTags: ['Assignment']
        })
    })
})

export const { useAddAnswerMutation, useGetAssignmentsQuery, useUpdateAssignmentMutation } = studentAnswerSlice;