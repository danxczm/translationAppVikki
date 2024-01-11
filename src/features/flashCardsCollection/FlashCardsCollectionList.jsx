import { useGetFlashCardsCollectionQuery } from './flashCardsCollectionSlice';
import FlashCardCollectionExcerpt from './FlashCardCollectionExcerpt';

const FlashCardsCollectionList = () => {
    const {
        data: flashCardsCollections,
        isLoading: flashCardsCollectionLoading,
        isSuccess: flashCardsCollectionLoadingSuccess,
        isError,
        error,
    } = useGetFlashCardsCollectionQuery();

    let content;
    if (flashCardsCollectionLoadingSuccess) {
        content = flashCardsCollections?.map((singleCollection, index) => (
            <FlashCardCollectionExcerpt
                key={singleCollection.id}
                index={index}
                flashCardsCollections={flashCardsCollections}
                singleCollection={singleCollection}
            />
        ));
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return (
        <div className="relative">
            {flashCardsCollections?.length !== 0 ? (
                <ul className="grid xl:grid-cols-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 place-items-center">
                    {content}
                </ul>
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <h1 className="p-5 text-center font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-purple-800 to-blue-200">
                        Collection list is empty
                    </h1>
                </div>
            )}
        </div>
    );
};

export default FlashCardsCollectionList;
