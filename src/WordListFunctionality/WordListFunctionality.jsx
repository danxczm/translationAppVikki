import { useContext } from 'react';

import { ContextData } from '../App';
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { dataBase } from '../Firebase/firebaseConfig';

import { HiOutlineTrash, HiOutlineSortDescending, HiOutlineSave } from 'react-icons/hi';

const WordListFunctionality = () => {
    const { data, setData, getDataFireBase } = useContext(ContextData);

    const clearCollectionFireBase = async () => {
        try {
            const docs = await getDocs(collection(dataBase, 'data'));
            const deletePromises = docs.docs.map(doc => deleteDoc(doc.ref));

            await Promise.all(deletePromises);

            setData([]);
            await getDataFireBase();
            console.log('Collection cleared successfully.');
        } catch (error) {
            console.error('Error clearing collection: ', error);
        }
    };

    const addCollectionFireBase = async _ => {
        try {
            const docRef = await doc(collection(dataBase, 'collection'), Date.now().toString());
            setDoc(docRef, { ...data });
            console.log('Document written with ID: ', docRef.id);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    const sortCollectionHandler = () => {
        const sortedData = [...data].sort((a, b) => {
            return a.word.localeCompare(b.word);
        });

        setData(sortedData);
    };

    return (
        <div className="flex items-center bg-white ml-auto py-2">
            <p className="inline-flex items-center px-5 py-2.5 text-xl font-medium text-center cursor-default">
                Total:
                <span className="inline-flex items-center justify-center w-12 h-8 ms-2 text-l font-semibold text-blue-800 bg-blue-200 rounded-full">
                    {data.length}
                </span>
            </p>

            <div className="ml-auto flex items-center justify-center">
                <div className="group relative">
                    <button
                        type="button"
                        disabled={data.length === 0}
                        onClick={addCollectionFireBase}
                        title="Save collection."
                        className="items-center justify-center p-3 bg-blue-600 hover:bg-blue-700 text-white text-xl font-medium rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        <HiOutlineSave size="20px" />
                    </button>
                    <div className="invisible group-hover:visible absolute">
                        <p className="text-xs">Save collection.</p>
                    </div>
                </div>

                <div className="group relative">
                    <button
                        type="button"
                        disabled={data.length === 0}
                        onClick={sortCollectionHandler}
                        title="Sort collection from A-Z."
                        className="ml-1 items-center justify-center p-3 bg-blue-600 hover:bg-blue-700 text-white text-xl font-medium rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        <HiOutlineSortDescending size="20px" />
                    </button>
                    <div className="invisible group-hover:visible absolute">
                        <p className="text-xs">Sort collection.</p>
                    </div>
                </div>
                <div className="group relative">
                    <button
                        type="button"
                        disabled={data.length === 0}
                        onClick={clearCollectionFireBase}
                        title="Clear collection."
                        className="ml-1 items-center justify-center p-3 bg-blue-600 hover:bg-blue-700 text-white text-xl font-medium rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        <HiOutlineTrash size="20px" />
                    </button>
                    <div className="invisible group-hover:visible absolute">
                        <p className="text-xs">Clear collection.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WordListFunctionality;
