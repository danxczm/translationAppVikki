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
        clearFlashCards: builder.mutation({
            async queryFn() {
                try {
                    const docs = await getDocs(collection(dataBase, 'flashCards'));
                    const deletePromises = docs.docs.map(doc => deleteDoc(doc.ref));

                    await Promise.all(deletePromises);

                    return { data: 'ok' };
                } catch (error) {
                    return { error };
                }
            },
            invalidatesTags: ['Card'],
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
        deleteFlashCard: builder.mutation({
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
        updateFlashCard: builder.mutation({
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
    useClearFlashCardsMutation,
    useAddFlashCardMutation,
    useDeleteFlashCardMutation,
    useUpdateFlashCardMutation,
} = flashCardsApi;
