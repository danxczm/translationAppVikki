import { createContext, useEffect, useState } from 'react';

import useUnsplash from './hooks/useUnsplash';
import SearchBar from './SearchBar/SearchBar';

import {
    addDataFireBase,
    getDataFireBase,
    deleteDocumentFireBase,
    clearCollectionFireBase,
} from './Firebase/firebaseActions';

import './index.css';

export const ContextData = createContext();

const App = () => {
    const [searchWord, setSearchWord] = useState('');
    const [data, setData] = useState([]);
    const { response, isLoading, error, fetchDataUnsplash } = useUnsplash();

    const value = {
        response,
        isLoading,
        error,
        fetchDataUnsplash,
        searchWord,
        setSearchWord,
    };

    useEffect(() => {
        getDataFireBase(setData);
    }, [data]);

    return (
        <ContextData.Provider value={value}>
            <div>
                <div>
                    <p>Total: {data.length}</p>
                </div>
                <SearchBar />
                <div className="flex justify-between px-10">
                    <button
                        type="button"
                        onClick={() => {
                            addDataFireBase(response, searchWord);
                        }}
                        style={{ backgroundColor: 'teal', borderRadius: '10px', padding: '10px' }}
                    >
                        add data to FireBases
                    </button>
                    <button
                        type="button"
                        onClick={() => clearCollectionFireBase()}
                        style={{ backgroundColor: 'teal', borderRadius: '10px', padding: '10px' }}
                    >
                        clear data in FireBase
                    </button>
                </div>
                {data.length === 0 ? (
                    <h1>Empty</h1>
                ) : (
                    <div className="grid grid-cols-5 gap-3 p-10">
                        {data.map(({ id, picture, word }) => (
                            <div key={id} className="relative h-[300px] w-[300px]">
                                <img
                                    className="object-cover object-center rounded h-[300px] w-[300px]"
                                    src={picture}
                                    alt={word}
                                />

                                <div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            deleteDocumentFireBase(id);
                                        }}
                                        className="absolute top-2 right-2 inline-flex items-center inherit"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            viewBox="0 0 24 24"
                                            fill="black"
                                            strokeWidth="10"
                                            stroke="white"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                <div className="absolute bottom-0 px-4 py-3 bg-gray-500/50 w-full h-36">
                                    <h1 className="p-1 text-white bg-gradient-to-r from-teal-400/50 to-blue-500/20 font-semibold text-4xl">
                                        {word}
                                    </h1>
                                    <p className="text-gray-200">translation</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </ContextData.Provider>
    );
};

export default App;
