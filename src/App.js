import { createContext, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { dataBase } from './Firebase/firebaseConfig';
import { addDataFireBase } from './Firebase/firebaseActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchMultipleData } from './utils/fetchMultipleData';
import { toastInitialSettings } from './utils/utils';

import AppContainer from './AppContainer/AppContainer';
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
    const [isLoading, setIsLoading] = useState(false);

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
                    `You can't translate ${languageTranslation.fullName} to ${languageTranslation.fullName}! Click the checkbox to select a language for translation!`
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
        isLoading,
        setIsLoading,
    };

    return (
        <ContextData.Provider value={value}>
            <ToastContainer />
            <AppContainer>
                {isEditing ? (
                    <Edit />
                ) : (
                    <>
                        <CollectionList />
                        <div className="sticky top-0 z-10">
                            <WordListFunctionality />
                            <SearchBar />
                        </div>
                        <WordsList />
                    </>
                )}
            </AppContainer>
        </ContextData.Provider>
    );
};

export default App;
