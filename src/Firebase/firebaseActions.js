import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { dataBase } from './firebaseConfig';

export const addDataFireBase = async response => {
    const { word, translation, picture } = response;

    console.log(`response: `, response);

    try {
        const docRef = doc(collection(dataBase, 'data'), Date.now().toString());
        await setDoc(docRef, {
            picture,
            translation,
            word,
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
