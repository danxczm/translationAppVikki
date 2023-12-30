import { configureStore } from '@reduxjs/toolkit';
import { flashCardsApi } from '../services/cardsCloudFirestoreApi';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
    reducer: {
        [flashCardsApi.reducerPath]: flashCardsApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(flashCardsApi.middleware),
});

setupListeners(store.dispatch);
