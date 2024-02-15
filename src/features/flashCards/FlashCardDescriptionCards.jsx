import React, { useRef } from 'react';

import { useGetFlashCardsQuery } from './flashCardsSlice';
import { AutoTextSize } from 'auto-text-size';

import { copyTextToClipboard } from '../../utils/copyTextToClipboard';
import FlashCardsPrint from './FlashCardsPrint';

const FlashCardDescriptionCards = () => {
    const componentRef = useRef();
    const { data: flashCards, isSuccess, isError, error } = useGetFlashCardsQuery();

    let content;
    if (isSuccess) {
        content = flashCards?.map(card => (
            <li
                key={card?.id}
                className="relative flex items-center w-full h-64 p-2 overflow-hidden border-4 rounded-lg bg-blue-300/10 group"
            >
                <img
                    loading="lazy"
                    className="w-48 h-48 rounded-lg m-2 border-[0.35rem] border-gray-500/10 object-cover shadow-xl"
                    src={card?.picture}
                    alt={card?.word}
                />
                <div className="flex flex-col h-48 gap-1">
                    <div className="flex items-center gap-4">
                        <div>
                            <AutoTextSize
                                title="Click to copy."
                                onClick={() => copyTextToClipboard(card?.word)}
                                minFontSizePx="20"
                                maxFontSizePx="30"
                                className="font-semibold text-gray-700 cursor-pointer"
                                mode="multiple"
                            >
                                {card?.word}
                            </AutoTextSize>
                        </div>

                        <div>
                            <AutoTextSize
                                minFontSizePx="12"
                                maxFontSizePx="16"
                                className="text-gray-700 "
                            >
                                {card?.phonetic}
                            </AutoTextSize>
                        </div>
                    </div>
                    <div className="h-1 -mt-1 rounded-md bg-gradient-to-r from-gray-700 to-white w-96"></div>
                    {card?.audio && (
                        <audio controls className="h-6">
                            <source src={card?.audio} />
                        </audio>
                    )}
                    <p className="italic font-semibold underline">{card?.partOfSpeech}</p>
                    <div>
                        <AutoTextSize className="text-gray-700" mode="multiple">
                            {card?.definition}
                        </AutoTextSize>
                    </div>
                    {/* <p className="overflow-hidden text-lg text-ellipsis">{card?.definition}</p> */}
                </div>
            </li>
        ));
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return (
        <div>
            <ul ref={componentRef} className="grid gap-4 xl:grid-cols-2 place-items-center">
                {content}
            </ul>
            <FlashCardsPrint flashCardsData={flashCards} componentRef={componentRef} />
        </div>
    );
};

export default FlashCardDescriptionCards;
