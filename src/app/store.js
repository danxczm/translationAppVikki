import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
// import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
});

// setupListeners(store.dispatch);
// A utility used to enable refetchOnFocus and refetchOnReconnect behaviors.
// It requires the dispatch method from your store.Calling setupListeners(store.dispatch)
// will configure listeners with the recommended defaults, but you have the option of providing
// a callback for more granular control.
