import { createContext, useEffect, useState } from 'react';
import { addDataFireBase } from './Firebase/firebaseActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchMultipleData } from './utils/fetchMultipleData';

import { useDispatch } from 'react-redux';
import { getCardsThunk, getCardsCollectionThunk } from './redux/features/cards/Thunk';

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
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const fetchData = async () => {
        try {
            const result = await fetchMultipleData(searchWord, languageTranslation.language);
            const { translation, word } = result;

            if (translation === word) {
                return toast.error(
                    `You can't translate ${languageTranslation.fullName} to ${languageTranslation.fullName}! Click the checkbox to select a language for translation!`
                );
            }

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
        dispatch(getCardsThunk());
        dispatch(getCardsCollectionThunk());
    }, [dispatch]);

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
        handleEditItem,
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
