import { useMemo, useRef, useState } from 'react';

import { BiSave } from 'react-icons/bi';
import ReactToPrint from 'react-to-print';

import { useGetFlashCardsQuery } from './flashCardsSlice';

import FlashCardAddForm from './FlashCardAddForm';
import FlashCardExcerpt from './FlashCardExcerpt';
import FlashCardsListOptions from './FlashCardsListOptions';

const FlashCardsList = () => {
    const [sort, setSort] = useState(false);
    const {
        data: flashCards,
        isLoading: flashCardsLoading,
        isSuccess,
        isError,
        error,
    } = useGetFlashCardsQuery();

    const componentRef = useRef();

    const sortHandler = value => {
        setSort(value);
    };

    const sortedFlashCards = useMemo(() => {
        const copy = flashCards?.slice();
        const sorted = sort ? copy.sort((a, b) => a.word.localeCompare(b.word)) : flashCards;
        return sorted;
    }, [flashCards, sort]);

    let content;
    if (isSuccess) {
        content = sortedFlashCards?.map(card => <FlashCardExcerpt key={card.id} card={card} />);
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return (
        <>
            <FlashCardsListOptions
                flashCards={sortedFlashCards}
                sortHandler={sortHandler}
                flashCardsLoading={flashCardsLoading}
            />
            <div ref={componentRef}>
                {sortedFlashCards?.length === 0 ? (
                    <h1 className="p-5 text-center font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-blue-200 to-purple-800">
                        You haven't added any words yet
                    </h1>
                ) : (
                    <ul
                        className={`grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 place-items-center`}
                    >
                        {content}
                    </ul>
                )}
            </div>
            <ReactToPrint
                trigger={() =>
                    sortedFlashCards?.length !== 0 && sortedFlashCards !== undefined ? (
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

export default FlashCardsList;
