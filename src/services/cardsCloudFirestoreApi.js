import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { dataBase } from '../Firebase/firebaseConfig';

export const flashCardsApi = createApi({
    reducerPath: 'flashCardsApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Card'],
    endpoints: builder => ({
        getFlashCards: builder.query({
            async queryFn() {
                try {
                    const querySnapshot = await getDocs(collection(dataBase, 'flashCards'));
                    const data = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    return { data };
                } catch (error) {
                    return { error };
                }
            },
            providesTags: ['Card'],
        }),
        addFlashCard: builder.mutation({
            async queryFn(data) {
                try {
                    const docRef = doc(collection(dataBase, 'flashCards'), Date.now().toString());
                    await setDoc(docRef, {
                        ...data,
                        // picture,
                        // translation,
                        // word,
                    });
                    return { data: 'ok' };
                } catch (error) {
                    return { error };
                }
            },
            invalidatesTags: ['Card'],
        }),
        deleteCard: builder.mutation({
            async queryFn(id) {
                try {
                    await deleteDoc(doc(dataBase, 'flashCards', id));
                    return { data: 'ok' };
                } catch (error) {
                    return { error };
                }
            },
            invalidatesTags: ['Card'],
        }),
        updateCard: builder.mutation({
            async queryFn({ id, editedData }) {
                try {
                    await updateDoc(doc(dataBase, 'flashCards', id), {
                        ...editedData,
                    });
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
    useGetFlashCardsQuery,
    useAddFlashCardMutation,
    useDeleteCardMutation,
    useUpdateCardMutation,
} = flashCardsApi;
