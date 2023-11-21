import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { dataBase } from './firebaseConfig';

export const addDataFireBase = async (response, word) => {
    console.log(`responseData: `, response);
    console.log(`word: `, word);

    const { id, picture, translation } = response;

    try {
        const docRef = await doc(collection(dataBase, 'data'), Date.now().toString());
        setDoc(docRef, {
            id,
            picture,
            translation,
            word,
            // id: response[0].id,
            // picture: response[0].picture,
            // translation: response[0].translation,
            // word,
        });
        console.log('Document written with ID: ', docRef.id);
    } catch (e) {
        console.error('Error adding document: ', e);
    }
};

export const getDataFireBase = async setData => {
    await getDocs(collection(dataBase, 'data'))
        .then(querySnapshot => {
            const fbData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setData(fbData);
        })
        .catch(err => console.log(`err: `, err));
};

export const deleteDocumentFireBase = async id => {
    const dataDoc = doc(dataBase, 'data', id);
    await deleteDoc(dataDoc);
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
