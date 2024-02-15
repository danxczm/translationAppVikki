import React, { useRef } from 'react';

import { useDeleteFlashCardMutation, useGetFlashCardsQuery } from './flashCardsSlice';
import { AutoTextSize } from 'auto-text-size';

import { copyTextToClipboard } from '../../utils/copyTextToClipboard';
import FlashCardsPrint from './FlashCardsPrint';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { LuBookMarked } from 'react-icons/lu';
import { LiaGoogle } from 'react-icons/lia';

const FlashCardDescriptionCards = () => {
    const componentRef = useRef();
    const { data: flashCards, isSuccess, isError, error } = useGetFlashCardsQuery();
    const [deleteFlashCard, { isLoading, isSuccess: deleted }] = useDeleteFlashCardMutation();

    const deleteFlashCardHandler = async id => {
        try {
            await deleteFlashCard(id).unwrap();
        } catch (error) {
            console.log(`Failed to delete the card: `, error);
        }
    };

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
                <button
                    type="button"
                    onClick={() => {
                        deleteFlashCardHandler(card?.id);
                    }}
                    className="absolute flex items-center justify-center w-8 h-8 transition bg-blue-200 rounded-full opacity-0 top-2 right-2 group-hover:opacity-100 hover:scale-125 active:scale-95"
                >
                    <AiOutlineDelete color="white" />
                </button>
                <Link
                    className="absolute flex items-center justify-center w-8 h-8 transition bg-blue-200 rounded-full opacity-0 top-2 right-12 group-hover:opacity-100 hover:scale-125 active:scale-95"
                    to={`/flashCards/edit/${card?.id}`}
                >
                    <AiOutlineEdit color="white" />
                </Link>
                <a
                    rel="noreferrer"
                    target="_blank"
                    href={`https://dictionary.cambridge.org/dictionary/english/${card.word}`}
                    className="absolute flex items-center justify-center w-8 h-8 transition bg-blue-200 rounded-full opacity-0 cursor-pointer top-2 right-24 group-hover:opacity-100 hover:scale-125 active:scale-95"
                >
                    <LuBookMarked color="white" />
                </a>
                <a
                    rel="noreferrer"
                    target="_blank"
                    href={`https://www.google.com.ua/search?q=${card.word}`}
                    className="absolute flex items-center justify-center w-8 h-8 transition bg-blue-200 rounded-full opacity-0 cursor-pointer top-2 right-[135px] group-hover:opacity-100 hover:scale-125 active:scale-95"
                >
                    <LiaGoogle size="20px" color="white" />
                </a>
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
