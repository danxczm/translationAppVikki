import { apiSlice } from '../api/apiSlice';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { fetchMultipleData } from '../../utils/fetchMultipleData';

import { dataBase } from '../../Firebase/firebaseConfig';
import { toast } from 'react-toastify';

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFlashCards: builder.query({
            queryFn: async () => {
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
            providesTags: ['FlashCards'],
        }),

        getSingleFlashCard: builder.query({
            queryFn: async flashCardId => {
                try {
                    const docRef = doc(dataBase, 'flashCards', flashCardId);
                    const snapshot = await getDoc(docRef);
                    return { data: snapshot.data() };
                } catch (error) {
                    return { error };
                }
            },
            providesTags: ['FlashCards'],
        }),

        clearFlashCards: builder.mutation({
            queryFn: async () => {
                try {
                    const docs = await getDocs(collection(dataBase, 'flashCards'));
                    const deletePromises = docs.docs.map(doc => deleteDoc(doc.ref));

                    await Promise.all(deletePromises);

                    return { data: 'ok' };
                } catch (error) {
                    return { error };
                }
            },
            invalidatesTags: ['FlashCards'],
        }),

        addFlashCard: builder.mutation({
            queryFn: async ({ searchWord, language, languageFullName }) => {
                try {
                    const result = await fetchMultipleData(searchWord, language);

                    // ! not sure this should be here
                    const { translation, word } = result;

                    if (translation.toLowerCase() === word.toLowerCase()) {
                        return toast.error(
                            `You can't translate ${languageFullName} to ${languageFullName}! Click the checkbox to select a language for translation!`
                        );
                    }
                    // !

                    const docRef = doc(collection(dataBase, 'flashCards'), Date.now().toString());
                    await setDoc(docRef, {
                        ...result,
                    });
                    return { data: 'ok' };
                } catch (error) {
                    return { error };
                }
            },
            invalidatesTags: ['FlashCards'],
        }),

        deleteFlashCard: builder.mutation({
            queryFn: async id => {
                try {
                    await deleteDoc(doc(dataBase, 'flashCards', id));
                    return { data: 'ok' };
                } catch (error) {
                    return { error };
                }
            },
            invalidatesTags: ['FlashCards'],
        }),

        updateFlashCard: builder.mutation({
            queryFn: async ({ flashCardId, newData }) => {
                try {
                    await updateDoc(doc(dataBase, 'flashCards', flashCardId), {
                        ...newData,
                    });
                    return { data: 'ok' };
                } catch (error) {
                    return { error };
                }
            },
            invalidatesTags: ['FlashCards'],
        }),
    }),
});

export const {
    useGetFlashCardsQuery,
    useGetSingleFlashCardQuery,
    useClearFlashCardsMutation,
    useAddFlashCardMutation,
    useDeleteFlashCardMutation,
    useUpdateFlashCardMutation,
} = extendedApiSlice;
