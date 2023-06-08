import { splitApi } from "../splitApi";

const BASE_URL = '/auth/users'

export const userSlice = splitApi.injectEndpoints({
    endpoints: (build) => ({
        register: build.mutation({
            query(body) {
                return {
                    url: `${BASE_URL}`,
                    method: 'POST',
                    body,
                }
            }
        }),
        login: build.mutation({
            query(body) {
                return {
                    url: `${BASE_URL}/login`,
                    method: 'POST',
                    body,
                }
            }
        }),
    })
})

export const { useRegisterMutation, useLoginMutation } = userSlice;