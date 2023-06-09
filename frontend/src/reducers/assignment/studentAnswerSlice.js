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
        })
    })
})

export const { useAddAnswerMutation } = studentAnswerSlice;