import { useContext } from 'react';
import { deleteDocumentFireBase } from '../Firebase/firebaseActions';
import { ContextData } from '../App';

const WordsList = () => {
    const { data, setData, handleEditItem } = useContext(ContextData);

    const deleteItem = id => {
        deleteDocumentFireBase(id);
        const filteredData = data.filter(item => item.id !== id);
        setData(filteredData);
    };

    return (
        <div>
            {data.length === 0 ? (
                <h1 className="p-5 text-center font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-blue-200 to-purple-800">
                    You haven't added any words yet
                </h1>
            ) : (
                <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-3">
                    {data?.map(item => (
                        <div key={item?.id} className="relative h-[270px] w-[270px] group">
                            <img
                                className="object-cover object-center rounded h-[270px] w-[270px]"
                                src={item?.picture}
                                alt={item?.word}
                            />
                            {/* delete button */}
                            <button
                                type="button"
                                onClick={() => {
                                    deleteItem(item?.id);
                                }}
                                className="h-5 w-5 bg-white absolute top-2 right-2 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="white"
                                    strokeWidth="10"
                                    stroke="black"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            </button>

                            {/* edit button */}
                            <button
                                type="button"
                                onClick={() => handleEditItem(item?.id)}
                                className="h-5 w-5 bg-white absolute top-2 left-2 flex items-center justify-center rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="black"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                </svg>
                            </button>
                            <div className="absolute bottom-0 px-4 py-3 bg-gray-500/50 w-full h-36">
                                <h1 className="p-1 text-white bg-gradient-to-r from-teal-400/50 to-blue-500/20 font-semibold text-xl">
                                    {item?.word}
                                </h1>
                                <p className="text-gray-200 text-2xl mt-3 leading-6	">
                                    {item?.translation?.toLowerCase()}
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
