import { createSelector } from '@reduxjs/toolkit';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { dataBase } from '../../Firebase/firebaseConfig';
import { apiSlice } from '../api/apiSlice';

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFlashCardsCollection: builder.query({
            queryFn: async () => {
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
            providesTags: ['FlashCardCollection'],
        }),
        createFlashCardsColletion: builder.mutation({
            queryFn: async flashCards => {
                try {
                    const docRef = await doc(
                        collection(dataBase, 'flashCardsCollection'),
                        Date.now().toString()
                    );
                    setDoc(docRef, { ...flashCards });
                    console.log('Collection written with ID: ', docRef.id);
                    return { data: 'ok' };
                } catch (error) {
                    return { error };
                }
            },
            invalidatesTags: ['FlashCardCollection'],
        }),
        deleteFlashCardsColletion: builder.mutation({
            queryFn: async id => {
                try {
                    const dataDoc = doc(dataBase, 'flashCardsCollection', id);
                    await deleteDoc(dataDoc);
                    return { data: 'ok' };
                } catch (error) {
                    return { error };
                }
            },
            invalidatesTags: ['FlashCardCollection'],
        }),
        printFlashCardsCollection: builder.mutation({
            async queryFn({ data, index }) {
                try {
                    const newCollectionData = Object.values(data[index]);

                    for (const flashCard of newCollectionData) {
                        if (typeof flashCard === 'string') continue;

                        const { id, ...newFlashCard } = flashCard;

                        const docRef = doc(
                            collection(dataBase, 'flashCards'),
                            Date.now().toString()
                        );

                        await setDoc(docRef, newFlashCard);
                    }

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
    useGetFlashCardsCollectionQuery,
    useCreateFlashCardsColletionMutation,
    useDeleteFlashCardsColletionMutation,
    usePrintFlashCardsCollectionMutation,
} = extendedApiSlice;

// export const addDataFireBase = async response => {
//     const { word, translation, picture } = response;

//     console.log(`response: `, response);

//     try {
//         const docRef = doc(collection(dataBase, 'data'), Date.now().toString());
//         await setDoc(docRef, {
//             picture,
//             translation,
//             word,
//         });
//         console.log('Document written with ID: ', docRef.id);
//     } catch (e) {
//         console.error('Error adding document: ', e);
//     }
// };
