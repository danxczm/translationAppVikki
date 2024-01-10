import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AiOutlineDelete } from 'react-icons/ai';

import Swal from 'sweetalert2';
import {
    useDeleteFlashCardsColletionMutation,
    useGetFlashCardsCollectionQuery,
    usePrintFlashCardsCollectionMutation,
} from 'features/flashCardsCollection/flashCardsCollectionSlice';
import { Rings } from 'react-loader-spinner';

const FlashCardsCollectionList = () => {
    const { data } = useGetFlashCardsCollectionQuery();

    const [deleteSingleCollection] = useDeleteFlashCardsColletionMutation();
    const [printCollection, { isLoading, isSuccess }] = usePrintFlashCardsCollectionMutation();

    const navigate = useNavigate();

    const deleteCollectionHandler = async (e, id, index) => {
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
            deleteSingleCollection(id);
        }
    };

    const printCollectionHandler = (data, index) => async () => {
        try {
            await printCollection({ data, index }).unwrap();
        } catch (error) {
            console.log(`Error with printing the collection: `, error);
        }
    };

    useEffect(() => {
        if (isSuccess) navigate('/flashCards');
    }, [isSuccess, navigate]);

    return (
        <div className="relative">
            {data?.length !== 0 ? (
                <ul className="flex border-2 rounded-lg [&>*:not(:first-child)]:ml-2 p-3">
                    {data?.map((item, index) => {
                        return (
                            <li
                                key={index}
                                onClick={printCollectionHandler(data, index)}
                                className="relative flex justify-center items-center rounded-xl h-28 w-28 bg-blue-700 cursor-pointer"
                            >
                                <p className="text-center text-white text-xs font-black mt-6">
                                    Collection {index + 1}
                                </p>
                                <button
                                    type="button"
                                    onClick={e => {
                                        deleteCollectionHandler(e, item.id, index);
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
    );
};

export default FlashCardsCollectionList;
