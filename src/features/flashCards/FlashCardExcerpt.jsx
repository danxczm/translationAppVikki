import { Link } from 'react-router-dom';
import { AutoTextSize } from 'auto-text-size';
import { Rings } from 'react-loader-spinner';

import { LuBookMarked } from 'react-icons/lu';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { LiaGoogle } from 'react-icons/lia';

import { useDeleteFlashCardMutation } from './flashCardsSlice';
import { copyTextToClipboard } from '../../utils/copyTextToClipboard';

const FlashCardExcerpt = ({ card }) => {
    const [deleteFlashCard, { isLoading, isSuccess }] = useDeleteFlashCardMutation();

    const deleteFlashCardHandler = async id => {
        try {
            await deleteFlashCard(id).unwrap();
        } catch (error) {
            console.log(`Failed to delete the card: `, error);
        }
    };

    return (
        <li
            key={card?.id}
            className="relative overflow-hidden transition duration-200 rounded-lg group hover:shadow-xl hover:shadow-blue-600"
        >
            {(isLoading || isSuccess) && (
                <div className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
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
                    className="relative object-cover w-full transition duration-200 rounded aspect-square group-hover:scale-110 "
                    src={card?.picture}
                    alt={card?.word}
                />
                {/* delete button */}
                <button
                    type="button"
                    onClick={() => {
                        deleteFlashCardHandler(card?.id);
                    }}
                    className="absolute flex items-center justify-center w-5 h-5 transition-opacity bg-white rounded-md opacity-0 top-2 right-2 group-hover:opacity-100"
                >
                    <AiOutlineDelete />
                </button>

                {/* edit button */}
                <Link
                    className="absolute flex items-center justify-center w-5 h-5 transition-opacity bg-white rounded-md opacity-0 top-2 left-2 group-hover:opacity-100"
                    to={`edit/${card.id}`}
                >
                    <AiOutlineEdit />
                </Link>
                <div className="absolute bottom-0 w-full px-4 py-3 bg-gray-500/50 h-36">
                    <div className="relative flex">
                        <div onClick={() => copyTextToClipboard(card?.word)}>
                            <AutoTextSize
                                className="p-1 text-2xl font-semibold text-white cursor-pointer bg-gradient-to-r from-teal-400/50 to-blue-500/20"
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
                            className="absolute right-0 flex items-center justify-center p-1 transition-opacity rounded-md opacity-0 cursor-pointer group-hover:opacity-100 top-8 hover:bg-blue-300"
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
                            className="mt-1 leading-6 text-gray-200"
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
