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
            }
        }),
        getAssignments: build.query({
            query: () => ({
                url: `${BASE_URL}/assignments`,
                method: 'GET'
            })
        })
    })
})

export const { useAddAnswerMutation, useGetAssignmentsQuery } = studentAnswerSlice;