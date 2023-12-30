import { useContext, useState } from 'react';
// import { useSelector } from 'react-redux';

import { ContextData } from '../App';
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { dataBase } from '../Firebase/firebaseConfig';
import Swal from 'sweetalert2';
// import * as selector from '../redux/features/cards/Selector';

import { HiOutlineTrash, HiOutlineSortDescending, HiOutlineSave } from 'react-icons/hi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const WordListFunctionality = () => {
    const [open, setOpen] = useState(false);
    const { data, setData } = useContext(ContextData);

    // const { entities: data } = useSelector(selector.selectCards);

    const clearDataFireBase = async () => {
        try {
            const docs = await getDocs(collection(dataBase, 'data'));
            const deletePromises = docs.docs.map(doc => deleteDoc(doc.ref));

            await Promise.all(deletePromises);

            setData([]);
            // await getDataFireBase();
            console.log('Collection cleared successfully.');
        } catch (error) {
            console.error('Error clearing collection: ', error);
        }
    };

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
            clearDataFireBase();
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

        clearDataFireBase();
        // getCollectionFireBase();
    };

    const sortCollectionHandler = () => {
        const sortedData = [...data].sort((a, b) => {
            return a.word.localeCompare(b.word);
        });

        setData(sortedData);
    };

    return (
        <div className="flex items-center bg-background-blue ml-auto py-2">
            <p className="inline-flex items-center px-5 py-2.5 text-xl font-semibold text-center cursor-default">
                Total:
                <span className="inline-flex items-center justify-center w-12 h-8 ms-2 text-l font-semibold text-blue-800 bg-blue-200 rounded-full">
                    {data.length}
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
                        disabled={data.length === 0}
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
                        disabled={data.length === 0}
                        onClick={sortCollectionHandler}
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
                        disabled={data.length === 0}
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
