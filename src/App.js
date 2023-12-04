import { createContext, useEffect, useState, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { dataBase } from './Firebase/firebaseConfig';
import { addDataFireBase } from './Firebase/firebaseActions';
import ReactToPrint from 'react-to-print';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchMultipleData } from './utils/fetchMultipleData';

import SearchBar from './SearchBar/SearchBar';
import WordListFunctionality from './WordListFunctionality/WordListFunctionality';
import WordsList from './WordsList/WordsList';
import Edit from './Edit/Edit';
import CollectionList from './CollectionList/CollectionList';

export const ContextData = createContext();

const App = () => {
    const [searchWord, setSearchWord] = useState('');
    const [languageTranslation, setLanguageTranslation] = useState({
        language: 'uk',
        icon: '🇺🇦',
        fullName: 'Ukrainian',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedDataItem, setSelectedDataItem] = useState(null);
    const [data, setData] = useState([]);
    const [dataCollection, setDataCollection] = useState([]);

    const componentRef = useRef();

    const getDataFireBase = async _ => {
        const querySnapshot = await getDocs(collection(dataBase, 'data'));
        const cloudFirestoreData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(cloudFirestoreData);
    };

    const getCollectionFireBase = async index => {
        const querySnapshot = await getDocs(collection(dataBase, 'collection'));
        const cloudFirestoreCollection = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        setDataCollection(cloudFirestoreCollection);

        if (index !== undefined) {
            const newCollectionData = Object.values(cloudFirestoreCollection[index]);
            for (let i = 0; i < newCollectionData.length; i++) {
                if (typeof newCollectionData[i] === 'string') return;
                await addDataFireBase(newCollectionData[i]);

                getDataFireBase();
            }
        }
    };

    const fetchData = async () => {
        try {
            const result = await fetchMultipleData(searchWord, languageTranslation.language);
            const { translation, word } = result;

            if (translation === word) {
                return toast.error(
                    `You cant translete ${languageTranslation.fullName} to ${languageTranslation.fullName}! Click the checkbox to select a language for translation!`,
                    { toastId: 'error' }
                );
            }

            data.push(result);
            addDataFireBase(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleEditItem = id => {
        const item = data.find(item => id === item.id);
        setSelectedDataItem(item);
        setIsEditing(true);
    };

    useEffect(() => {
        getDataFireBase();
        getCollectionFireBase();
    }, []);

    const value = {
        languageTranslation,
        setLanguageTranslation,
        isEditing,
        setIsEditing,
        selectedDataItem,
        data,
        setData,
        searchWord,
        setSearchWord,
        fetchData,
        getDataFireBase,
        handleEditItem,
        getCollectionFireBase,
        dataCollection,
        setDataCollection,
    };

    return (
        <ContextData.Provider value={value}>
            <ToastContainer />
            <div className="p-5">
                <ReactToPrint
                    trigger={() => (
                        <button className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
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
                                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                                />
                            </svg>
                            Save as PDF
                        </button>
                    )}
                    content={() => componentRef.current}
                />
                {isEditing ? (
                    <Edit />
                ) : (
                    <>
                        <CollectionList />
                        <div className="sticky top-0 z-10">
                            <WordListFunctionality />
                            <SearchBar />
                        </div>
                        <div ref={componentRef}>
                            <WordsList />
                        </div>
                    </>
                )}
            </div>
        </ContextData.Provider>
    );
};

export default App;
