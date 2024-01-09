import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { dataBase } from '../Firebase/firebaseConfig';

export const flashCardsCollection = createApi({
    reducerPath: 'flashCardsCollection',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Collection'],
    endpoints: builder => ({
        getFlashCardsCollection: builder.query({
            async queryFn() {
                try {
                    const querySnapshot = await getDocs(
                        collection(dataBase, 'flashCardsCollection')
                    );
                    const data = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    return { data };
                } catch (error) {
                    return { error };
                }
            },
            providesTags: ['Collection'],
        }),
        createFlashCardsCollection: builder.mutation({
            async queryFn(data) {
                try {
                    const docRef = await doc(
                        collection(dataBase, 'flashCardsCollection'),
                        Date.now().toString()
                    );
                    setDoc(docRef, { ...data });
                    return { data };
                } catch (error) {
                    return { error };
                }
            },
            invalidatesTags: ['Collection'],
        }),
        printFlashCardsCollection: builder.mutation({
            async queryFn({ data, index }) {
                try {
                    const newCollectionData = Object.values(data[index]);

                    for (let i = 0; i < newCollectionData.length; i++) {
                        if (typeof newCollectionData[i] === 'string') return { data: 'ok' };
                        const docRef = doc(
                            collection(dataBase, 'flashCards'),
                            Date.now().toString()
                        );
                        await setDoc(docRef, newCollectionData[i]);
                    }

                    return { data: 'ok' };
                } catch (error) {
                    return { error };
                }
            },
            invalidatesTags: ['Card'],
        }),
    }),
});

export const {
    useGetFlashCardsCollectionQuery,
    useCreateFlashCardsCollectionMutation,
    usePrintFlashCardsCollectionMutation,
} = flashCardsCollection;
