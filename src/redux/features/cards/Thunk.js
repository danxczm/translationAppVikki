import { createAsyncThunk } from '@reduxjs/toolkit';

import {
    deleteCardCloudFirestore,
    getCardsCloudFirestore,
    getCollectionCloudFirestore,
} from '../../../Firebase/firebaseActions';

export const getCardsThunk = createAsyncThunk('cards/getCardsCloudFirestore', async () => {
    return await getCardsCloudFirestore();
});

export const deleteCardThunk = createAsyncThunk('cards/deleteCardCloudFirestore', async id => {
    await deleteCardCloudFirestore(id);
    return id;
});

export const getCardsCollectionThunk = createAsyncThunk(
    'cards/getCardsCollectionCloudFirestore',
    async () => {
        // ! async () => { тут ми можемо щосб приймати ззовні і передавати його далі у функцію
        return await getCollectionCloudFirestore();
    }
);
