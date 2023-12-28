import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { dataBase } from './firebaseConfig';

export const getCardsCloudFirestore = async _ => {
    const querySnapshot = await getDocs(collection(dataBase, 'data'));
    const cloudFirestoreCards = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return cloudFirestoreCards;
};

export const getCollectionCloudFirestore = async index => {
    const querySnapshot = await getDocs(collection(dataBase, 'collection'));
    const cloudFirestoreCardsCollection = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));

    return cloudFirestoreCardsCollection;

    // ! render on click
    // if (index !== undefined) {
    //     const newCollectionData = Object.values(cloudFirestoreCollection[index]);
    //     for (let i = 0; i < newCollectionData.length; i++) {
    //         if (typeof newCollectionData[i] === 'string') return;
    //         await addDataFireBase(newCollectionData[i]);

    //         // getDataFireBase();
    //     }
    // }
};

export const deleteCardCloudFirestore = async id => {
    const dataDoc = doc(dataBase, 'data', id);
    await deleteDoc(dataDoc);

    console.log(`the card is deleted`, id);
};

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

export const deleteCollectionFireBase = async id => {
    try {
        const dataDoc = doc(dataBase, 'collection', id);
        await deleteDoc(dataDoc);
    } catch (error) {
        console.log(`error: `, error);
    }
};
