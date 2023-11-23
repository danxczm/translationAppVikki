import { useContext } from 'react';

import { ContextData } from '../App';
import { collection, deleteDoc, getDocs } from 'firebase/firestore';
import { dataBase } from '../Firebase/firebaseConfig';

const Counter = () => {
    const { data, setData, getDataFireBase } = useContext(ContextData);

    const clearCollectionFireBase = async () => {
        try {
            await getDocs(collection(dataBase, 'data')).then(querySnapshot =>
                querySnapshot.docs.forEach(doc => deleteDoc(doc.ref))
            );
            setData([]);
            getDataFireBase();
            console.log('Collection cleared successfully.');
        } catch (error) {
            console.error('Error clearing collection: ', error);
        }
    };

    return (
        <div className="flex items-center justify-between bg-white ml-auto">
            <p className="inline-flex items-center px-5 py-2.5 text-xl font-medium text-center cursor-default">
                Total:
                <span className="inline-flex items-center justify-center w-12 h-8 ms-2 text-l font-semibold text-blue-800 bg-blue-200 rounded-full">
                    {data.length}
                </span>
            </p>

            <button
                type="button"
                onClick={clearCollectionFireBase}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xl font-medium rounded-md"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                </svg>
                Clear
            </button>
        </div>
    );
};

export default Counter;
