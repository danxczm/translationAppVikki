import { useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BiSave } from 'react-icons/bi';
import { LuBookMarked } from 'react-icons/lu';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { LiaChessKingSolid, LiaGoogle } from 'react-icons/lia';

import { toastInitialSettings } from '../../utils/utils';
import ReactToPrint from 'react-to-print';

import SearchBar from 'SearchBar/SearchBar';
import { useGetFlashCardsQuery } from './flashCardsSlice';
import FlashCardExcerpt from './FlashCardExcerpt';

const WordsList = () => {
    const componentRef = useRef();
    const [sort, setSort] = useState(false);
    const { data: flashCards, isLoading, isSuccess, isError, error } = useGetFlashCardsQuery();

    const sortedFlashCards = useMemo(() => {
        const copy = flashCards?.slice();
        const sorted = sort ? copy.sort((a, b) => a.word.localeCompare(b.word)) : flashCards;
        return sorted;
    }, [flashCards, sort]);

    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        content = sortedFlashCards?.map(card => <FlashCardExcerpt key={card.id} card={card} />);
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return (
        <>
            <SearchBar />
            <div ref={componentRef}>
                <ul className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 place-items-center">
                    {sortedFlashCards?.length === 0 ? (
                        <h1 className="p-5 text-center font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-blue-200 to-purple-800">
                            You haven't added any words yet
                        </h1>
                    ) : (
                        content
                    )}
                </ul>
            </div>
            <ReactToPrint
                trigger={() =>
                    sortedFlashCards?.length !== 0 ? (
                        <div className="flex items-center justify-center mt-5 sticky bottom-5">
                            <button className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
                                <BiSave size="20px" className="mr-2" />
                                <p className="font-semibold">Save as PDF</p>
                            </button>
                        </div>
                    ) : (
                        <></>
                    )
                }
                content={() => componentRef.current}
            />
        </>
    );
};

export default WordsList;
