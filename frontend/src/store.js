import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./reducers/auth/authSlice";
import { splitApi } from "./reducers/splitApi";

const store = configureStore({
    reducer: {
        auth: authSlice,
        [splitApi.reducerPath]: splitApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(splitApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;