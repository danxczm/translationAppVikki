import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { initialState } from './InitialState';
import { getCardsThunk, getCardsCollectionThunk, deleteCardThunk } from './Thunk';
import * as handler from './Handler';

const STATUS = {
    PENDING: 'pending',
    REJECTED: 'rejected',
    FULFILLED: 'fulfilled',
};

const arrOfCases = [getCardsThunk, getCardsCollectionThunk, deleteCardThunk];

const casesSetter = status => arrOfCases.map(thunk => thunk[status]);

export const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    extraReducers: builder => {
        const { PENDING, REJECTED, FULFILLED } = STATUS;
        builder
            .addCase(getCardsThunk.fulfilled, handler.cardsSliceFulfilled)
            .addCase(getCardsCollectionThunk.fulfilled, handler.cardsCollectionSliceFulfilled)
            .addCase(deleteCardThunk.fulfilled, handler.deleteCardSliceFulfilled)
            .addMatcher(isAnyOf(...casesSetter(PENDING)), handler.cardsSlicePending)
            .addMatcher(isAnyOf(...casesSetter(REJECTED)), handler.cardsSliceRejected);
    },
});

export default cardsSlice.reducer;
