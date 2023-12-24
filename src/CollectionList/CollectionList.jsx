import { useContext } from 'react';
import { deleteCollectionFireBase } from '../Firebase/firebaseActions';

import { AiOutlineDelete } from 'react-icons/ai';

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
        <>
            {dataCollection.length > 0 && (
                <div className="h-[100px] w-full border-2 rounded-lg flex items-center">
                    <ul className="flex [&>*]:ml-2">
                        {dataCollection.map((item, i) => {
                            return (
                                <li
                                    key={i}
                                    onClick={() => getCollectionFireBase(i)}
                                    className="relative flex justify-center items-center rounded-xl h-20 w-20 bg-blue-700 cursor-pointer"
                                >
                                    <p className="text-center text-white text-xs">
                                        Collection {i + 1}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={e => {
                                            deleteCollection(e, item.id);
                                        }}
                                        className="h-5 w-14 bg-white hover:bg-blue-300 absolute top-1 rounded-full flex items-center justify-center"
                                    >
                                        <AiOutlineDelete size="15px" />
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </>
    );
};

export default CollectionList;
