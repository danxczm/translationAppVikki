import React from 'react';
import FlashCardsList from './FlashCardsList';
import FlashCardAddForm from './FlashCardAddForm';

const FlashCards = () => {
    return (
        <>
            <FlashCardAddForm />
            <FlashCardsList />
        </>
    );
};

export default FlashCards;
