import { splitApi } from "../splitApi";

// const AUTH_URL = '/auth/users'

export const userSlice = splitApi.injectEndpoints({
    endpoints: (build) => ({
        register: build.mutation({
            query(body) {
                return {
                    url: '/register',
                    method: 'POST',
                    body,
                }
            }
        }),
        login: build.mutation({
            query(body) {
                return {
                    url: '/login',
                    method: 'POST',
                    body,
                }
            }
        })
    })
})

export const { useRegisterMutation, useLoginMutation } = userSlice;