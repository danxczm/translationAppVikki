import { useMemo, useRef, useState } from 'react';

import { useGetFlashCardsQuery } from './flashCardsSlice';

import FlashCardExcerpt from './FlashCardExcerpt';
import FlashCardsListOptions from './FlashCardsListOptions';
import FlashCardsPrint from './FlashCardsPrint';

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
                    <h1 className="p-5 text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-800">
                        You haven't added any words yet
                    </h1>
                ) : (
                    <ul
<<<<<<< HEAD
                        className={`grid xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 place-items-center`}
=======
                        className={`grid xl:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 place-items-center`}
>>>>>>> 6d84a03699076889d4a4fe2433fbec2164827310
                    >
                        {content}
                    </ul>
                )}
            </div>
            <FlashCardsPrint flashCardsData={sortedFlashCards} componentRef={componentRef} />
        </>
    );
};

export default FlashCardsList;
