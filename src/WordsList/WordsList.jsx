import { useContext, useState } from 'react';
import { deleteDocumentFireBase } from '../Firebase/firebaseActions';
import { ContextData } from '../App';

const WordsList = () => {
    const [isLoading, setIsLoading] = useState(false);

    const { dataFb } = useContext(ContextData);

    return (
        <div>
            {dataFb.length === 0 ? (
                <h1 className="p-5 text-center font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-blue-200 to-purple-800">
                    You haven't added any words yet
                </h1>
            ) : (
                <div className="grid grid-cols-5 gap-3">
                    {dataFb.map(({ id, picture, word, translation }) => (
                        <div key={id} className="relative h-[270px] w-[270px]">
                            <img
                                className="object-cover object-center rounded h-[270px] w-[270px]"
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
                                <h1 className="p-1 text-white bg-gradient-to-r from-teal-400/50 to-blue-500/20 font-semibold text-xl">
                                    {word}
                                </h1>
                                <p className="text-gray-200 text-2xl mt-3">
                                    {translation.toLowerCase()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WordsList;
