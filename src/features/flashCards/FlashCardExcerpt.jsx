import { AutoTextSize } from 'auto-text-size';
import { Rings } from 'react-loader-spinner';
import { toast } from 'react-toastify';

import { LuBookMarked } from 'react-icons/lu';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { LiaGoogle } from 'react-icons/lia';

import { Link } from 'react-router-dom';
import { useDeleteFlashCardMutation } from './flashCardsSlice';

import { toastInitialSettings } from '../../utils/utils';

const FlashCardExcerpt = ({ card }) => {
    const [deleteFlashCard, { isLoading, isSuccess }] = useDeleteFlashCardMutation();

    const deleteFlashCardHandler = async id => {
        try {
            await deleteFlashCard(id).unwrap();
        } catch (error) {
            console.log(`Failed to delete the card: `, error);
        }
    };

    const copyTextToClipboard = async text => {
        toast.success('The word is copied!', toastInitialSettings);
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    };

    return (
        <li
            key={card?.id}
            className="relative group overflow-hidden rounded-lg transition duration-200 hover:shadow-xl hover:shadow-blue-600"
        >
            {(isLoading || isSuccess) && (
                <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Rings
                        visible={true}
                        height="240"
                        width="240"
                        color="white"
                        ariaLabel="rings-loading"
                    />
                </div>
            )}
            <div className={`${(isLoading || isSuccess) && 'blur-sm'}`}>
                <img
                    loading="lazy"
                    className="rounded relative w-full object-cover aspect-square transition duration-200 group-hover:scale-110 "
                    src={card?.picture}
                    alt={card?.word}
                />
                {/* delete button */}
                <button
                    type="button"
                    onClick={() => {
                        deleteFlashCardHandler(card?.id);
                    }}
                    className="h-5 w-5 bg-white absolute top-2 right-2 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <AiOutlineDelete />
                </button>

                {/* edit button */}
                <Link
                    className="h-5 w-5 bg-white absolute top-2 left-2 flex items-center justify-center rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                    to={`edit/${card.id}`}
                >
                    <AiOutlineEdit />
                </Link>
                <div className="absolute bottom-0 px-4 py-3 bg-gray-500/50 w-full h-36">
                    <div className="relative flex">
                        <div onClick={() => copyTextToClipboard(card?.word)}>
                            <AutoTextSize
                                className="cursor-pointer p-1 text-white bg-gradient-to-r from-teal-400/50 to-blue-500/20 font-semibold text-2xl"
                                title="Click to copy."
                                mode="box"
                                minFontSizePx="24"
                                maxFontSizePx="24"
                            >
                                {card?.word}
                            </AutoTextSize>
                        </div>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href={`https://dictionary.cambridge.org/dictionary/english/${card.word}`}
                            className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md flex items-center justify-center absolute right-0 top-8 hover:bg-blue-300"
                        >
                            <LuBookMarked size="20px" color="white" />
                        </a>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href={`https://www.google.com.ua/search?q=${card.word}`}
                            className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md flex items-center justify-center absolute right-0 top-1.5 hover:bg-blue-300"
                        >
                            <LiaGoogle size="20px" color="white" />
                        </a>
                    </div>
                    <div>
                        <AutoTextSize
                            className="text-gray-200 mt-1 leading-6"
                            mode="multiline"
                            minFontSizePx="24"
                            maxFontSizePx="24"
                        >
                            {card?.translation?.toLowerCase()}
                        </AutoTextSize>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default FlashCardExcerpt;
