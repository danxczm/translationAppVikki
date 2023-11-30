import { useContext } from 'react';
import { deleteCollectionFireBase } from '../Firebase/firebaseActions';
import { ContextData } from '../App';

const CollectionList = () => {
    const { getCollectionFireBase, dataCollection, setDataCollection } = useContext(ContextData);

    const deleteCollection = (e, id) => {
        e.stopPropagation();
        deleteCollectionFireBase(id);
        const filteredCollection = dataCollection.filter(item => item.id !== id);
        setDataCollection(filteredCollection);
    };

    return (
        <div className="p-2 my-2 h-[100px] border-2 rounded-lg">
            {dataCollection.length !== 0 ? (
                <ul className="flex [&>*:not(:first-child)]:ml-2">
                    {dataCollection.map((item, i) => {
                        return (
                            <li
                                key={i}
                                onClick={() => getCollectionFireBase(i)}
                                className="relative flex justify-center items-center rounded-xl h-20 w-20 bg-blue-700 cursor-pointer"
                            >
                                <p className="text-center text-white text-xs">Collection {i + 1}</p>
                                <button
                                    type="button"
                                    onClick={e => {
                                        deleteCollection(e, item.id);
                                    }}
                                    className="h-4 w-4 bg-white absolute top-2 right-2 rounded-md flex items-center justify-center"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-3 w-3"
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
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <h1 className="p-5 text-center font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-purple-800 to-blue-200">
                        Collection is empty
                    </h1>
                </div>
            )}
        </div>
    );
};

export default CollectionList;
