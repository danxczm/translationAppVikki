import { createContext, useEffect, useState, useRef } from 'react';
import ReactToPrint from 'react-to-print';

import { getDataFireBase } from './Firebase/firebaseActions';
import { fetchMultipleData } from './utils/fetchMultipleData';

import SearchBar from './SearchBar/SearchBar';
import Counter from './Counter/Counter';
import WordsList from './WordsList/WordsList';

import './index.css';

export const ContextData = createContext();

const App = () => {
    const [searchWord, setSearchWord] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [languageTranslation, setLanguageTranslation] = useState('uk');
    const [data, setData] = useState([]);
    const [dataFb, setDataFb] = useState([]);

    const componentRef = useRef();

    const fetchData = async () => {
        try {
            const result = await fetchMultipleData(searchWord, languageTranslation);
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getDataFireBase(setDataFb);
    }, []);

    const value = {
        languageTranslation,
        data,
        dataFb,
        searchWord,
        setSearchWord,
        fetchData,
    };

    return (
        <ContextData.Provider value={value}>
            <div className="py-5 px-10">
                <ReactToPrint
                    trigger={() => (
                        <button class="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                                />
                            </svg>
                            Save as PDF
                        </button>
                    )}
                    content={() => componentRef.current}
                />
                <Counter />
                <SearchBar />
                <div ref={componentRef}>
                    <WordsList />
                </div>
            </div>
        </ContextData.Provider>
    );
};

export default App;

// ! plan:
// - possability to save as pdf
// - show loading (change style of the button to "loading")
// - add translation language option
// - rerender page when dataFb changes
// - add description or example on each flashcard
