import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    useDeleteFlashCardsColletionMutation,
    usePrintFlashCardsCollectionMutation,
} from './flashCardsCollectionSlice';

import Swal from 'sweetalert2';

import { AiOutlineDelete } from 'react-icons/ai';

const FlashCardCollectionExcerpt = ({ index, singleCollection, flashCardsCollections }) => {
    const navigate = useNavigate();

    const [deleteSingleCollection] = useDeleteFlashCardsColletionMutation();
    const [printCollection, { isSuccess: printFlashCardsCollectionSuccess }] =
        usePrintFlashCardsCollectionMutation();

    const deleteCollectionHandler = async (e, id) => {
        e.stopPropagation();

        const result = await Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: `You delete ${singleCollection.collectionName}'s collection!`,
            showCancelButton: true,
            confirmButtonText: `Yes, delete!`,
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
        if (printFlashCardsCollectionSuccess) navigate('/flashCards');
    }, [printFlashCardsCollectionSuccess, navigate]);

    // ! for later need to create a grid of 9 pics in a div
    // const pictureArray = Object.values(singleCollection)
    //     .filter(item => item.picture)
    //     .map(item => item.picture);

    return (
        <li
            key={index}
            onClick={printCollectionHandler(flashCardsCollections, index)}
            className="relative flex justify-center items-center rounded-xl h-28 w-28 bg-blue-700 cursor-pointer overflow-hidden"
        >
            <button
                type="button"
                onClick={e => {
                    deleteCollectionHandler(e, singleCollection.id);
                }}
                className="h-8 w-20 bg-white hover:bg-blue-300 absolute top-1 rounded-full flex items-center justify-center"
            >
                <AiOutlineDelete size="20px" />
            </button>
            <p className="text-center text-white text-xl font-black mt-6">
                {singleCollection.collectionName}
            </p>
        </li>
    );
};

export default FlashCardCollectionExcerpt;
