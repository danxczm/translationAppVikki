import { configureStore } from '@reduxjs/toolkit';
import { flashCardsApi } from '../services/cardsCloudFirestoreApi';
import flashCardsReducer from './flashCardsSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
    reducer: {
        flashCards: flashCardsReducer,
        [flashCardsApi.reducerPath]: flashCardsApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(flashCardsApi.middleware),
});

setupListeners(store.dispatch);
