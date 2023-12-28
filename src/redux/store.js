import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './features/cards/Slice';

export const store = configureStore({
    reducer: {
        cards: cardsReducer,
    },
});
