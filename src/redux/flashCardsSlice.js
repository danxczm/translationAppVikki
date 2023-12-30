import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    entities: [],
};

export const flashCardsSlice = createSlice({
    name: 'flashCards',
    initialState,
    reducers: {
        sortFlashCardsLocally: (state, action) => {
            state.entities = [...action.payload].sort((a, b) => {
                return a.word.localeCompare(b.word);
            });
        },
    },
});

export const { sortFlashCardsLocally } = flashCardsSlice.actions;

export default flashCardsSlice.reducer;
