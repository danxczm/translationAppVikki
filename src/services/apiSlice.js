import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query';

export const flashCardsApi = createApi({
    reducerPath: 'flashCardsApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Card', 'Collection'],
    endpoints: builder => ({}),
});
