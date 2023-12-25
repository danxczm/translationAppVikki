import { useContext, useState } from 'react';
import { deleteCollectionFireBase } from '../Firebase/firebaseActions';

import { AiOutlineDelete } from 'react-icons/ai';
import { MdArrowDownward } from 'react-icons/md';

import { ContextData } from '../App';
import Swal from 'sweetalert2';

const CollectionList = () => {
    const { getCollectionFireBase, dataCollection, setDataCollection } = useContext(ContextData);
    const [showCollection, setShowCollection] = useState(false);

    const deleteCollection = (e, id) => {
        deleteCollectionFireBase(id);
        const filteredCollection = dataCollection.filter(item => item.id !== id);
        setDataCollection(filteredCollection);
    };

    const deleteCollectionFunction = async (e, id, index) => {
        e.stopPropagation();
        const result = await Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: `You delete Collection ${index + 1}!`,
            showCancelButton: true,
            confirmButtonText: `Yes, delete Collection ${index + 1}!`,
            cancelButtonText: 'No, cancel!',
        });

        if (result.value) {
            deleteCollection(e, id);
        }
    };

    return (
        <div className="relative">
            <div
                className={`h-10 absolute z-50 ${
                    showCollection ? '-translate-y-10' : '-translate-y-14'
                } hover:-translate-y-10 duration-500 left-2/4 `}
            >
                <button
                    type="button"
                    onClick={() => setShowCollection(prev => !prev)}
                    className="text-white bg-blue-700 hover:bg-blue-800 rounded-full p-2.5"
                >
                    <MdArrowDownward
                        size="20px"
                        className={`${showCollection ? 'rotate-180' : 'rotate-0'} duration-500`}
                        style={{ marginTop: '8px' }}
                    />
                </button>
            </div>
            <div
                className={`absolute flex items-center ${
                    showCollection ? '-translate-y-0' : '-translate-y-60'
                } z-20 h-[80px] w-full bg-white border-2 rounded-lg duration-500`}
            >
                {dataCollection.length !== 0 ? (
                    <ul className="flex [&>*:not(:first-child)]:ml-2 p-3">
                        {dataCollection.map((item, i) => {
                            return (
                                <li
                                    key={i}
                                    onClick={() => {
                                        setShowCollection(false);
                                        getCollectionFireBase(i);
                                    }}
                                    className="relative flex justify-center items-center rounded-xl h-[65px] w-20 bg-blue-700 cursor-pointer"
                                >
                                    <p className="text-center text-white text-xs font-black mt-6">
                                        Collection {i + 1}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={e => {
                                            deleteCollectionFunction(e, item.id, i);
                                        }}
                                        className="h-5 w-16 bg-white hover:bg-blue-300 absolute top-1 rounded-full flex items-center justify-center"
                                    >
                                        <AiOutlineDelete size="15px" />
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
        </div>
    );
};

export default CollectionList;
