export const cardsSlicePending = state => {
    state.status = 'pending';
};

export const cardsSliceFulfilled = (state, action) => {
    state.status = 'fulfilled';
    state.entities = [...action.payload];
    state.error = null;
};

export const cardsSliceRejected = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
};

export const deleteCardSliceFulfilled = (state, action) => {
    state.status = 'fulfilled';
    state.entities = state.entities.filter(item => item.id !== action.payload);
    state.error = null;
};

export const cardsCollectionSliceFulfilled = (state, action) => {
    state.status = 'fulfilled';
    state.collection = [...action.payload];
    state.error = null;
};
