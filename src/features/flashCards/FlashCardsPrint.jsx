import { BiSave } from 'react-icons/bi';
import ReactToPrint from 'react-to-print';

const FlashCardsPrint = ({ flashCardsData, componentRef }) => {
    return (
        <ReactToPrint
            trigger={() =>
                flashCardsData?.length !== 0 && flashCardsData !== undefined ? (
                    <div className="sticky flex items-center justify-center w-40 mx-auto mt-10 bottom-5">
                        <button className="flex px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300">
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
    );
};

export default FlashCardsPrint;
