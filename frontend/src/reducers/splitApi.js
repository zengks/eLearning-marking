import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const splitApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: '',
    }),
    endpoints: () => ({})
})