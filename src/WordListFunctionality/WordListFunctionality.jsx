import { useState } from 'react';

import { collection, doc, setDoc } from 'firebase/firestore';
import { dataBase } from '../Firebase/firebaseConfig';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { sortFlashCardsLocally } from '../redux/flashCardsSlice';

import { HiOutlineTrash, HiOutlineSortDescending, HiOutlineSave } from 'react-icons/hi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import {
    useClearFlashCardsMutation,
    useGetFlashCardsQuery,
} from '../services/cardsCloudFirestoreApi';
import { useCreateFlashCardsCollectionMutation } from '../services/flashCardsCollectionCloudFirestoreApi';

const WordListFunctionality = () => {
    const [open, setOpen] = useState(false);

    const { data } = useGetFlashCardsQuery();

    const dispatch = useDispatch();

    const [clearFlashCards] = useClearFlashCardsMutation();
    const [createFlashCardsCollection] = useCreateFlashCardsCollectionMutation();

    const clearDataFunction = async _ => {
        const result = await Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, clear the collection!',
            cancelButtonText: 'No, cancel!',
        });

        if (result.value) {
            clearFlashCards();
        }
    };

    const addCollectionFireBase = async _ => {
        try {
            const docRef = await doc(collection(dataBase, 'collection'), Date.now().toString());
            setDoc(docRef, { ...data });
            console.log('Collection written with ID: ', docRef.id);
        } catch (e) {
            console.error('Error adding collection: ', e);
        }

        createFlashCardsCollection(data);

        clearFlashCards();
        // getCollectionFireBase();
    };

    // const sortFlashCardsHandler = () => {
    //     if (sorted) {
    //         const sorted = [...data].sort((a, b) => {
    //             return a.word.localeCompare(b.word);
    //         });

    //         return sorted;
    //     }
    //     return;
    // };

    // const sortedFlashCards = sortFlashCardsHandler();

    return (
        <div className="flex items-center bg-background-blue ml-auto py-2">
            <p className="inline-flex items-center px-5 py-2.5 text-xl font-semibold text-center cursor-default">
                Total:
                <span className="inline-flex items-center justify-center w-12 h-8 ms-2 text-l font-semibold text-blue-800 bg-blue-200 rounded-full">
                    {data?.length}
                </span>
            </p>

            <div className="ml-auto flex items-center justify-center bg-blue-600 rounded-md">
                {/* <div
                    className={`flex items-center transition-transform ${
                        open ? 'translate-x-0' : 'translate-x-full hidden'
                    }`}
                >
                    <div className="flex items-center p-2 py-2 rounded-md hover:bg-blue-700">
                        <input
                            id="checkbox-1"
                            type="checkbox"
                            value="translation"
                            className="w-4 h-4 cursor-pointer"
                        />
                        <label
                            htmlFor="checkbox-1"
                            className="ms-1 text-m text-white font-semibold cursor-pointer"
                        >
                            translation
                        </label>
                    </div>

                    <div className="flex items-center p-2 py-2 rounded-md hover:bg-blue-700">
                        <input
                            id="checkbox-2"
                            type="checkbox"
                            value="description"
                            className="w-4 h-4 cursor-pointer"
                        />
                        <label
                            htmlFor="checkbox-2"
                            className="ms-1 text-m text-white font-semibold cursor-pointer"
                        >
                            description
                        </label>
                    </div>

                    <div className="flex items-center p-2 py-2 rounded-md hover:bg-blue-700">
                        <input
                            id="checkbox-3"
                            type="checkbox"
                            value="example"
                            className="w-4 h-4 cursor-pointer"
                        />
                        <label
                            htmlFor="checkbox-3"
                            className="ms-1 text-m text-white font-semibold cursor-pointer"
                        >
                            example
                        </label>
                    </div>
                </div>
                <button
                    className="px-1 py-3 cursor-pointer rounded-md hover:bg-blue-700"
                    onClick={() => setOpen(!open)}
                >
                    {open ? (
                        <IoIosArrowForward size="20px" color="white" />
                    ) : (
                        <IoIosArrowBack size="20px" color="white" />
                    )}
                </button> */}
                <div className="group relative">
                    <button
                        type="button"
                        disabled={data?.length === 0}
                        onClick={addCollectionFireBase}
                        title="Save collection."
                        className="items-center justify-center p-3 bg-blue-600 hover:bg-blue-700 text-white text-xl font-medium rounded-l-md disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        <HiOutlineSave size="20px" />
                    </button>
                    <div className="p-1 bg-gray-500 rounded mt-1 invisible group-hover:visible absolute z-10">
                        <p className="text-white text-center text-xs">Save collection.</p>
                    </div>
                </div>

                <div className="group relative">
                    <button
                        type="button"
                        disabled={data?.length === 0}
                        // onClick={() => setSorted(true)}
                        onClick={() => dispatch(sortFlashCardsLocally(data))}
                        title="Sort collection from A-Z."
                        className="items-center justify-center p-3 bg-blue-600 hover:bg-blue-700 text-white text-xl font-medium disabled:bg-gray-300  disabled:cursor-not-allowed"
                    >
                        <HiOutlineSortDescending size="20px" />
                    </button>
                    <div className="p-1 bg-gray-500 rounded mt-1 invisible group-hover:visible absolute z-10">
                        <p className="text-white text-center text-xs">Sort collection.</p>
                    </div>
                </div>
                <div className="group relative">
                    <button
                        type="button"
                        disabled={data?.length === 0}
                        onClick={clearDataFunction}
                        title="Clear collection."
                        className="items-center justify-center p-3 bg-blue-600 hover:bg-blue-700 text-white text-xl font-medium rounded-r-md disabled:bg-gray-300  disabled:cursor-not-allowed"
                    >
                        <HiOutlineTrash size="20px" />
                    </button>
                    <div className="p-1 bg-gray-500 rounded mt-1 invisible group-hover:visible absolute z-10">
                        <p className="text-white text-center text-xs">Clear collection.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WordListFunctionality;
