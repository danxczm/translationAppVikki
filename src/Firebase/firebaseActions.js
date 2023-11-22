import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { dataBase } from './firebaseConfig';

export const addDataFireBase = async response => {
    console.log(`response: `, response);

    try {
        const docRef = await doc(collection(dataBase, 'data'), Date.now().toString());
        setDoc(docRef, {
            id: response[0].id,
            picture: response[0].picture,
            translation: response[0].translation,
            word: response[0].word,
        });
        console.log('Document written with ID: ', docRef.id);
    } catch (e) {
        console.error('Error adding document: ', e);
    }
};

export const deleteDocumentFireBase = async id => {
    try {
        const dataDoc = doc(dataBase, 'data', id);
        await deleteDoc(dataDoc);
    } catch (error) {
        console.log(`error: `, error);
    }
};

export const clearCollectionFireBase = async () => {
    try {
        await getDocs(collection(dataBase, 'data')).then(querySnapshot =>
            querySnapshot.docs.forEach(doc => deleteDoc(doc.ref))
        );

        console.log('Collection cleared successfully.');
    } catch (error) {
        console.error('Error clearing collection: ', error);
    }
};
