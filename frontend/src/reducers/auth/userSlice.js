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
            },
            invalidatesTags: ['User']
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
        logout: build.mutation({
            query() {
                return {
                    url: `${BASE_URL}/logout`,
                    method: 'POST',
                }
            }
        }),
        getStudents: build.query({
            query: () => ({
                url: `${BASE_URL}/students`,
                method: 'GET',
            }),
            providesTags: ['User']
        })
    })
})

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useGetStudentsQuery } = userSlice;