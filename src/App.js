import { createContext, useEffect, useState, useRef } from 'react';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { dataBase } from './Firebase/firebaseConfig';
import { addDataFireBase } from './Firebase/firebaseActions';
import ReactToPrint from 'react-to-print';

import { fetchMultipleData } from './utils/fetchMultipleData';

import SearchBar from './SearchBar/SearchBar';
import Counter from './Counter/Counter';
import WordsList from './WordsList/WordsList';
import Edit from './Edit/Edit';

export const ContextData = createContext();

const App = () => {
    const [searchWord, setSearchWord] = useState('');
    const [languageTranslation, setLanguageTranslation] = useState({ language: 'uk', icon: '🇺🇦' });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedDataItem, setSelectedDataItem] = useState(null);
    const [data, setData] = useState([]);

    const componentRef = useRef();

    const getDataFireBase = async _ => {
        const querySnapshot = await getDocs(collection(dataBase, 'data'));
        const cloudFirestoreData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(cloudFirestoreData);
    };

    const fetchData = async () => {
        try {
            const result = await fetchMultipleData(searchWord, languageTranslation.language);
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

    // const addCollectionFireBase = async _ => {
    //     try {
    //         const docRef = await doc(collection(dataBase, 'collection'), Date.now().toString());
    //         setDoc(docRef, { ...data });
    //         console.log('Document written with ID: ', docRef.id);
    //     } catch (e) {
    //         console.error('Error adding document: ', e);
    //     }
    // };

    // const getCollectionFireBase = async () => {
    //     const querySnapshot = await getDocs(collection(dataBase, 'collection'));
    //     const cloudFirestoreData = querySnapshot.docs.map(doc => ({ ...doc.data() }));
    //     const newData = Object.values(cloudFirestoreData[0]);
    //     setData(newData);

    //     for (let i = 0; i < newData.length; i++) {
    //         await addDataFireBase(newData[i]);
    //     }
    // };

    const sortDataHandler = () => {
        const sortedData = [...data].sort((a, b) => {
            return a.word.localeCompare(b.word);
        });

        setData(sortedData);
    };

    useEffect(() => {
        getDataFireBase();
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
    };

    return (
        <ContextData.Provider value={value}>
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
                <buttom
                    onClick={sortDataHandler}
                    className=" px-5 ml-3 cursor-pointer text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl"
                >
                    sort
                </buttom>
                {isEditing ? (
                    <Edit />
                ) : (
                    <>
                        {/* <button type="button" onClick={addCollectionFireBase}>
                            add -------
                        </button> */}
                        {/* <button type="button" onClick={getCollectionFireBase}>
                            ------get
                        </button> */}

                        <div className="sticky top-0 z-10">
                            <Counter />
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

// ! plan:
// wip: save (and delete) collection of data for later needs
// - show loading (change style of the button to "loading")
// - add description or example on each flashcard
