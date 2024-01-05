import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { flashCardsApi } from '../services/cardsCloudFirestoreApi';
import flashCardsReducer from '../redux/flashCardsSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { flashCardsCollection } from '../services/flashCardsCollectionCloudFirestoreApi';

const rootReducer = combineReducers({
    flashCards: flashCardsReducer,
    [flashCardsApi.reducerPath]: flashCardsApi.reducer,
    [flashCardsCollection.reducerPath]: flashCardsCollection.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(flashCardsApi.middleware)
            .concat(flashCardsCollection.middleware),
});

setupListeners(store.dispatch);
